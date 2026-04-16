from __future__ import annotations

import argparse
import base64
import binascii
import hashlib
import hmac
import json
import os
import re
import secrets
import smtplib
import sqlite3
import traceback
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from http import HTTPStatus
from http.cookies import SimpleCookie
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, quote, urlparse

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

if load_dotenv is not None:
    load_dotenv()

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
_database_initialized = False
DEFAULT_OPENAI_MODEL = 'gpt-5-mini'
STATIC_ASSET_VERSION_PLACEHOLDER = '__STATIC_ASSET_VERSION__'
APP_API_ORIGIN_PLACEHOLDER = '__APP_API_ORIGIN__'
CHAT_API_PATH = '/api/chat'
CHECKOUT_SESSION_API_PATH = '/api/create-checkout-session'
CHECKOUT_SESSION_STATUS_API_PATH = '/api/checkout-session-status'
STRIPE_WEBHOOK_API_PATH = '/api/stripe-webhook'
LEGACY_STRIPE_WEBHOOK_API_PATHS = {'/api/stripe/webhook'}
AUTH_ME_API_PATH = '/api/auth/me'
AUTH_REGISTER_API_PATH = '/api/auth/register'
AUTH_LOGIN_API_PATH = '/api/auth/login'
AUTH_LOGOUT_API_PATH = '/api/auth/logout'
AUTH_FORGOT_PASSWORD_API_PATH = '/api/auth/forgot-password'
AUTH_RESET_PASSWORD_API_PATH = '/api/auth/reset-password'
AUTH_PROFILE_IMAGE_API_PATH = '/api/auth/profile-image'
LEGACY_CHECKOUT_SESSION_API_PATHS = {'/create-checkout-session'}
LEGACY_CHECKOUT_SESSION_STATUS_PATHS = {'/checkout-session-status'}
AUTH_API_PATHS = {
    AUTH_ME_API_PATH,
    AUTH_REGISTER_API_PATH,
    AUTH_LOGIN_API_PATH,
    AUTH_LOGOUT_API_PATH,
    AUTH_FORGOT_PASSWORD_API_PATH,
    AUTH_RESET_PASSWORD_API_PATH,
    AUTH_PROFILE_IMAGE_API_PATH
}
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
API_CORS_PATHS = {
    CHAT_API_PATH,
    CHECKOUT_SESSION_API_PATH,
    CHECKOUT_SESSION_STATUS_API_PATH,
    *AUTH_API_PATHS
}
SESSION_COOKIE_NAME = 'blueprint_session'
SESSION_HEADER_NAME = 'X-Blueprint-Session'
SESSION_DURATION_DAYS = 30
PASSWORD_RESET_TOKEN_TTL_MINUTES = 60
PASSWORD_HASH_ITERATIONS = 310000
DATABASE_PATH_ENV_VAR = 'APP_DB_PATH'
PREMIUM_WHITELIST_ENV_VAR = 'PREMIUM_WHITELIST_EMAILS'
STRIPE_WEBHOOK_SECRET_ENV_VAR = 'STRIPE_WEBHOOK_SECRET'
SMTP_SERVER_ENV_VARS = ('SMTP_SERVER', 'SMTP_HOST')
SMTP_PORT_ENV_VAR = 'SMTP_PORT'
SMTP_USERNAME_ENV_VAR = 'SMTP_USERNAME'
SMTP_PASSWORD_ENV_VAR = 'SMTP_PASSWORD'
SMTP_FROM_EMAIL_ENV_VARS = ('EMAIL_FROM', 'SMTP_FROM_EMAIL')
SMTP_USE_TLS_ENV_VAR = 'SMTP_USE_TLS'
PROFILE_IMAGE_MAX_BYTES = 128 * 1024
PROFILE_IMAGE_DATA_URL_PREFIX = 'data:image/png;base64,'
EMAIL_PATTERN = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
SUBSCRIPTION_ACTIVE_STATUSES = {'active', 'trialing'}


class ApiError(Exception):
    def __init__(self, status: HTTPStatus, message: str):
        super().__init__(message)
        self.status = status
        self.message = message


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


def log_auth_event(message: str) -> None:
    print(f'[auth] {message}')


def log_auth_exception(context: str, error: Exception) -> None:
    log_auth_event(f'{context}: {error.__class__.__name__}: {error}')
    for line in traceback.format_exc().splitlines():
        log_auth_event(line)


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


def utc_now() -> datetime:
    return datetime.now(timezone.utc).replace(microsecond=0)


def to_isoformat(value: datetime) -> str:
    return value.astimezone(timezone.utc).replace(microsecond=0).isoformat()


def parse_isoformat(value: str | None) -> datetime | None:
    if not isinstance(value, str) or not value.strip():
        return None

    try:
        parsed = datetime.fromisoformat(value)
    except ValueError:
        return None

    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def normalize_email(email: str) -> str:
    if not isinstance(email, str):
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Invalid email.')

    normalized = email.strip().lower()
    if not normalized or not EMAIL_PATTERN.match(normalized):
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Invalid email.')
    return normalized


def validate_password(password: str) -> str:
    if not isinstance(password, str):
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Password too short.')

    trimmed_password = password.strip()
    if len(trimmed_password) < 5:
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Password too short.')
    if not any(character.isdigit() for character in trimmed_password):
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Password must include a number.')
    return trimmed_password


def validate_password_confirmation(password: str, confirm_password: str) -> str:
    validated_password = validate_password(password)
    normalized_confirmation = confirm_password.strip() if isinstance(confirm_password, str) else ''
    if validated_password != normalized_confirmation:
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Passwords do not match.')
    return validated_password


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    derived_key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        PASSWORD_HASH_ITERATIONS
    )
    encoded_salt = base64.b64encode(salt).decode('ascii')
    encoded_hash = base64.b64encode(derived_key).decode('ascii')
    return f'pbkdf2_sha256${PASSWORD_HASH_ITERATIONS}${encoded_salt}${encoded_hash}'


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        algorithm, iteration_count, encoded_salt, encoded_hash = stored_hash.split('$', 3)
    except ValueError:
        return False

    if algorithm != 'pbkdf2_sha256':
        return False

    try:
        iterations = int(iteration_count)
        salt = base64.b64decode(encoded_salt.encode('ascii'))
        expected_hash = base64.b64decode(encoded_hash.encode('ascii'))
    except (ValueError, TypeError):
        return False

    calculated_hash = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        iterations
    )
    return hmac.compare_digest(calculated_hash, expected_hash)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode('utf-8')).hexdigest()


def generate_token() -> str:
    return secrets.token_urlsafe(32)


def get_database_path() -> Path:
    load_local_env_files()
    configured_path = (os.environ.get(DATABASE_PATH_ENV_VAR) or '').strip()
    if configured_path:
        return Path(configured_path).expanduser()
    return PROJECT_ROOT / 'app.db'


