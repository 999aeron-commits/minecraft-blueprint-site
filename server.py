from __future__ import annotations

import argparse
import json
import os
import re
import traceback
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

try:
    import stripe
except ImportError:
    stripe = None


PROJECT_ROOT = Path(__file__).resolve().parent
# Keep the assistant instruction short, specific to this website, and strictly capped in length.
CHAT_SYSTEM_INSTRUCTION = (
    'You are a built-in helper for the Minecraft Blueprint Generator website. '
    'Reply in plain sentences under 50 words. No lists. No formatting.'
)
MAX_HISTORY_MESSAGES = 10
MAX_REPLY_WORDS = 50
WORD_PATTERN = re.compile(r"\b[\w']+\b")
EMPTY_MODEL_REPLY_FALLBACK = 'I could not generate a reply just now. Please try again.'
CHAT_INTENT_REPLIES = {
    'what_the_site_does': (
        'This site turns an image into a Minecraft blueprint. It splits the build into sections, '
        'shows the full layout, lists materials, and helps you build one section at a time.'
    ),
    'how_full_blueprint_view_works': (
        'Full Blueprint shows the whole build at once. It marks section boundaries and highlights '
        'the selected section so you can see the overall layout clearly.'
    ),
    'how_focused_section_view_works': (
        'Focused Section View isolates the selected section in a larger viewer. It shows that '
        'section\'s size and status so you can build one part at a time.'
    ),
    'how_the_legend_works': (
        'The Blueprint Legend is the block key. It shows each block used in the build with its '
        'color and total count.'
    ),
    'how_zoom_and_pan_work': (
        'Use the zoom buttons or mouse wheel to zoom. Drag the Full Blueprint or Focused Section '
        'View to pan, and use Reset to return to normal zoom.'
    ),
    'how_sections_work': (
        'The blueprint is split into sections based on the selected section size. Use the Section '
        'Map to jump between sections and track build progress.'
    ),
    'how_section_materials_work': (
        'Section Materials shows the blocks needed for the selected section. It updates when you '
        'pick a section so you can gather the right blocks before building.'
    ),
    'general_site_help': (
        'Upload an image, generate the blueprint, then use the Full Blueprint, Focused Section '
        'View, Section Map, Legend, and Section Materials panels to build step by step.'
    ),
    'unknown_question': (
        'This helper works best for blueprint views, sections, legend, materials, zoom, and site use.'
    )
}
_openai_client = None
_stripe_initialized = False
_loaded_env_files: list[str] = []
_env_files_scanned = False
DEFAULT_OPENAI_MODEL = 'gpt-5-mini'
STATIC_ASSET_VERSION_PLACEHOLDER = '__STATIC_ASSET_VERSION__'
CHAT_API_PATH = '/api/chat'
CHECKOUT_SESSION_API_PATH = '/api/create-checkout-session'
CHECKOUT_SESSION_STATUS_API_PATH = '/api/checkout-session-status'
LEGACY_CHECKOUT_SESSION_API_PATHS = {'/create-checkout-session'}
LEGACY_CHECKOUT_SESSION_STATUS_PATHS = {'/checkout-session-status'}
CHECKOUT_CATALOG = {
    'monthly_subscription': {
        'mode': 'subscription',
        'line_items': [
            {
                'quantity': 1,
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': 99,
                    'recurring': {
                        'interval': 'month'
                    },
                    'product_data': {
                        'name': 'Premium Sizes Monthly Subscription'
                    }
                }
            }
        ]
    },
    'lifetime_unlock': {
        'mode': 'payment',
        'line_items': [
            {
                'quantity': 1,
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': 1000,
                    'product_data': {
                        'name': 'Premium Sizes Lifetime Unlock'
                    }
                }
            }
        ]
    }
}
SUPPORTED_CHECKOUT_PURCHASE_TYPES = set(CHECKOUT_CATALOG)
API_CORS_PATHS = {CHAT_API_PATH, CHECKOUT_SESSION_API_PATH, CHECKOUT_SESSION_STATUS_API_PATH}


def log_chat_event(message: str) -> None:
    print(f'[chat] {message}')