def initialize_database() -> None:
    global _database_initialized

    if _database_initialized:
        return

    database_path = get_database_path()
    database_path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(database_path)
    try:
        connection.execute('PRAGMA foreign_keys = ON')
        connection.executescript(
            '''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password_hash TEXT NOT NULL,
                profile_image_data_url TEXT,
                lifetime_premium_unlocked_at TEXT,
                stripe_customer_id TEXT,
                stripe_subscription_id TEXT,
                stripe_subscription_status TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                last_login_at TEXT
            );

            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token_hash TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL,
                last_seen_at TEXT NOT NULL,
                expires_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token_hash TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL,
                expires_at TEXT NOT NULL,
                used_at TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS stripe_purchases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                stripe_session_id TEXT NOT NULL UNIQUE,
                purchase_type TEXT NOT NULL,
                payment_status TEXT,
                checkout_status TEXT,
                stripe_customer_id TEXT,
                stripe_subscription_id TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS stripe_webhook_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                stripe_event_id TEXT NOT NULL UNIQUE,
                event_type TEXT NOT NULL,
                processed_at TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
            CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
            CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
            CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
            CREATE INDEX IF NOT EXISTS idx_stripe_purchases_user_id ON stripe_purchases(user_id);
            '''
        )
        ensure_table_column(connection, 'users', 'profile_image_data_url', 'TEXT')
        connection.commit()
    finally:
        connection.close()

    _database_initialized = True
    log_auth_event(f'Database initialized at {database_path}.')


def get_database_connection() -> sqlite3.Connection:
    initialize_database()
    connection = sqlite3.connect(get_database_path())
    connection.row_factory = sqlite3.Row
    connection.execute('PRAGMA foreign_keys = ON')
    return connection


def ensure_table_column(
    connection: sqlite3.Connection,
    table_name: str,
    column_name: str,
    column_definition: str
) -> None:
    existing_columns = {
        str(row[1]).strip().lower()
        for row in connection.execute(f'PRAGMA table_info({table_name})').fetchall()
    }
    if column_name.strip().lower() in existing_columns:
        return
    connection.execute(f'ALTER TABLE {table_name} ADD COLUMN {column_name} {column_definition}')


def cleanup_expired_auth_records(connection: sqlite3.Connection) -> None:
    now = to_isoformat(utc_now())
    connection.execute('DELETE FROM sessions WHERE expires_at <= ?', (now,))
    connection.execute(
        'DELETE FROM password_reset_tokens WHERE used_at IS NOT NULL OR expires_at <= ?',
        (now,)
    )


def get_user_by_id(connection: sqlite3.Connection, user_id: int) -> sqlite3.Row | None:
    return connection.execute(
        '''
        SELECT
            id,
            email,
            password_hash,
            profile_image_data_url,
            lifetime_premium_unlocked_at,
            stripe_customer_id,
            stripe_subscription_id,
            stripe_subscription_status,
            created_at,
            updated_at,
            last_login_at
        FROM users
        WHERE id = ?
        ''',
        (user_id,)
    ).fetchone()


def get_user_by_email(connection: sqlite3.Connection, email: str) -> sqlite3.Row | None:
    return connection.execute(
        '''
        SELECT
            id,
            email,
            password_hash,
            profile_image_data_url,
            lifetime_premium_unlocked_at,
            stripe_customer_id,
            stripe_subscription_id,
            stripe_subscription_status,
            created_at,
            updated_at,
            last_login_at
        FROM users
        WHERE email = ?
        ''',
        (email,)
    ).fetchone()


def get_user_by_stripe_customer_id(connection: sqlite3.Connection, customer_id: str) -> sqlite3.Row | None:
    return connection.execute(
        '''
        SELECT
            id,
            email,
            password_hash,
            profile_image_data_url,
            lifetime_premium_unlocked_at,
            stripe_customer_id,
            stripe_subscription_id,
            stripe_subscription_status,
            created_at,
            updated_at,
            last_login_at
        FROM users
        WHERE stripe_customer_id = ?
        ''',
        (customer_id,)
    ).fetchone()


def get_user_by_stripe_subscription_id(connection: sqlite3.Connection, subscription_id: str) -> sqlite3.Row | None:
    return connection.execute(
        '''
        SELECT
            id,
            email,
            password_hash,
            profile_image_data_url,
            lifetime_premium_unlocked_at,
            stripe_customer_id,
            stripe_subscription_id,
            stripe_subscription_status,
            created_at,
            updated_at,
            last_login_at
        FROM users
        WHERE stripe_subscription_id = ?
        ''',
        (subscription_id,)
    ).fetchone()


def get_stripe_purchase_by_session_id(
    connection: sqlite3.Connection,
    session_id: str
) -> sqlite3.Row | None:
    return connection.execute(
        '''
        SELECT
            id,
            user_id,
            stripe_session_id,
            purchase_type,
            payment_status,
            checkout_status,
            stripe_customer_id,
            stripe_subscription_id,
            created_at,
            updated_at
        FROM stripe_purchases
        WHERE stripe_session_id = ?
        ''',
        (session_id,)
    ).fetchone()


def create_session(
    connection: sqlite3.Connection,
    user_id: int,
    *,
    current_time: datetime | None = None
) -> tuple[str, str]:
    now = current_time or utc_now()
    expires_at = now + timedelta(days=SESSION_DURATION_DAYS)
    session_token = generate_token()
    connection.execute(
        '''
        INSERT INTO sessions (
            user_id,
            token_hash,
            created_at,
            last_seen_at,
            expires_at
        )
        VALUES (?, ?, ?, ?, ?)
        ''',
        (
            user_id,
            hash_token(session_token),
            to_isoformat(now),
            to_isoformat(now),
            to_isoformat(expires_at)
        )
    )
    return session_token, to_isoformat(expires_at)


def get_session_token_from_cookie_header(cookie_header: str | None) -> str | None:
    if not isinstance(cookie_header, str) or not cookie_header.strip():
        return None

    cookie = SimpleCookie()
    try:
        cookie.load(cookie_header)
    except Exception:
        return None

    morsel = cookie.get(SESSION_COOKIE_NAME)
    if morsel is None:
        return None

    token = morsel.value.strip()
    return token or None


def get_session_token_from_header(header_value: str | None) -> str | None:
    if not isinstance(header_value, str):
        return None

    token = header_value.strip()
    return token or None


def get_session_token_from_request(handler: SimpleHTTPRequestHandler) -> str | None:
    return (
        get_session_token_from_cookie_header(handler.headers.get('Cookie'))
        or get_session_token_from_header(handler.headers.get(SESSION_HEADER_NAME))
    )


def should_include_session_transport_payload(handler: SimpleHTTPRequestHandler) -> bool:
    request_origin = handler.headers.get('Origin')
    return isinstance(request_origin, str) and request_origin.strip().lower() == 'null'


def build_session_transport_payload(
    handler: SimpleHTTPRequestHandler,
    session_token: str,
    expires_at: str
) -> dict[str, str]:
    if not should_include_session_transport_payload(handler):
        return {}

    return {
        'session_transport': 'header',
        'session_token': session_token,
        'session_expires_at': expires_at
    }