def log_chat_exception(context: str, error: Exception) -> None:
    log_chat_event(f'{context}: {error.__class__.__name__}: {error}')
    for line in traceback.format_exc().splitlines():
        log_chat_event(line)


def log_billing_event(message: str) -> None:
    print(f'[billing] {message}')


def log_billing_exception(context: str, error: Exception) -> None:
    log_billing_event(f'{context}: {error.__class__.__name__}: {error}')
    for line in traceback.format_exc().splitlines():
        log_billing_event(line)


def get_error_message(error: Exception) -> str:
    user_message = getattr(error, 'user_message', None)
    if isinstance(user_message, str) and user_message.strip():
        return user_message.strip()

    json_body = getattr(error, 'json_body', None)
    if isinstance(json_body, dict):
        error_payload = json_body.get('error')
        if isinstance(error_payload, dict):
            payload_message = error_payload.get('message')
            if isinstance(payload_message, str) and payload_message.strip():
                return payload_message.strip()

    message = str(error).strip()
    if message:
        return message

    return f'{error.__class__.__name__} raised without an error message.'


def iter_static_version_source_files():
    for relative_path in ('index.html', 'app.js', 'styles.css'):
        path = PROJECT_ROOT / relative_path
        if path.is_file():
            yield path

    assets_dir = PROJECT_ROOT / 'assets'
    if assets_dir.is_dir():
        yield from (path for path in assets_dir.rglob('*') if path.is_file())


def get_static_asset_version() -> str:
    latest_mtime_ns = 0
    for path in iter_static_version_source_files():
        latest_mtime_ns = max(latest_mtime_ns, path.stat().st_mtime_ns)

    if latest_mtime_ns <= 0:
        latest_mtime_ns = PROJECT_ROOT.stat().st_mtime_ns

    return str(latest_mtime_ns)


def _parse_env_value(raw_value: str) -> str:
    value = raw_value.strip()
    if not value:
        return ''

    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        return value[1:-1]

    if ' #' in value:
        value = value.split(' #', 1)[0].rstrip()

    return value


def _load_env_file_fallback(env_path: Path, *, override: bool) -> None:
    for raw_line in env_path.read_text(encoding='utf-8').splitlines():
        line = raw_line.strip()
        if not line or line.startswith('#'):
            continue

        if line.startswith('export '):
            line = line[7:].strip()

        if '=' not in line:
            continue

        key, raw_value = line.split('=', 1)
        key = key.strip()
        if not key:
            continue

        if not override and key in os.environ:
            continue

        os.environ[key] = _parse_env_value(raw_value)

def load_local_env_files() -> list[str]:
    global _env_files_scanned

    if _env_files_scanned:
        return list(_loaded_env_files)

    _env_files_scanned = True

    env_load_order = (
        (PROJECT_ROOT / '.env', False),
        (PROJECT_ROOT / '.env.local', True),
    )

    for env_path, override in env_load_order:
        if not env_path.is_file():
            continue

        if load_dotenv is not None:
            load_dotenv(env_path, override=override)
        else:
            _load_env_file_fallback(env_path, override=override)
        _loaded_env_files.append(str(env_path))

    return list(_loaded_env_files)


def get_openai_model() -> str:
    return DEFAULT_OPENAI_MODEL


def get_openai_client():
    global _openai_client

    if _openai_client is not None:
        return _openai_client

    loaded_env_files = load_local_env_files()
    if loaded_env_files:
        log_chat_event(f'Environment file(s) loaded: {", ".join(loaded_env_files)}')
    else:
        log_chat_event('No local .env file found. Using process environment only.')

    if OpenAI is None:
        raise RuntimeError('The OpenAI Python package is not installed. Run "pip install -r requirements.txt".')

    api_key = os.environ.get('OPENAI_API_KEY')
    wrong_name_key = os.environ.get('OPENAI_KEY')
    log_chat_event(f'OPENAI_API_KEY detected: {"yes" if bool(api_key) else "no"}')
    if wrong_name_key and not api_key:
        raise RuntimeError('OPENAI_KEY is set, but the server expects OPENAI_API_KEY.')
    if not api_key:
        raise RuntimeError(
            'OPENAI_API_KEY is missing. Set it in the server environment or in a local .env/.env.local file.'
        )

    _openai_client = OpenAI(api_key=api_key)
    log_chat_event('OpenAI client initialized.')
    return _openai_client


def get_stripe_client():
    global _stripe_initialized

    loaded_env_files = load_local_env_files()
    if loaded_env_files:
        log_billing_event(f'Environment file(s) loaded for Stripe: {", ".join(loaded_env_files)}')
    else:
        log_billing_event('No local .env file found for Stripe. Using process environment only.')

    api_key = (os.environ.get('STRIPE_SECRET_KEY') or '').strip()
    log_billing_event(
        f'get_stripe_client called. stripe_is_none={stripe is None}, '
        f'stripe_secret_key_present={bool(api_key)}'
    )

    if stripe is None:
        log_billing_event('Stripe SDK import failed. Install dependencies with "pip install -r requirements.txt".')
        raise RuntimeError('The Stripe Python package is not installed. Run "pip install -r requirements.txt".')

    if not api_key:
        log_billing_event('STRIPE_SECRET_KEY was not found in the server environment.')
        raise RuntimeError(
            'STRIPE_SECRET_KEY is missing. Set it in the server environment or in a local .env/.env.local file.'
        )

    try:
        if not _stripe_initialized or getattr(stripe, 'api_key', None) != api_key:
            stripe.api_key = api_key
            _stripe_initialized = True
        log_billing_event('Stripe client initialized successfully.')
    except Exception as error:
        log_billing_exception('Stripe client initialization failed', error)
        raise RuntimeError(get_error_message(error)) from error

    return stripe


def is_local_host(host: str) -> bool:
    hostname = host.split(':', 1)[0].strip().strip('[]').lower()
    return hostname in {'127.0.0.1', 'localhost', '0.0.0.0'}


def get_request_origin(handler: SimpleHTTPRequestHandler) -> str:
    forwarded_host = handler.headers.get('X-Forwarded-Host')
    forwarded_proto = handler.headers.get('X-Forwarded-Proto')
    raw_host = forwarded_host if isinstance(forwarded_host, str) and forwarded_host.strip() else handler.headers.get('Host')
    host = (raw_host or '127.0.0.1:8000').split(',', 1)[0].strip() or '127.0.0.1:8000'
    if isinstance(forwarded_proto, str) and forwarded_proto.strip():
        protocol = forwarded_proto.split(',', 1)[0].strip()
    else:
        protocol = 'http' if is_local_host(host) else 'https'
    return f'{protocol}://{host}'


def build_checkout_urls(handler: SimpleHTTPRequestHandler) -> tuple[str, str]:
    origin = get_request_origin(handler)
    success_url = f'{origin}/?checkout=success&session_id={{CHECKOUT_SESSION_ID}}'
    cancel_url = f'{origin}/?checkout=cancel'
    return success_url, cancel_url


def create_checkout_session(
    purchase_type: str,
    handler: SimpleHTTPRequestHandler
) -> dict[str, str]:
    stripe_client = get_stripe_client()
    checkout_config = CHECKOUT_CATALOG.get(purchase_type)
    if not isinstance(checkout_config, dict):
        raise ValueError('Unsupported purchase type.')

    success_url, cancel_url = build_checkout_urls(handler)
    metadata = {'purchase_type': purchase_type}
    mode = checkout_config['mode']
    session_kwargs = {
        'mode': mode,
        'success_url': success_url,
        'cancel_url': cancel_url,
        'client_reference_id': purchase_type,
        'line_items': checkout_config['line_items'],
        'metadata': metadata
    }
    if mode == 'subscription':
        session_kwargs['subscription_data'] = {
            'metadata': metadata
        }

    log_billing_event(
        f'Creating checkout session. purchase_type={purchase_type}, '
        f'mode={mode}, success_url={success_url}, cancel_url={cancel_url}'
    )

    try:
        session = stripe_client.checkout.Session.create(**session_kwargs)
    except Exception as error:
        log_billing_exception(
            f'Stripe checkout session API call failed for purchase_type={purchase_type}',
            error
        )
        raise RuntimeError(get_error_message(error)) from error

    session_url = getattr(session, 'url', None)
    session_id = getattr(session, 'id', None)
    if not isinstance(session_url, str) or not session_url.strip() or not isinstance(session_id, str) or not session_id.strip():
        raise RuntimeError('Stripe Checkout session was created without a usable redirect URL.')

    log_billing_event(f'Checkout session created successfully. session_id={session_id}')
    return {
        'checkout_url': session_url,
        'session_id': session_id
    }