def get_authenticated_user_record(
    connection: sqlite3.Connection,
    handler: SimpleHTTPRequestHandler,
    *,
    refresh_session: bool = False
) -> tuple[sqlite3.Row | None, str | None]:
    cleanup_expired_auth_records(connection)
    session_token = get_session_token_from_request(handler)
    if not session_token:
        return None, None

    token_hash = hash_token(session_token)
    session_row = connection.execute(
        '''
        SELECT
            sessions.id AS session_id,
            sessions.user_id AS user_id,
            sessions.expires_at AS expires_at,
            users.id AS id,
            users.email AS email,
            users.password_hash AS password_hash,
            users.profile_image_data_url AS profile_image_data_url,
            users.lifetime_premium_unlocked_at AS lifetime_premium_unlocked_at,
            users.stripe_customer_id AS stripe_customer_id,
            users.stripe_subscription_id AS stripe_subscription_id,
            users.stripe_subscription_status AS stripe_subscription_status,
            users.created_at AS created_at,
            users.updated_at AS updated_at,
            users.last_login_at AS last_login_at
        FROM sessions
        INNER JOIN users ON users.id = sessions.user_id
        WHERE sessions.token_hash = ?
        ''',
        (token_hash,)
    ).fetchone()
    if session_row is None:
        return None, None

    expires_at = parse_isoformat(session_row['expires_at'])
    if expires_at is None or expires_at <= utc_now():
        connection.execute('DELETE FROM sessions WHERE token_hash = ?', (token_hash,))
        return None, None

    if refresh_session:
        now = utc_now()
        refreshed_expiration = now + timedelta(days=SESSION_DURATION_DAYS)
        connection.execute(
            '''
            UPDATE sessions
            SET last_seen_at = ?, expires_at = ?
            WHERE id = ?
            ''',
            (
                to_isoformat(now),
                to_isoformat(refreshed_expiration),
                session_row['session_id']
            )
        )

    user_row = get_user_by_id(connection, int(session_row['id']))
    return user_row, session_token


def get_premium_whitelist_emails() -> set[str]:
    load_local_env_files()
    raw_value = (os.environ.get(PREMIUM_WHITELIST_ENV_VAR) or '').strip()
    if not raw_value:
        return set()
    return {
        item.strip().lower()
        for item in raw_value.split(',')
        if item.strip()
    }


def is_premium_whitelisted(email: str) -> bool:
    return email.strip().lower() in get_premium_whitelist_emails()


def sync_user_subscription_status(
    connection: sqlite3.Connection,
    user_row: sqlite3.Row
) -> sqlite3.Row:
    refreshed_user = get_user_by_id(connection, int(user_row['id']))
    return refreshed_user if refreshed_user is not None else user_row


def get_user_premium_state(user_row: sqlite3.Row) -> dict[str, object]:
    email = str(user_row['email'])
    subscription_status = str(user_row['stripe_subscription_status'] or '').strip()

    if is_premium_whitelisted(email):
        return {
            'has_premium_access': True,
            'premium_source': 'whitelist',
            'subscription_status': subscription_status or None
        }

    if user_row['lifetime_premium_unlocked_at']:
        return {
            'has_premium_access': True,
            'premium_source': 'lifetime',
            'subscription_status': subscription_status or None
        }

    if subscription_status in SUBSCRIPTION_ACTIVE_STATUSES:
        return {
            'has_premium_access': True,
            'premium_source': 'subscription',
            'subscription_status': subscription_status
        }

    return {
        'has_premium_access': False,
        'premium_source': 'none',
        'subscription_status': subscription_status or None
    }


def build_public_user_payload(user_row: sqlite3.Row) -> dict[str, object]:
    premium_state = get_user_premium_state(user_row)
    profile_image_url = str(user_row['profile_image_data_url'] or '').strip() or None
    profile_image_version = hash_token(profile_image_url)[:16] if profile_image_url else None
    return {
        'email': user_row['email'],
        'profile_image_url': profile_image_url,
        'profile_image_version': profile_image_version,
        'has_premium_access': premium_state['has_premium_access'],
        'premium_source': premium_state['premium_source'],
        'subscription_status': premium_state['subscription_status']
    }


def build_profile_image_debug_summary(profile_image_url: object, profile_image_version: object = None) -> str:
    normalized_image_url = str(profile_image_url or '').strip()
    normalized_version = str(profile_image_version or '').strip()
    if not normalized_image_url:
        return 'present=no'
    image_kind = 'data-url' if normalized_image_url.startswith('data:') else 'url'
    preview = normalized_image_url[:32]
    return (
        f'present=yes kind={image_kind} length={len(normalized_image_url)} '
        f'version={normalized_version or "none"} preview={preview!r}'
    )


def validate_profile_image_data_url(image_data_url: str) -> str:
    normalized_data_url = str(image_data_url or '').strip()
    if not normalized_data_url:
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Choose an image first.')
    if not normalized_data_url.startswith(PROFILE_IMAGE_DATA_URL_PREFIX):
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Profile image must be a PNG.')

    encoded_image = normalized_data_url[len(PROFILE_IMAGE_DATA_URL_PREFIX):]
    try:
        image_bytes = base64.b64decode(encoded_image, validate=True)
    except (binascii.Error, ValueError) as error:
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Profile image is invalid.') from error

    if len(image_bytes) > PROFILE_IMAGE_MAX_BYTES:
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Profile image is too large.')
    if not image_bytes.startswith(b'\x89PNG\r\n\x1a\n'):
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Profile image is invalid.')

    return normalized_data_url


def update_profile_image(
    handler: SimpleHTTPRequestHandler,
    image_data_url: str
) -> sqlite3.Row:
    validated_image_data_url = validate_profile_image_data_url(image_data_url)
    connection = get_database_connection()
    try:
        user_row, _ = get_authenticated_user_record(connection, handler, refresh_session=True)
        if user_row is None:
            raise ApiError(HTTPStatus.UNAUTHORIZED, 'Log in before updating your profile picture.')

        connection.execute(
            '''
            UPDATE users
            SET profile_image_data_url = ?, updated_at = ?
            WHERE id = ?
            ''',
            (
                validated_image_data_url,
                to_isoformat(utc_now()),
                user_row['id']
            )
        )
        connection.commit()
        refreshed_user = get_user_by_id(connection, int(user_row['id']))
        if refreshed_user is None:
            raise RuntimeError('Unable to load the updated account.')
        return refreshed_user
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def set_session_cookie(
    handler: SimpleHTTPRequestHandler,
    session_token: str,
    expires_at: str
) -> str:
    request_origin = get_request_origin(handler)
    secure_cookie = request_origin.startswith('https://')
    cookie_parts = [
        f'{SESSION_COOKIE_NAME}={session_token}',
        'Path=/',
        'HttpOnly',
        'SameSite=Lax'
    ]
    if secure_cookie:
        cookie_parts.append('Secure')

    expiration = parse_isoformat(expires_at)
    if expiration is not None:
        max_age = max(0, int((expiration - utc_now()).total_seconds()))
        cookie_parts.append(f'Max-Age={max_age}')

    return '; '.join(cookie_parts)


def clear_session_cookie(handler: SimpleHTTPRequestHandler) -> str:
    request_origin = get_request_origin(handler)
    secure_cookie = request_origin.startswith('https://')
    cookie_parts = [
        f'{SESSION_COOKIE_NAME}=',
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        'Max-Age=0'
    ]
    if secure_cookie:
        cookie_parts.append('Secure')

    return '; '.join(cookie_parts)


def register_user_account(email: str, password: str, confirm_password: str) -> tuple[sqlite3.Row, str, str]:
    normalized_email = normalize_email(email)
    validated_password = validate_password_confirmation(password, confirm_password)
    now = utc_now()
    timestamp = to_isoformat(now)

    connection = get_database_connection()
    try:
        cleanup_expired_auth_records(connection)
        existing_user = get_user_by_email(connection, normalized_email)
        if existing_user is not None:
            raise ApiError(HTTPStatus.CONFLICT, 'Email already in use.')

        cursor = connection.execute(
            '''
            INSERT INTO users (
                email,
                password_hash,
                created_at,
                updated_at
            )
            VALUES (?, ?, ?, ?)
            ''',
            (
                normalized_email,
                hash_password(validated_password),
                timestamp,
                timestamp
            )
        )
        session_token, expires_at = create_session(connection, int(cursor.lastrowid), current_time=now)
        connection.commit()
        created_user = get_user_by_id(connection, int(cursor.lastrowid))
        if created_user is None:
            raise RuntimeError('User creation did not return a record.')
        return created_user, session_token, expires_at
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def login_user_account(email: str, password: str) -> tuple[sqlite3.Row, str, str]:
    normalized_email = normalize_email(email)
    connection = get_database_connection()
    try:
        cleanup_expired_auth_records(connection)
        user_row = get_user_by_email(connection, normalized_email)
        if user_row is None:
            raise ApiError(HTTPStatus.NOT_FOUND, 'Account not found.')
        if not verify_password(password, str(user_row['password_hash'])):
            raise ApiError(HTTPStatus.UNAUTHORIZED, 'Wrong password.')

        now = utc_now()
        connection.execute(
            '''
            UPDATE users
            SET last_login_at = ?, updated_at = ?
            WHERE id = ?
            ''',
            (
                to_isoformat(now),
                to_isoformat(now),
                user_row['id']
            )
        )
        session_token, expires_at = create_session(connection, int(user_row['id']), current_time=now)
        connection.commit()
        refreshed_user = get_user_by_id(connection, int(user_row['id']))
        if refreshed_user is None:
            raise RuntimeError('Unable to load the logged-in user.')
        return refreshed_user, session_token, expires_at
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def logout_user_account(session_token: str | None) -> None:
    if not session_token:
        return

    connection = get_database_connection()
    try:
        connection.execute('DELETE FROM sessions WHERE token_hash = ?', (hash_token(session_token),))
        connection.commit()
    finally:
        connection.close()


def get_first_configured_env_value(*env_var_names: str) -> str:
    load_local_env_files()
    for env_var_name in env_var_names:
        value = (os.environ.get(env_var_name) or '').strip()
        if value:
            return value
    return ''


def get_smtp_server() -> str:
    return get_first_configured_env_value(*SMTP_SERVER_ENV_VARS)


def get_smtp_from_email() -> str:
    return get_first_configured_env_value(*SMTP_FROM_EMAIL_ENV_VARS)


def get_smtp_port() -> int | None:
    raw_value = (os.environ.get(SMTP_PORT_ENV_VAR) or '').strip()
    if not raw_value:
        return None

    try:
        return int(raw_value)
    except ValueError as error:
        raise RuntimeError(f'{SMTP_PORT_ENV_VAR} must be a valid integer.') from error


def is_truthy_env_value(value: str | None, *, default: bool = False) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {'1', 'true', 'yes', 'on'}


def is_smtp_configured() -> bool:
    smtp_server = get_smtp_server()
    smtp_from_email = get_smtp_from_email()
    smtp_username = (os.environ.get(SMTP_USERNAME_ENV_VAR) or '').strip()
    smtp_password = os.environ.get(SMTP_PASSWORD_ENV_VAR) or ''
    has_valid_auth_config = not (smtp_username or smtp_password) or bool(smtp_username and smtp_password)
    return bool(smtp_server and smtp_from_email and get_smtp_port() and has_valid_auth_config)


def send_password_reset_email(email: str, reset_url: str) -> None:
    smtp_host = get_smtp_server()
    smtp_port = get_smtp_port()
    smtp_username = (os.environ.get(SMTP_USERNAME_ENV_VAR) or '').strip()
    smtp_password = os.environ.get(SMTP_PASSWORD_ENV_VAR) or ''
    smtp_from_email = get_smtp_from_email()
    smtp_use_tls = is_truthy_env_value(os.environ.get(SMTP_USE_TLS_ENV_VAR), default=True)

    if not smtp_host or not smtp_port or not smtp_from_email:
        raise RuntimeError('SMTP is not fully configured.')
    if (smtp_username or smtp_password) and not (smtp_username and smtp_password):
        raise RuntimeError('SMTP credentials are incomplete.')

    message = EmailMessage()
    message['Subject'] = 'Reset your Photosynthesizer password'
    message['From'] = smtp_from_email
    message['To'] = email
    message.set_content(
        'Use this link to reset your password:\n'
        f'{reset_url}\n\n'
        f'This link expires in {PASSWORD_RESET_TOKEN_TTL_MINUTES} minutes.'
    )

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as smtp_client:
        smtp_client.ehlo()
        if smtp_use_tls:
            smtp_client.starttls()
            smtp_client.ehlo()
        if smtp_username:
            smtp_client.login(smtp_username, smtp_password)
        smtp_client.send_message(message)


def build_password_reset_url(handler: SimpleHTTPRequestHandler, token: str) -> str:
    return f'{get_request_origin(handler)}/?reset_token={quote(token)}'


def create_password_reset_request(
    email: str,
    handler: SimpleHTTPRequestHandler
) -> dict[str, object]:
    normalized_email = normalize_email(email)
    now = utc_now()
    expires_at = now + timedelta(minutes=PASSWORD_RESET_TOKEN_TTL_MINUTES)
    session_token = generate_token()
    reset_url = build_password_reset_url(handler, session_token)
    email_delivery_configured = is_smtp_configured()

    connection = get_database_connection()
    try:
        cleanup_expired_auth_records(connection)
        user_row = get_user_by_email(connection, normalized_email)
        if user_row is None:
            raise ApiError(HTTPStatus.NOT_FOUND, 'Account not found.')

        connection.execute(
            'DELETE FROM password_reset_tokens WHERE user_id = ?',
            (user_row['id'],)
        )
        connection.execute(
            '''
            INSERT INTO password_reset_tokens (
                user_id,
                token_hash,
                created_at,
                expires_at
            )
            VALUES (?, ?, ?, ?)
            ''',
            (
                user_row['id'],
                hash_token(session_token),
                to_isoformat(now),
                to_isoformat(expires_at)
            )
        )
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()

    if email_delivery_configured:
        send_password_reset_email(normalized_email, reset_url)
        return {
            'message': 'Password reset link sent. Check your email.',
            'email_delivery_configured': True
        }

    log_auth_event(
        f'Password reset email requested for {normalized_email}, but SMTP is not configured. '
        f'Reset URL: {reset_url}'
    )
    response_payload: dict[str, object] = {
        'message': 'Password reset email sending is not configured yet. Add SMTP settings to enable it.',
        'email_delivery_configured': False
    }
    if is_local_host(handler.headers.get('Host', '')):
        response_payload['reset_url'] = reset_url
    return response_payload