def get_checkout_session_status(session_id: str) -> dict[str, object]:
    stripe_client = get_stripe_client()
    log_billing_event(f'Checking checkout session status. session_id={session_id}')
    session = stripe_client.checkout.Session.retrieve(session_id)
    metadata = getattr(session, 'metadata', None) or {}

    if not isinstance(metadata, dict):
        metadata = {}

    payment_status = getattr(session, 'payment_status', '') or ''
    checkout_status = getattr(session, 'status', '') or ''
    purchase_type = metadata.get('purchase_type', '')
    return {
        'is_paid': payment_status == 'paid' or checkout_status == 'complete',
        'purchase_type': purchase_type,
        'payment_status': payment_status,
        'checkout_status': checkout_status
    }


def build_openai_input(message: str, history: list[dict[str, str]]) -> list[dict[str, object]]:
    input_messages: list[dict[str, object]] = []

    # Future conversation memory can keep expanding here, or switch to
    # previous_response_id later without changing the frontend contract.
    for item in history[-MAX_HISTORY_MESSAGES:]:
        role = item.get('role')
        text = item.get('text')
        if not isinstance(role, str) or not isinstance(text, str):
            continue

        normalized_text = text.strip()
        if not normalized_text:
            continue

        if role == 'user':
            normalized_role = 'user'
            content_type = 'input_text'
        elif role in {'assistant', 'bot'}:
            normalized_role = 'assistant'
            content_type = 'output_text'
        else:
            continue

        input_messages.append(
            {
                'role': normalized_role,
                'content': [
                    {
                        'type': content_type,
                        'text': normalized_text
                    }
                ]
            }
        )

    last_text = None
    if input_messages:
        last_content = input_messages[-1].get('content')
        if isinstance(last_content, list) and last_content:
            last_text = last_content[0].get('text')

    if not input_messages or input_messages[-1]['role'] != 'user' or last_text != message:
        input_messages.append(
            {
                'role': 'user',
                'content': [
                    {
                        'type': 'input_text',
                        'text': message
                    }
                ]
            }
        )

    return input_messages


def extract_response_text(response) -> str:
    def read_field(value, field_name: str):
        if value is None:
            return None
        if isinstance(value, dict):
            return value.get(field_name)
        return getattr(value, field_name, None)

    output_text = getattr(response, 'output_text', None)
    log_chat_event(f'response.output_text={repr(output_text)}')
    if isinstance(output_text, str) and output_text.strip():
        return output_text.strip()

    output_items = getattr(response, 'output', None)
    log_chat_event(f'response.output={repr(output_items)}')
    if not isinstance(output_items, (list, tuple)):
        return ''

    text_parts: list[str] = []
    for item in output_items:
        if read_field(item, 'type') != 'message':
            continue

        item_role = read_field(item, 'role')
        if item_role not in (None, 'assistant'):
            continue

        content_items = read_field(item, 'content')
        if not isinstance(content_items, (list, tuple)):
            continue

        for content_item in content_items:
            if read_field(content_item, 'type') != 'output_text':
                continue

            text_value = read_field(content_item, 'text')
            if isinstance(text_value, str) and text_value.strip():
                text_parts.append(text_value.strip())
                continue

            nested_text = read_field(text_value, 'value')
            if isinstance(nested_text, str) and nested_text.strip():
                text_parts.append(nested_text.strip())

    return ''.join(text_parts).strip()


def count_words(text: str) -> int:
    return len(WORD_PATTERN.findall(text))


def normalize_intent_text(text: str) -> str:
    normalized = re.sub(r'[^a-z0-9\s]', ' ', text.lower())
    return re.sub(r'\s+', ' ', normalized).strip()