def reset_password_with_token(token: str, password: str) -> tuple[sqlite3.Row, str, str]:
    normalized_token = token.strip()
    if not normalized_token:
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Reset link is invalid or expired.')

    validated_password = validate_password(password)
    connection = get_database_connection()
    try:
        cleanup_expired_auth_records(connection)
        token_row = connection.execute(
            '''
            SELECT
                password_reset_tokens.id AS reset_token_id,
                password_reset_tokens.user_id AS user_id
            FROM password_reset_tokens
            WHERE password_reset_tokens.token_hash = ?
              AND password_reset_tokens.used_at IS NULL
              AND password_reset_tokens.expires_at > ?
            ''',
            (
                hash_token(normalized_token),
                to_isoformat(utc_now())
            )
        ).fetchone()
        if token_row is None:
            raise ApiError(HTTPStatus.BAD_REQUEST, 'Reset link is invalid or expired.')

        now = utc_now()
        timestamp = to_isoformat(now)
        connection.execute(
            '''
            UPDATE users
            SET password_hash = ?,
                updated_at = ?
            WHERE id = ?
            ''',
            (
                hash_password(validated_password),
                timestamp,
                token_row['user_id']
            )
        )
        connection.execute(
            '''
            UPDATE password_reset_tokens
            SET used_at = ?
            WHERE id = ?
            ''',
            (
                timestamp,
                token_row['reset_token_id']
            )
        )
        connection.execute('DELETE FROM sessions WHERE user_id = ?', (token_row['user_id'],))
        new_session_token, expires_at = create_session(connection, int(token_row['user_id']), current_time=now)
        connection.commit()
        user_row = get_user_by_id(connection, int(token_row['user_id']))
        if user_row is None:
            raise RuntimeError('Unable to load the password-reset user.')
        return user_row, new_session_token, expires_at
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def get_authenticated_user_payload(
    handler: SimpleHTTPRequestHandler,
    *,
    refresh_session: bool = False
) -> dict[str, object] | None:
    connection = get_database_connection()
    try:
        user_row, _ = get_authenticated_user_record(connection, handler, refresh_session=refresh_session)
        if user_row is None:
            connection.commit()
            return None
        synced_user = sync_user_subscription_status(connection, user_row)
        connection.commit()
        return build_public_user_payload(synced_user)
    finally:
        connection.close()


def read_stripe_field(value, field_name: str):
    if value is None:
        return None
    if isinstance(value, dict):
        return value.get(field_name)
    return getattr(value, field_name, None)


def read_stripe_string(value, field_name: str) -> str:
    field_value = read_stripe_field(value, field_name)
    if isinstance(field_value, str):
        return field_value.strip()
    return ''


def read_stripe_metadata(value) -> dict[str, object]:
    metadata = read_stripe_field(value, 'metadata')
    if isinstance(metadata, dict):
        return metadata
    return {}


def read_stripe_user_id_from_metadata(value) -> int | None:
    metadata = read_stripe_metadata(value)
    raw_user_id = str(metadata.get('user_id', '')).strip()
    if raw_user_id.isdigit():
        return int(raw_user_id)
    return None


def read_stripe_email_from_metadata(value) -> str:
    metadata = read_stripe_metadata(value)
    for field_name in ('user_email', 'email'):
        raw_email = str(metadata.get(field_name, '')).strip()
        if not raw_email:
            continue
        try:
            return normalize_email(raw_email)
        except ApiError:
            continue
    return ''


def resolve_checkout_purchase_type(checkout_session) -> str:
    metadata = read_stripe_metadata(checkout_session)
    purchase_type = str(metadata.get('purchase_type', '')).strip()
    if purchase_type in SUPPORTED_CHECKOUT_PURCHASE_TYPES:
        return purchase_type

    mode = read_stripe_string(checkout_session, 'mode')
    subscription_id = read_stripe_string(checkout_session, 'subscription')

    if subscription_id or mode == 'subscription':
        return 'monthly_subscription'

    if mode == 'payment':
        return 'lifetime_unlock'

    return ''


def mark_stripe_webhook_event_processed(
    connection: sqlite3.Connection,
    event_id: str,
    event_type: str
) -> bool:
    now = to_isoformat(utc_now())
    cursor = connection.execute(
        '''
        INSERT OR IGNORE INTO stripe_webhook_events (
            stripe_event_id,
            event_type,
            processed_at
        )
        VALUES (?, ?, ?)
        ''',
        (event_id, event_type, now)
    )
    return cursor.rowcount > 0


def resolve_checkout_user(
    connection: sqlite3.Connection,
    checkout_session
) -> sqlite3.Row | None:
    user_id = read_stripe_user_id_from_metadata(checkout_session)
    if user_id is not None:
        print(f"[webhook] matching by metadata.user_id={user_id}")
        user_row = get_user_by_id(connection, user_id)
        if user_row is not None:
            print(f"[webhook] matched user id={int(user_row['id'])}")
            return user_row

    client_reference_id = read_stripe_string(checkout_session, 'client_reference_id')
    if client_reference_id.isdigit():
        print(f"[webhook] matching by client_reference_id={client_reference_id}")
        user_row = get_user_by_id(connection, int(client_reference_id))
        if user_row is not None:
            print(f"[webhook] matched user id={int(user_row['id'])}")
            return user_row

    customer_email = read_stripe_string(checkout_session, 'customer_email')
    if customer_email:
        try:
            normalized_email = normalize_email(customer_email)
        except ApiError:
            normalized_email = ''
        if normalized_email:
            print(f"[webhook] matching by customer_email={normalized_email}")
            user_row = get_user_by_email(connection, normalized_email)
            if user_row is not None:
                print(f"[webhook] matched user id={int(user_row['id'])}")
                return user_row

    metadata_email = read_stripe_email_from_metadata(checkout_session)
    if metadata_email:
        print(f"[webhook] matching by metadata.email={metadata_email}")
        user_row = get_user_by_email(connection, metadata_email)
        if user_row is not None:
            print(f"[webhook] matched user id={int(user_row['id'])}")
            return user_row

    customer_id = read_stripe_string(checkout_session, 'customer')
    if customer_id:
        print(f"[webhook] matching by customer_id={customer_id}")
        user_row = get_user_by_stripe_customer_id(connection, customer_id)
        if user_row is not None:
            print(f"[webhook] matched user id={int(user_row['id'])}")
            return user_row

    return None


def resolve_subscription_user(
    connection: sqlite3.Connection,
    subscription_like
) -> sqlite3.Row | None:
    user_id = read_stripe_user_id_from_metadata(subscription_like)
    if user_id is not None:
        user_row = get_user_by_id(connection, user_id)
        if user_row is not None:
            return user_row

    subscription_id = read_stripe_string(subscription_like, 'id')
    if subscription_id:
        user_row = get_user_by_stripe_subscription_id(connection, subscription_id)
        if user_row is not None:
            return user_row

    linked_subscription_id = read_stripe_string(subscription_like, 'subscription')
    if linked_subscription_id:
        user_row = get_user_by_stripe_subscription_id(connection, linked_subscription_id)
        if user_row is not None:
            return user_row

    customer_id = read_stripe_string(subscription_like, 'customer')
    if customer_id:
        user_row = get_user_by_stripe_customer_id(connection, customer_id)
        if user_row is not None:
            return user_row

    customer_email = read_stripe_string(subscription_like, 'customer_email')
    if customer_email:
        try:
            normalized_email = normalize_email(customer_email)
        except ApiError:
            normalized_email = ''
        if normalized_email:
            user_row = get_user_by_email(connection, normalized_email)
            if user_row is not None:
                return user_row

    metadata_email = read_stripe_email_from_metadata(subscription_like)
    if metadata_email:
        return get_user_by_email(connection, metadata_email)

    return None


def update_user_subscription_record(
    connection: sqlite3.Connection,
    *,
    user_id: int,
    stripe_customer_id: str | None,
    stripe_subscription_id: str | None,
    stripe_subscription_status: str | None
) -> None:
    now = to_isoformat(utc_now())
    connection.execute(
        '''
        UPDATE users
        SET stripe_customer_id = COALESCE(?, stripe_customer_id),
            stripe_subscription_id = COALESCE(?, stripe_subscription_id),
            stripe_subscription_status = ?,
            updated_at = ?
        WHERE id = ?
        ''',
        (
            stripe_customer_id,
            stripe_subscription_id,
            stripe_subscription_status,
            now,
            user_id
        )
    )


def process_checkout_session_activation(
    connection: sqlite3.Connection,
    checkout_session
) -> bool:
    session_id = read_stripe_string(checkout_session, 'id')
    customer_details = read_stripe_field(checkout_session, 'customer_details') or {}
    customer_email = read_stripe_string(customer_details, 'email') or read_stripe_string(checkout_session, 'customer_email')
    client_reference_id = read_stripe_string(checkout_session, 'client_reference_id')
    metadata = read_stripe_metadata(checkout_session)
    print(f"[webhook] checkout.session.completed session_id={session_id}")
    print(f"[webhook] email={customer_email}")
    print(f"[webhook] client_reference_id={client_reference_id}")
    print(f"[webhook] metadata={metadata}")

    user_row = resolve_checkout_user(connection, checkout_session)
    if user_row is None:
        print("[webhook] no matching user found")
        log_billing_event(f'No user match found for completed checkout session {session_id}.')
        return False

    purchase_type = resolve_checkout_purchase_type(checkout_session)
    if purchase_type not in SUPPORTED_CHECKOUT_PURCHASE_TYPES:
        log_billing_event(f'Ignoring checkout session {session_id} with unsupported purchase type {purchase_type!r}.')
        return False

    payment_status = read_stripe_string(checkout_session, 'payment_status')
    checkout_status = read_stripe_string(checkout_session, 'status')
    stripe_customer_id = read_stripe_string(checkout_session, 'customer') or None
    stripe_subscription_id = read_stripe_string(checkout_session, 'subscription') or None

    if purchase_type == 'lifetime_unlock' and payment_status != 'paid':
        log_billing_event(
            f'Skipping lifetime unlock activation for checkout session {session_id} because payment_status={payment_status!r}.'
        )
        return False

    if purchase_type == 'monthly_subscription' and checkout_status != 'complete':
        log_billing_event(
            f'Skipping subscription activation for checkout session {session_id} because checkout_status={checkout_status!r}.'
        )
        return False

    print("[webhook] attempting premium update")
    apply_checkout_to_user_account(
        connection,
        session_id=session_id,
        user_id=int(user_row['id']),
        purchase_type=purchase_type,
        payment_status=payment_status,
        checkout_status=checkout_status,
        stripe_customer_id=stripe_customer_id,
        stripe_subscription_id=stripe_subscription_id
    )
    return True


def process_subscription_status_event(
    connection: sqlite3.Connection,
    subscription_like
) -> None:
    user_row = resolve_subscription_user(connection, subscription_like)
    if user_row is None:
        subscription_id = read_stripe_string(subscription_like, 'id') or read_stripe_string(subscription_like, 'subscription')
        log_billing_event(f'No user match found for subscription event {subscription_id}.')
        return

    update_user_subscription_record(
        connection,
        user_id=int(user_row['id']),
        stripe_customer_id=read_stripe_string(subscription_like, 'customer') or None,
        stripe_subscription_id=read_stripe_string(subscription_like, 'id') or read_stripe_string(subscription_like, 'subscription') or None,
        stripe_subscription_status=read_stripe_string(subscription_like, 'status') or None
    )


def handle_verified_stripe_webhook(raw_body: bytes, signature_header: str | None) -> dict[str, object]:
    stripe_client = get_stripe_client()
    webhook_secret = get_stripe_webhook_secret()
    if not isinstance(signature_header, str) or not signature_header.strip():
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Missing Stripe signature header.')

    try:
        event = stripe_client.Webhook.construct_event(
            payload=raw_body,
            sig_header=signature_header,
            secret=webhook_secret
        )
    except ValueError as error:
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Invalid Stripe webhook payload.') from error
    except Exception as error:
        if error.__class__.__name__ == 'SignatureVerificationError':
            print("[webhook] Signature verification failed")
        raise ApiError(HTTPStatus.BAD_REQUEST, get_error_message(error)) from error

    event_id = read_stripe_string(event, 'id')
    event_type = read_stripe_string(event, 'type')
    print(f"[webhook] verified event type={event['type']}")
    event_object = read_stripe_field(read_stripe_field(event, 'data') or {}, 'object')
    if not event_id or not event_type:
        raise ApiError(HTTPStatus.BAD_REQUEST, 'Stripe webhook payload is missing an id or type.')

    connection = get_database_connection()
    try:
        premium_update_applied = False
        is_duplicate = not mark_stripe_webhook_event_processed(connection, event_id, event_type)
        if is_duplicate:
            log_billing_event(
                f'Reprocessing duplicate Stripe webhook event {event_id} ({event_type}) because handlers are idempotent.'
            )

        if event_type in {'checkout.session.completed', 'checkout.session.async_payment_succeeded'}:
            premium_update_applied = process_checkout_session_activation(connection, event_object)
        elif event_type in {'customer.subscription.updated', 'customer.subscription.deleted'}:
            process_subscription_status_event(connection, event_object)

        connection.commit()
        if premium_update_applied:
            print("[webhook] premium update committed")
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()

    log_billing_event(f'Processed Stripe webhook event {event_id} ({event_type}).')
    return {'received': True, 'event_type': event_type, 'duplicate': is_duplicate}