def matches_any_phrase(text: str, phrases: tuple[str, ...]) -> bool:
    return any(phrase in text for phrase in phrases)


def detect_chat_intent(message: str) -> str:
    normalized = normalize_intent_text(message)

    if matches_any_phrase(normalized, (
        'what does this site do', 'what does this website do', 'what does this app do',
        'what does this tool do', 'what is this site', 'what is this website',
        'what is this app', 'what is this tool', 'what can this site do',
        'what can this tool do', 'what does this do'
    )):
        return 'what_the_site_does'

    if matches_any_phrase(normalized, (
        'full blueprint', 'whole blueprint', 'entire blueprint', 'full view',
        'whole build', 'entire build', 'overall layout'
    )):
        return 'how_full_blueprint_view_works'

    if matches_any_phrase(normalized, (
        'focused section', 'focused section view', 'focus section', 'focus view',
        'one section at a time', 'selected section view', 'isolated section'
    )):
        return 'how_focused_section_view_works'

    if matches_any_phrase(normalized, (
        'legend', 'block key', 'color key', 'what do the colors mean',
        'what do the blocks mean'
    )):
        return 'how_the_legend_works'

    if matches_any_phrase(normalized, (
        'zoom', 'pan', 'drag', 'move around', 'scroll around', 'reset zoom'
    )):
        return 'how_zoom_and_pan_work'

    if matches_any_phrase(normalized, (
        'section materials', 'materials panel', 'materials list',
        'what materials do i need', 'materials for section'
    )):
        return 'how_section_materials_work'

    if matches_any_phrase(normalized, (
        'section map', 'sections', 'section size', 'section sizes',
        'how do sections work', 'how do section work', 'split into sections',
        'jump between sections'
    )):
        return 'how_sections_work'

    if matches_any_phrase(normalized, (
        'help', 'how do i use this', 'how to use this', 'how do i use the site',
        'how does this work', 'where do i start', 'getting started', 'get started',
        'how do i start', 'what should i do first'
    )):
        return 'general_site_help'

    return 'unknown_question'


def get_controlled_chat_reply(intent: str) -> str | None:
    reply = CHAT_INTENT_REPLIES.get(intent)
    if not reply or intent == 'unknown_question':
        return None
    return cleanup_chatbot_reply(reply)


def normalize_reply_style(text: str) -> str:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    cleaned_lines = [re.sub(r'^(?:[-*•]+|\d+[.)])\s*', '', line) for line in lines]
    normalized = ' '.join(cleaned_lines) if cleaned_lines else text.strip()
    normalized = re.sub(r'\s+', ' ', normalized).strip()
    normalized = re.sub(r'(?:(?<=^)|(?<=[.!?]\s))(?:[-*•]+|\d+[.)])\s*', '', normalized)
    normalized = re.sub(r'[*_`#>\[\]]+', '', normalized)
    normalized = normalized.replace('\u2022', ' ')
    normalized = re.sub(r'\s*[:;]\s*', '. ', normalized)
    normalized = re.sub(
        r'^(?:certainly|absolutely|sure|here(?:\'s| is) how|i can help|i would be happy to help|i\'d be happy to help)\b[\s,:!-]*',
        '',
        normalized,
        flags=re.IGNORECASE
    )
    normalized = re.sub(
        r'(?:(?<=^)|(?<=[.!?]\s))(?:certainly|absolutely|sure|here(?:\'s| is) how|i can help)\b[\s,:!-]*',
        '',
        normalized,
        flags=re.IGNORECASE
    )
    normalized = re.sub(r'\.\s+\.', '. ', normalized)
    normalized = normalized.strip(' .,;:-')
    if normalized and normalized[-1] not in '.!?':
        normalized += '.'
    return normalized