def apply_checkout_to_user_account(
    connection: sqlite3.Connection,
    *,
    session_id: str,
    user_id: int,
    purchase_type: str,
    payment_status: str,
    checkout_status: str,
    stripe_customer_id: str | None,
    stripe_subscription_id: str | None
) -> None:
    now = to_isoformat(utc_now())
    connection.execute(
        '''
        INSERT INTO stripe_purchases (
            user_id,
            stripe_session_id,
            purchase_type,
            payment_status,
            checkout_status,
            stripe_customer_id,
            stripe_subscription_id,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(stripe_session_id) DO UPDATE SET
            payment_status = excluded.payment_status,
            checkout_status = excluded.checkout_status,
            stripe_customer_id = COALESCE(excluded.stripe_customer_id, stripe_purchases.stripe_customer_id),
            stripe_subscription_id = COALESCE(excluded.stripe_subscription_id, stripe_purchases.stripe_subscription_id),
            updated_at = excluded.updated_at
        ''',
        (
            user_id,
            session_id,
            purchase_type,
            payment_status,
            checkout_status,
            stripe_customer_id,
            stripe_subscription_id,
            now,
            now
        )
    )

    if purchase_type == 'lifetime_unlock':
        connection.execute(
            '''
            UPDATE users
            SET lifetime_premium_unlocked_at = COALESCE(lifetime_premium_unlocked_at, ?),
                stripe_customer_id = COALESCE(?, stripe_customer_id),
                updated_at = ?
            WHERE id = ?
            ''',
            (
                now,
                stripe_customer_id,
                now,
                user_id
            )
        )
        return

    if purchase_type == 'monthly_subscription':
        connection.execute(
            '''
            UPDATE users
            SET stripe_customer_id = COALESCE(?, stripe_customer_id),
                stripe_subscription_id = COALESCE(?, stripe_subscription_id),
                stripe_subscription_status = ?,
                updated_at = ?
            WHERE id = ?
            ''',
            (
                stripe_customer_id,
                stripe_subscription_id,
                'active' if checkout_status == 'complete' else checkout_status,
                now,
                user_id
            )
        )


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


def get_stripe_webhook_secret() -> str:
    load_local_env_files()
    webhook_secret = (os.environ.get(STRIPE_WEBHOOK_SECRET_ENV_VAR) or '').strip()
    if not webhook_secret:
        raise RuntimeError(
            f'{STRIPE_WEBHOOK_SECRET_ENV_VAR} is missing. Configure the Stripe webhook signing secret.'
        )
    return webhook_secret


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

    connection = get_database_connection()
    try:
        user_row, _ = get_authenticated_user_record(connection, handler, refresh_session=True)
        if user_row is None:
            connection.commit()
            raise ApiError(
                HTTPStatus.UNAUTHORIZED,
                'Create an account or log in before starting checkout.'
            )
        synced_user = sync_user_subscription_status(connection, user_row)
        connection.commit()
    finally:
        connection.close()

    success_url, cancel_url = build_checkout_urls(handler)
    metadata = {
        'purchase_type': purchase_type,
        'user_id': str(synced_user['id']),
        'user_email': str(synced_user['email']),
        'email': str(synced_user['email'])
    }
    mode = checkout_config['mode']
    session_kwargs = {
        'mode': mode,
        'success_url': success_url,
        'cancel_url': cancel_url,
        'client_reference_id': str(synced_user['id']),
        'line_items': checkout_config['line_items'],
        'metadata': metadata
    }
    existing_customer_id = str(synced_user['stripe_customer_id'] or '').strip()
    if existing_customer_id:
        session_kwargs['customer'] = existing_customer_id
    else:
        session_kwargs['customer_email'] = str(synced_user['email'])
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
    print(f"[billing] checkout session created session_id={session_id} user_id={synced_user['id']}")
    return {
        'checkout_url': session_url,
        'session_id': session_id
    }


def get_checkout_session_status(session_id: str) -> dict[str, object]:
    stripe_client = get_stripe_client()
    log_billing_event(f'Checking checkout session status. session_id={session_id}')
    session = stripe_client.checkout.Session.retrieve(session_id)
    payment_status = read_stripe_string(session, 'payment_status')
    checkout_status = read_stripe_string(session, 'status')
    purchase_type = resolve_checkout_purchase_type(session)
    normalized_subscription_id = read_stripe_string(session, 'subscription')
    is_paid = payment_status == 'paid' or checkout_status == 'complete'
    response_payload: dict[str, object] = {
        'is_paid': payment_status == 'paid' or checkout_status == 'complete',
        'purchase_type': purchase_type,
        'payment_status': payment_status,
        'checkout_status': checkout_status,
        'premium_activated': False
    }

    metadata = read_stripe_metadata(session)
    raw_user_id = str(metadata.get('user_id', '')).strip()
    if raw_user_id.isdigit():
        connection = get_database_connection()
        try:
            user_row = get_user_by_id(connection, int(raw_user_id))
            purchase_row = get_stripe_purchase_by_session_id(connection, session_id)
            if user_row is not None:
                public_user_payload = build_public_user_payload(user_row)
                response_payload['user'] = public_user_payload
                response_payload['premium_activated'] = purchase_row is not None or (
                    bool(public_user_payload.get('has_premium_access'))
                    and normalized_subscription_id
                    and normalized_subscription_id == str(user_row['stripe_subscription_id'] or '').strip()
                )
            else:
                response_payload['premium_activated'] = purchase_row is not None
        finally:
            connection.close()

    return response_payload


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
        stripe_webhook_post_paths = {STRIPE_WEBHOOK_API_PATH, *LEGACY_STRIPE_WEBHOOK_API_PATHS}
        auth_post_paths = {
            AUTH_REGISTER_API_PATH,
            AUTH_LOGIN_API_PATH,
            AUTH_LOGOUT_API_PATH,
            AUTH_FORGOT_PASSWORD_API_PATH,
            AUTH_RESET_PASSWORD_API_PATH,
            AUTH_PROFILE_IMAGE_API_PATH
        }
        if parsed_path not in {CHAT_API_PATH, *stripe_webhook_post_paths, *checkout_post_paths, *auth_post_paths}:
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

        raw_body = self.rfile.read(content_length) if content_length > 0 else b''

        if parsed_path in stripe_webhook_post_paths:
            print("[webhook] route hit")
            try:
                response_payload = handle_verified_stripe_webhook(
                    raw_body,
                    self.headers.get('Stripe-Signature')
                )
            except ApiError as error:
                self._send_json(error.status, {'error': error.message})
                return
            except RuntimeError as error:
                log_billing_exception('Stripe webhook configuration/runtime error', error)
                self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {'error': get_error_message(error)})
                return
            except Exception as error:
                log_billing_exception('Stripe webhook handling failed', error)
                self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {'error': 'Stripe webhook handling failed.'})
                return

            self._send_json(HTTPStatus.OK, response_payload)
            return

        payload: dict[str, object]
        if content_length <= 0:
            payload = {}
        else:
            try:
                payload = json.loads(raw_body.decode('utf-8'))
            except (UnicodeDecodeError, json.JSONDecodeError):
                self._send_json(
                    HTTPStatus.BAD_REQUEST,
                    {'error': 'Request body must be valid JSON.'}
                )
                return

            if not isinstance(payload, dict):
                self._send_json(
                    HTTPStatus.BAD_REQUEST,
                    {'error': 'Request body must be a JSON object.'}
                )
                return

        if parsed_path in auth_post_paths:
            self._handle_auth_post(parsed_path, payload)
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
            except ApiError as error:
                self._send_json(error.status, {'error': error.message})
                return
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

        if parsed_url.path == AUTH_ME_API_PATH:
            self._handle_auth_me()
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

    def _handle_auth_me(self) -> None:
        try:
            user_payload = get_authenticated_user_payload(self)
        except Exception as error:
            log_auth_exception('Unable to load auth session', error)
            self._send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {'error': 'Unable to load the current session.'}
            )
            return

        self._send_json(
            HTTPStatus.OK,
            {
                'authenticated': user_payload is not None,
                'user': user_payload
            }
        )

    def _handle_auth_post(self, parsed_path: str, payload: dict[str, object]) -> None:
        try:
            if parsed_path == AUTH_REGISTER_API_PATH:
                user_row, session_token, expires_at = register_user_account(
                    str(payload.get('email', '')),
                    str(payload.get('password', '')),
                    str(payload.get('confirm_password', ''))
                )
                self._send_json(
                    HTTPStatus.CREATED,
                    {
                        'message': 'Account created.',
                        'user': build_public_user_payload(user_row),
                        **build_session_transport_payload(self, session_token, expires_at)
                    },
                    extra_headers=[('Set-Cookie', set_session_cookie(self, session_token, expires_at))]
                )
                return

            if parsed_path == AUTH_LOGIN_API_PATH:
                user_row, session_token, expires_at = login_user_account(
                    str(payload.get('email', '')),
                    str(payload.get('password', ''))
                )
                self._send_json(
                    HTTPStatus.OK,
                    {
                        'message': 'Logged in.',
                        'user': build_public_user_payload(user_row),
                        **build_session_transport_payload(self, session_token, expires_at)
                    },
                    extra_headers=[('Set-Cookie', set_session_cookie(self, session_token, expires_at))]
                )
                return

            if parsed_path == AUTH_LOGOUT_API_PATH:
                logout_user_account(get_session_token_from_request(self))
                self._send_json(
                    HTTPStatus.OK,
                    {'message': 'Logged out.'},
                    extra_headers=[('Set-Cookie', clear_session_cookie(self))]
                )
                return

            if parsed_path == AUTH_FORGOT_PASSWORD_API_PATH:
                response_payload = create_password_reset_request(
                    str(payload.get('email', '')),
                    self
                )
                self._send_json(HTTPStatus.OK, response_payload)
                return

            if parsed_path == AUTH_RESET_PASSWORD_API_PATH:
                user_row, session_token, expires_at = reset_password_with_token(
                    str(payload.get('token', '')),
                    str(payload.get('password', ''))
                )
                self._send_json(
                    HTTPStatus.OK,
                    {
                        'message': 'Password reset complete.',
                        'user': build_public_user_payload(user_row),
                        **build_session_transport_payload(self, session_token, expires_at)
                    },
                    extra_headers=[('Set-Cookie', set_session_cookie(self, session_token, expires_at))]
                )
                return

            if parsed_path == AUTH_PROFILE_IMAGE_API_PATH:
                log_auth_event('portrait upload request received')
                user_row = update_profile_image(
                    self,
                    str(payload.get('image_data_url', ''))
                )
                public_user_payload = build_public_user_payload(user_row)
                log_auth_event(f"portrait save success user_id={int(user_row['id'])}")
                log_auth_event(
                    'returned portrait value/path '
                    f"{build_profile_image_debug_summary(public_user_payload.get('profile_image_url'), public_user_payload.get('profile_image_version'))}"
                )
                self._send_json(
                    HTTPStatus.OK,
                    {
                        'message': 'Profile picture updated.',
                        'user': public_user_payload
                    }
                )
                return

            self._send_json(HTTPStatus.NOT_FOUND, {'error': 'Route not found.'})
        except ApiError as error:
            self._send_json(error.status, {'error': error.message})
        except RuntimeError as error:
            log_auth_exception(f'Auth runtime error for {parsed_path}', error)
            self._send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {'error': get_error_message(error)}
            )
        except Exception as error:
            log_auth_exception(f'Unexpected auth error for {parsed_path}', error)
            self._send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {'error': 'Unable to complete the request right now.'}
            )

    def end_headers(self) -> None:
        self._send_dev_no_store_headers()
        if urlparse(self.path).path in API_CORS_PATHS:
            self._send_api_cors_headers()
        super().end_headers()

    def _send_api_cors_headers(self) -> None:
        request_origin = self.headers.get('Origin')
        if isinstance(request_origin, str) and request_origin.strip():
            self.send_header('Access-Control-Allow-Origin', request_origin.strip())
            self.send_header('Vary', 'Origin')
        else:
            self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', f'Content-Type, {SESSION_HEADER_NAME}')
        self.send_header('Access-Control-Allow-Credentials', 'true')

    def _send_dev_no_store_headers(self) -> None:
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')

    def _send_json(
        self,
        status: HTTPStatus,
        payload: dict[str, object],
        *,
        extra_headers: list[tuple[str, str]] | None = None
    ) -> None:
        parsed_path = urlparse(self.path).path
        billing_paths = {
            STRIPE_WEBHOOK_API_PATH,
            *LEGACY_STRIPE_WEBHOOK_API_PATHS,
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
        if extra_headers:
            for header_name, header_value in extra_headers:
                self.send_header(header_name, header_value)
        self.end_headers()
        self.wfile.write(response)

    def _send_text_template(self, file_path: Path, content_type: str) -> None:
        rendered_text = (
            file_path.read_text(encoding='utf-8')
            .replace(STATIC_ASSET_VERSION_PLACEHOLDER, get_static_asset_version())
            .replace(APP_API_ORIGIN_PLACEHOLDER, get_request_origin(self))
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
    initialize_database()
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
    print(f'{STRIPE_WEBHOOK_SECRET_ENV_VAR} detected at startup: {"yes" if bool(os.environ.get(STRIPE_WEBHOOK_SECRET_ENV_VAR)) else "no"}')
    print(f'{DATABASE_PATH_ENV_VAR} resolved to: {get_database_path()}')
    print(f'{PREMIUM_WHITELIST_ENV_VAR} configured: {"yes" if bool(os.environ.get(PREMIUM_WHITELIST_ENV_VAR)) else "no"}')
    print(f'SMTP configured: {"yes" if is_smtp_configured() else "no"}')
    print(f'SMTP server detected: {"yes" if bool(get_smtp_server()) else "no"}')
    print(f'SMTP from email detected: {"yes" if bool(get_smtp_from_email()) else "no"}')
    print(f'SMTP port detected: {"yes" if bool(get_smtp_port()) else "no"}')
    print(f'SMTP username detected: {"yes" if bool((os.environ.get(SMTP_USERNAME_ENV_VAR) or "").strip()) else "no"}')
    print(f'SMTP password detected: {"yes" if bool((os.environ.get(SMTP_PASSWORD_ENV_VAR) or "").strip()) else "no"}')
    print('Local development note: set OPENAI_API_KEY before starting the server.')

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down server.')
    finally:
        httpd.server_close()


if __name__ == '__main__':
    main()