def enforce_reply_word_limit(text: str, max_words: int = MAX_REPLY_WORDS) -> str:
    normalized = re.sub(r'\s+', ' ', text).strip()
    if count_words(normalized) <= max_words:
        return normalized

    words = re.findall(r'\S+', normalized)
    shortened = ' '.join(words[:max_words]).rstrip()
    preferred_min_words = max(1, int(max_words * 0.6))
    boundary_matches = list(re.finditer(r'[.!?](?=$|\s)|[;:](?=\s|$)|,(?=\s|$)', shortened))

    for match in reversed(boundary_matches):
        candidate = shortened[:match.end()].rstrip()
        if count_words(candidate) >= preferred_min_words:
            shortened = candidate
            break

    shortened = shortened.rstrip(' ,;:-')
    log_chat_event(f'Reply exceeded {max_words} words and was trimmed automatically.')
    if shortened != normalized and shortened and shortened[-1] not in '.!?':
        shortened += '...'
    return shortened


def cleanup_chatbot_reply(text: str) -> str:
    return truncate_to_word_limit(normalize_chat_reply(text))


def generate_model_chat_reply(message: str, history: list[dict[str, str]]) -> str:
    client = get_openai_client()
    input_messages = build_openai_input(message, history)
    model = get_openai_model()
    log_chat_event(
        f'Preparing OpenAI request with {len(input_messages)} message(s) using model "{model}".'
    )
    log_chat_event('Dispatching request to the OpenAI Responses API.')

    response = client.responses.create(
        model=model,
        instructions=CHAT_SYSTEM_INSTRUCTION,
        input=input_messages,
        max_output_tokens=400
    )
    log_chat_event(
        f'OpenAI Responses API call completed successfully. response_id={getattr(response, "id", "n/a")}'
    )

    reply = extract_response_text(response)
    log_chat_event(f'Extracted response text before fallback: {repr(reply)}')
    if not reply:
        log_chat_event('OpenAI returned no extractable text. Using fallback reply.')
        reply = EMPTY_MODEL_REPLY_FALLBACK

    raw_reply_word_count = count_words(reply)
    log_chat_event(f'OpenAI raw reply word count: {raw_reply_word_count}')

    normalized_reply = cleanup_chatbot_reply(reply)

    return normalized_reply


def strip_ai_style_phrases(text: str) -> str:
    cleaned = text.strip()
    filler_patterns = (
        r'(?:(?<=^)|(?<=[.!?]\s))(?:certainly|absolutely|sure)\b[\s,:!-]*',
        r'(?:(?<=^)|(?<=[.!?]\s))(?:here(?:\'s| is) how)\b[\s,:!-]*',
        r'(?:(?<=^)|(?<=[.!?]\s))(?:i(?: would|\'d)? be happy to help)\b[\s,:!-]*',
        r'(?:(?<=^)|(?<=[.!?]\s))(?:i can help)\b[\s,:!-]*',
        r'(?:(?<=^)|(?<=[.!?]\s))(?:let me explain)\b[\s,:!-]*'
    )
    for pattern in filler_patterns:
        cleaned = re.sub(pattern, '', cleaned, flags=re.IGNORECASE)
    return cleaned.strip()


def normalize_chat_reply(text: str) -> str:
    normalized = text.replace('\r', '\n').replace('\u2022', ' ')
    normalized = strip_ai_style_phrases(normalized)
    normalized = re.sub(r'[*_`#>\[\]()]+', '', normalized)
    normalized = re.sub(r'(?m)^\s*(?:[-*]+|\d+[.)])\s*', '', normalized)
    normalized = re.sub(r'(?:(?<=^)|(?<=[.!?]\s))(?:[-*]+|\d+[.)])\s*', '', normalized)
    normalized = re.sub(r'\s*\n+\s*', '. ', normalized)
    normalized = re.sub(r'\s*[:;]+\s*', '. ', normalized)
    normalized = re.sub(r'\s+', ' ', normalized).strip()
    normalized = re.sub(r'\.\s+\.', '. ', normalized)
    normalized = normalized.strip(' .,;:-')
    if normalized and normalized[-1] not in '.!?':
        normalized += '.'
    return normalized


def truncate_to_word_limit(text: str, max_words: int = MAX_REPLY_WORDS) -> str:
    normalized = re.sub(r'\s+', ' ', text).strip()
    word_matches = list(WORD_PATTERN.finditer(normalized))
    if len(word_matches) <= max_words:
        return normalized

    trim_end = word_matches[max_words - 1].end()
    while trim_end < len(normalized) and not normalized[trim_end].isspace():
        trim_end += 1

    trimmed = normalized[:trim_end].rstrip()
    log_chat_event(f'Reply exceeded {max_words} words and was trimmed automatically.')
    return trimmed


def generate_chat_reply(message: str, history: list[dict[str, str]]) -> dict[str, str]:
    intent = detect_chat_intent(message)
    log_chat_event(f'Detected chat intent: {intent}')

    reply = get_controlled_chat_reply(intent)
    if reply is None:
        log_chat_event('No controlled reply matched. Using OpenAI fallback.')
        reply = generate_model_chat_reply(message, history)
    else:
        log_chat_event(f'Using controlled reply for intent: {intent}')

    reply = truncate_to_word_limit(reply)

    return {
        'reply': reply
    }


class AppRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def do_OPTIONS(self) -> None:
        parsed_path = urlparse(self.path).path
        if parsed_path not in API_CORS_PATHS:
            self.send_response(HTTPStatus.NO_CONTENT)
            self.end_headers()
            return

        log_chat_event(f'Handling CORS preflight for {parsed_path}.')
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()

    def do_POST(self) -> None:
        parsed_path = urlparse(self.path).path
        checkout_post_paths = {CHECKOUT_SESSION_API_PATH, *LEGACY_CHECKOUT_SESSION_API_PATHS}
        if parsed_path not in {CHAT_API_PATH, *checkout_post_paths}:
            self._send_json(HTTPStatus.NOT_FOUND, {'error': 'Route not found.'})
            return

        log_chat_event(f'Received POST {parsed_path} from Origin={self.headers.get("Origin", "n/a")}.')
        content_length_header = self.headers.get('Content-Length', '0')
        try:
            content_length = int(content_length_header)
        except ValueError:
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {'error': 'Invalid request size.'}
            )
            return

        raw_body = self.rfile.read(content_length)
        try:
            payload = json.loads(raw_body.decode('utf-8'))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {'error': 'Request body must be valid JSON.'}
            )
            return

        if parsed_path in checkout_post_paths:
            purchase_type = payload.get('purchase_type')
            log_billing_event(
                f'Checkout session request route hit. path={parsed_path}, '
                f'raw_purchase_type={purchase_type!r}'
            )

            if not isinstance(purchase_type, str) or purchase_type not in SUPPORTED_CHECKOUT_PURCHASE_TYPES:
                self._send_json(
                    HTTPStatus.BAD_REQUEST,
                    {'error': 'A valid purchase_type is required.'}
                )
                return

            try:
                normalized_purchase_type = purchase_type.strip()
                log_billing_event(f'Parsed checkout purchase type: {normalized_purchase_type}')
                response_payload = create_checkout_session(normalized_purchase_type, self)
            except ValueError as error:
                self._send_json(HTTPStatus.BAD_REQUEST, {'error': get_error_message(error)})
                return
            except RuntimeError as error:
                log_billing_exception('Stripe configuration/runtime error', error)
                self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {'error': get_error_message(error)})
                return
            except Exception as error:
                log_billing_exception('Stripe checkout session creation failed', error)
                self._send_json(
                    HTTPStatus.INTERNAL_SERVER_ERROR,
                    {'error': get_error_message(error)}
                )
                return

            self._send_json(HTTPStatus.OK, response_payload)
            return

        message = payload.get('message', '')
        history = payload.get('history', [])
        log_chat_event(
            f'Parsed {CHAT_API_PATH} request. message_length={len(message) if isinstance(message, str) else 0}, '
            f'history_count={len(history) if isinstance(history, list) else 0}'
        )

        if not isinstance(message, str) or not message.strip():
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {'error': 'A non-empty message is required.'}
            )
            return

        if not isinstance(history, list):
            history = []

        try:
            response_payload = generate_chat_reply(message.strip(), history)
            log_chat_event('Returning successful chat response to the frontend.')
        except RuntimeError as error:
            log_chat_exception('Chat configuration/runtime error', error)
            self._send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {'error': str(error)}
            )
            return
        except Exception as error:
            log_chat_exception('OpenAI chat request failed', error)
            self._send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {'error': 'OpenAI request failed. Check the server logs for the exact error.'}
            )
            return

        self._send_json(HTTPStatus.OK, response_payload)

    def do_GET(self) -> None:
        parsed_url = urlparse(self.path)
        if parsed_url.path in {'/', '/index.html'}:
            self._send_text_template(PROJECT_ROOT / 'index.html', 'text/html; charset=utf-8')
            return

        if parsed_url.path == '/styles.css':
            self._send_text_template(PROJECT_ROOT / 'styles.css', 'text/css; charset=utf-8')
            return

        checkout_status_paths = {CHECKOUT_SESSION_STATUS_API_PATH, *LEGACY_CHECKOUT_SESSION_STATUS_PATHS}
        if parsed_url.path not in checkout_status_paths:
            super().do_GET()
            return

        session_id = parse_qs(parsed_url.query).get('session_id', [''])[0].strip()
        if not session_id:
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {'error': 'A session_id query parameter is required.'}
            )
            return

        try:
            response_payload = get_checkout_session_status(session_id)
        except RuntimeError as error:
            log_billing_exception('Stripe configuration/runtime error', error)
            self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {'error': get_error_message(error)})
            return
        except Exception as error:
            log_billing_exception('Stripe checkout session lookup failed', error)
            self._send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {'error': get_error_message(error)}
            )
            return

        self._send_json(HTTPStatus.OK, response_payload)

    def end_headers(self) -> None:
        self._send_dev_no_store_headers()
        if urlparse(self.path).path in API_CORS_PATHS:
            self._send_api_cors_headers()
        super().end_headers()

    def _send_api_cors_headers(self) -> None:
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _send_dev_no_store_headers(self) -> None:
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')

    def _send_json(self, status: HTTPStatus, payload: dict[str, object]) -> None:
        parsed_path = urlparse(self.path).path
        billing_paths = {
            CHECKOUT_SESSION_API_PATH,
            CHECKOUT_SESSION_STATUS_API_PATH,
            *LEGACY_CHECKOUT_SESSION_API_PATHS,
            *LEGACY_CHECKOUT_SESSION_STATUS_PATHS
        }
        if parsed_path in billing_paths:
            log_billing_event(
                f'Returning JSON response for {parsed_path}. '
                f'status={int(status)}, payload={payload}'
            )
        response = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(response)))
        self.end_headers()
        self.wfile.write(response)

    def _send_text_template(self, file_path: Path, content_type: str) -> None:
        rendered_text = file_path.read_text(encoding='utf-8').replace(
            STATIC_ASSET_VERSION_PLACEHOLDER,
            get_static_asset_version()
        )
        response = rendered_text.encode('utf-8')
        self.send_response(HTTPStatus.OK)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(response)))
        self.end_headers()
        self.wfile.write(response)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description='Serve the Minecraft blueprint app and local chat API.'
    )
    parser.add_argument(
        '--port',
        type=int,
        default=int(os.environ.get('PORT', '8000')),
        help='Port to bind the local server to.'
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    loaded_env_files = load_local_env_files()
    server_address = ('0.0.0.0', args.port)
    httpd = ThreadingHTTPServer(server_address, AppRequestHandler)
    print(f'Serving app on port {args.port} (bound to {server_address[0]}).')
    if loaded_env_files:
        print(f'Loaded environment from: {", ".join(loaded_env_files)}')
    else:
        print('No .env or .env.local file found in the project root.')
    print(f'OPENAI_API_KEY detected at startup: {"yes" if bool(os.environ.get("OPENAI_API_KEY")) else "no"}')
    print(f'Stripe SDK available at startup: {"yes" if stripe is not None else "no"}')
    print(f'STRIPE_SECRET_KEY detected at startup: {"yes" if bool(os.environ.get("STRIPE_SECRET_KEY")) else "no"}')
    print('Local development note: set OPENAI_API_KEY before starting the server.')

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down server.')
    finally:
        httpd.server_close()


if __name__ == '__main__':
    main()
