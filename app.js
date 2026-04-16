const imageUpload = document.getElementById('imageUpload');
const pixelCanvas = document.getElementById('pixelCanvas');
const ctx = pixelCanvas.getContext('2d');
const welcomeState = document.getElementById('welcomeState');
const appWorkspace = document.getElementById('appWorkspace');
const sizeSelector = document.getElementById('sizeSelector');
const openXlPreviewBtn = document.getElementById('openXlPreviewBtn');
const openMegaPreviewBtn = document.getElementById('openMegaPreviewBtn');
const sectionSizeSelector = document.getElementById('sectionSizeSelector');
const comparisonPreviewViewer = document.getElementById('comparisonPreviewViewer');
const syncComparisonCheckbox = document.getElementById('syncComparisonCheckbox');
const blueprintGridDiv = document.getElementById('blueprintGrid');
const focusedSectionGridDiv = document.getElementById('focusedSectionGrid');
const blueprintViewer = document.getElementById('blueprintViewer');
const blueprintSectionHoverOverlay = document.getElementById('blueprintSectionHoverOverlay');
const focusedSectionViewer = document.getElementById('focusedSectionViewer');
const focusedSectionHoverOverlay = document.getElementById('focusedSectionHoverOverlay');
const zoomLevelSpan = document.getElementById('zoomLevel');
const tooltip = document.getElementById('tooltip');
const blueprintLegendInfo = document.getElementById('blueprintLegendInfo');
const focusedSectionLabel = document.getElementById('focusedSectionLabel');
const focusedSectionSize = document.getElementById('focusedSectionSize');
const focusedSectionStatus = document.getElementById('focusedSectionStatus');
const currentSectionBadge = document.getElementById('currentSectionBadge');
const prevSectionBtn = document.getElementById('prevSectionBtn');
const nextSectionBtn = document.getElementById('nextSectionBtn');
const fullBlueprintCard = document.getElementById('fullBlueprintCard');
const focusedSectionCard = document.getElementById('focusedSectionCard');
const buildModeStatusBadge = document.getElementById('buildModeStatusBadge');
const buildModeSectionInfo = document.getElementById('buildModeSectionInfo');
const buildModeRowInfo = document.getElementById('buildModeRowInfo');
const prevRowBtn = document.getElementById('prevRowBtn');
const nextRowBtn = document.getElementById('nextRowBtn');
const completeSectionBtn = document.getElementById('completeSectionBtn');
const buildRowSequence = document.getElementById('buildRowSequence');
const projectInfoBar = document.getElementById('projectInfoBar');
const projectInfoName = document.getElementById('projectInfoName');
const projectInfoSize = document.getElementById('projectInfoSize');
const projectInfoBlocks = document.getElementById('projectInfoBlocks');
const projectInfoSection = document.getElementById('projectInfoSection');
const projectInfoSectionProgress = document.getElementById('projectInfoSectionProgress');
const projectInfoOverallProgress = document.getElementById('projectInfoOverallProgress');
const chatWidget = document.getElementById('chatWidget');
const chatLauncher = document.getElementById('chatLauncher');
const chatPanel = document.getElementById('chatPanel');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatMessages = document.getElementById('chatMessages');
const chatEmptyState = document.getElementById('chatEmptyState');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const upgradeModal = document.getElementById('upgradeModal');
const upgradeModalDescription = document.getElementById('upgradeModalDescription');
const upgradeModalCloseBtn = document.getElementById('upgradeModalCloseBtn');
const lockedSizePreviewPanel = document.getElementById('lockedSizePreviewPanel');
const lockedSizePreviewTitle = document.getElementById('lockedSizePreviewTitle');
const lockedSizePreviewMeta = document.getElementById('lockedSizePreviewMeta');
const lockedSizePreviewFrame = document.getElementById('lockedSizePreviewFrame');
const lockedSizePreviewImage = document.getElementById('lockedSizePreviewImage');
const lockedSizePreviewPlaceholder = document.getElementById('lockedSizePreviewPlaceholder');
const lockedSizePreviewUpsell = document.getElementById('lockedSizePreviewUpsell');
const unlockCurrentBlueprintBtn = document.getElementById('unlockCurrentBlueprintBtn');
const unlockLifetimeBtn = document.getElementById('unlockLifetimeBtn');
const upgradeModalStatus = document.getElementById('upgradeModalStatus');
const accountSummaryText = document.getElementById('accountSummaryText');
const accountSignedOutActions = document.getElementById('accountSignedOutActions');
const accountSignedInActions = document.getElementById('accountSignedInActions');
const accountProfileCorner = document.getElementById('accountProfileCorner');
const accountProfileActions = document.getElementById('accountProfileActions');
const accountStatusCard = document.getElementById('accountStatusCard');
const accountStatusLabel = document.getElementById('accountStatusLabel');
const accountStatusEmail = document.getElementById('accountStatusEmail');
const accountStatusPremiumBadge = document.getElementById('accountStatusPremiumBadge');
const accountStatusPremiumIcon = document.getElementById('accountStatusPremiumIcon');
const accountStatusPremiumText = document.getElementById('accountStatusPremiumText');
const openCreateAccountBtn = document.getElementById('openCreateAccountBtn');
const openLoginBtn = document.getElementById('openLoginBtn');
const openAccountBtn = document.getElementById('openAccountBtn');
const changeProfileImageBtn = document.getElementById('changeProfileImageBtn');
const openPremiumBtn = document.getElementById('openPremiumBtn');
const accountProfileBubbleFallback = document.getElementById('accountProfileBubbleFallback');
const accountProfileBubbleImage = document.getElementById('accountProfileBubbleImage');
const accountProfileBubbleStatus = document.getElementById('accountProfileBubbleStatus');
const logoutBtn = document.getElementById('logoutBtn');
const authModal = document.getElementById('authModal');
const authModalCloseBtn = document.getElementById('authModalCloseBtn');
const authModalTitle = document.getElementById('authModalTitle');
const authModalCopy = document.getElementById('authModalCopy');
const authViewTriggerButtons = Array.from(document.querySelectorAll('[data-auth-view-trigger]'));
const authTabButtons = Array.from(document.querySelectorAll('.auth-modal-tab[data-auth-view-trigger]'));
const authPanels = Array.from(document.querySelectorAll('.auth-panel[data-auth-view]'));
const authFooterForgotBtn = document.getElementById('authFooterForgotBtn');
const authFooterBackBtn = document.getElementById('authFooterBackBtn');
const authAccountCard = document.getElementById('authAccountCard');
const authAccountSummary = document.getElementById('authAccountSummary');
const authAccountEmailValue = document.getElementById('authAccountEmailValue');
const authAccountStatusValue = document.getElementById('authAccountStatusValue');
const authProfilePickerBtn = document.getElementById('authProfilePickerBtn');
const profileImageInput = document.getElementById('profileImageInput');
const openResetPasswordFromAccountBtn = document.getElementById('openResetPasswordFromAccountBtn');
const registerForm = document.getElementById('registerForm');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerConfirmPassword = document.getElementById('registerConfirmPassword');
const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const forgotPasswordEmail = document.getElementById('forgotPasswordEmail');
const forgotResetPreview = document.getElementById('forgotResetPreview');
const forgotResetPreviewLink = document.getElementById('forgotResetPreviewLink');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const resetPasswordToken = document.getElementById('resetPasswordToken');
const resetPasswordInput = document.getElementById('resetPasswordInput');
const authFieldErrorElements = Array.from(document.querySelectorAll('[data-auth-field-error]'));
const authFormMessageElements = Array.from(document.querySelectorAll('[data-auth-form-message]'));

// Debug toggle: temporarily simplify lower-workspace interaction/paint behavior to isolate
// which hovered lower-area effects are causing scroll to feel choppy.
const DEBUG_SIMPLIFY_LOWER_WORKSPACE = true;
const FULL_BLUEPRINT_MIN_ZOOM = 0.5;
const FULL_BLUEPRINT_MAX_ZOOM = 10;
const CHAT_ERROR_MESSAGE = 'Chat is temporarily unavailable. Please try again in a moment.';
const CHAT_FILE_MODE_ERROR_MESSAGE = 'Chat needs the local server. Start server.py and open http://127.0.0.1:8000/ instead of opening index.html directly.';
const CHAT_NETWORK_ERROR_MESSAGE = 'The chat server is not reachable. Make sure the local server is running and try again.';
const CHECKOUT_NETWORK_ERROR_MESSAGE = 'Unable to start checkout. Check Stripe configuration or backend server.';
const CHECKOUT_VERIFICATION_ERROR_MESSAGE = 'Unable to verify checkout. Check Stripe configuration or backend server.';
const DEFAULT_LOCAL_APP_ORIGIN = 'http://127.0.0.1:8000';
const DEFAULT_LOCAL_CHAT_API_URL = `${DEFAULT_LOCAL_APP_ORIGIN}/api/chat`;
const DEFAULT_LOCAL_CHECKOUT_API_URL = `${DEFAULT_LOCAL_APP_ORIGIN}/api/create-checkout-session`;
const DEFAULT_LOCAL_CHECKOUT_STATUS_API_URL = `${DEFAULT_LOCAL_APP_ORIGIN}/api/checkout-session-status`;
const DEFAULT_LOCAL_AUTH_API_BASE_URL = `${DEFAULT_LOCAL_APP_ORIGIN}/api/auth`;
const DEFAULT_PROJECT_NAME = 'Untitled Project';
const BLUEPRINT_SIZE_LABELS = ['Small', 'Medium', 'Large', 'X-Large', 'Mega'];
const SQUARE_BLUEPRINT_LONG_SIDE_OPTIONS = [16, 32, 64, 128, 256];
const EDGE_ENHANCEMENT_STRENGTH = 0.18;
const EDGE_ENHANCEMENT_THRESHOLD = 12;
const SUBSCRIPTION_ACTIVE_STORAGE_KEY = 'photosynthesizer_subscription_active';
const LIFETIME_UNLOCK_STORAGE_KEY = 'photosynthesizer_lifetime_unlock';
const FILE_MODE_SESSION_TOKEN_STORAGE_KEY = 'photosynthesizer_file_mode_session_token';
const API_SESSION_HEADER_NAME = 'X-Blueprint-Session';
const PREMIUM_SIZE_LONG_SIDE_THRESHOLD = 128;
const LOCKED_PREVIEW_TARGET_RENDER_SIDE = 768;
const AUTH_EMAIL_ERROR_MESSAGE = 'Invalid email.';
const AUTH_DUPLICATE_EMAIL_MESSAGE = 'An account with this email already exists.';
const AUTH_PASSWORD_REQUIRED_MESSAGE = 'Enter your password.';
const AUTH_PASSWORD_TOO_SHORT_MESSAGE = 'Password too short.';
const AUTH_PASSWORD_NUMBER_MESSAGE = 'Password must include a number.';
const AUTH_PASSWORD_MISMATCH_MESSAGE = 'Passwords do not match.';
const AUTH_RESET_INVALID_MESSAGE = 'Reset link is invalid or expired.';
const PROFILE_IMAGE_REQUIRED_MESSAGE = 'Choose an image first.';
const PROFILE_IMAGE_FILE_MESSAGE = 'Choose a valid image file.';
const PROFILE_IMAGE_SIZE_MESSAGE = 'Choose an image smaller than 6 MB.';
const PROFILE_IMAGE_UPLOAD_ERROR_MESSAGE = 'Unable to update the profile picture right now.';
const APP_API_ORIGIN_PLACEHOLDER = '__APP_API_ORIGIN__';
const PROFILE_AVATAR_PIXEL_SIZE = 20;
const PROFILE_IMAGE_INPUT_MAX_BYTES = 6 * 1024 * 1024;

ctx.imageSmoothingEnabled = false;

let currentBlueprint = null;
let currentPixelGrid = null;
let currentGridWidth = 32;
let currentGridHeight = 32;
let currentGridSize = 32;
let fullBlueprintZoomLevel = 1;
let focusedSectionZoomLevel = 1;
let activeZoomViewport = 'full';
let selectedBlock = null;
let focusedLegendInversionBlock = null;
let sectionSize = parseInt(sectionSizeSelector.value, 10);
let currentImageOriginalWidth = 1;
let currentImageOriginalHeight = 1;
let sectionStatuses = {};
let selectedSection = null;
let currentViewMode = 'full';
let currentImageSource = null;
let latestUploadedImageSource = null;
let buildModeEnabled = false;
let currentBuildRowIndex = 0;
let comparisonModeEnabled = false;
let syncComparisonEnabled = false;
let comparisonSyncLock = false;
let zoomRefreshFrame = null;
let cachedFlatBlueprint = null;
let cachedFlatBlueprintSource = null;
let cachedBlockCounts = null;
let cachedSortedBlockCounts = null;
let cachedBlockCountsSource = null;
let cachedFocusedSectionCells = new Map();
let lastHighlightedCells = [];
let activeTooltipCell = null;
let tooltipFrame = null;
let tooltipPointerX = 0;
let tooltipPointerY = 0;
let hoveredFullBlueprintSection = null;
let hoveredFocusedSectionCell = null;
let currentBlueprintSizeOptions = [];
let lastUnlockedSizeValue = sizeSelector.value;
let pendingPremiumSizeOption = null;
const lockedPreviewTeaserCache = new Map();
let lockedPreviewRenderToken = 0;
const sessionSectionProgress = new Map();
const chatState = {
    isOpen: false,
    isLoading: false,
    messages: []
};
const accountState = {
    isAuthenticated: false,
    user: null,
    activeView: 'login'
};
const fullBlueprintPanState = {
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
};
const fullBlueprintViewportState = {
    offsetX: 0,
    offsetY: 0,
    scaledWidth: 0,
    scaledHeight: 0,
    viewportWidth: 0,
    viewportHeight: 0
};
const focusedSectionPanState = {
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
};
const focusedSectionViewportState = {
    offsetX: 0,
    offsetY: 0,
    scaledWidth: 0,
    scaledHeight: 0,
    viewportWidth: 0,
    viewportHeight: 0
};

const minecraftBlocks = [
    { name: "white_concrete", r: 207, g: 213, b: 214, category: "concrete", survivalFriendly: true },
    { name: "light_gray_concrete", r: 125, g: 125, b: 115, category: "concrete", survivalFriendly: true },
    { name: "gray_concrete", r: 55, g: 58, b: 62, category: "concrete", survivalFriendly: true },
    { name: "black_concrete", r: 8, g: 10, b: 15, category: "concrete", survivalFriendly: true },
    { name: "red_concrete", r: 142, g: 33, b: 33, category: "concrete", survivalFriendly: true },
    { name: "orange_concrete", r: 224, g: 97, b: 1, category: "concrete", survivalFriendly: true },
    { name: "yellow_concrete", r: 241, g: 175, b: 21, category: "concrete", survivalFriendly: true },
    { name: "lime_concrete", r: 94, g: 169, b: 25, category: "concrete", survivalFriendly: true },
    { name: "green_concrete", r: 73, g: 91, b: 36, category: "concrete", survivalFriendly: true },
    { name: "cyan_concrete", r: 21, g: 119, b: 136, category: "concrete", survivalFriendly: true },
    { name: "light_blue_concrete", r: 36, g: 137, b: 199, category: "concrete", survivalFriendly: true },
    { name: "blue_concrete", r: 45, g: 47, b: 143, category: "concrete", survivalFriendly: true },
    { name: "purple_concrete", r: 100, g: 32, b: 156, category: "concrete", survivalFriendly: true },
    { name: "magenta_concrete", r: 169, g: 48, b: 159, category: "concrete", survivalFriendly: true },
    { name: "pink_concrete", r: 214, g: 101, b: 143, category: "concrete", survivalFriendly: true },
    { name: "brown_concrete", r: 96, g: 60, b: 32, category: "concrete", survivalFriendly: true },
    { name: "white_wool", r: 234, g: 237, b: 237, category: "wool", survivalFriendly: true },
    { name: "light_gray_wool", r: 142, g: 143, b: 135, category: "wool", survivalFriendly: true },
    { name: "gray_wool", r: 63, g: 69, b: 72, category: "wool", survivalFriendly: true },
    { name: "black_wool", r: 22, g: 22, b: 27, category: "wool", survivalFriendly: true },
    { name: "red_wool", r: 161, g: 40, b: 35, category: "wool", survivalFriendly: true },
    { name: "orange_wool", r: 241, g: 119, b: 22, category: "wool", survivalFriendly: true },
    { name: "yellow_wool", r: 249, g: 198, b: 41, category: "wool", survivalFriendly: true },
    { name: "lime_wool", r: 113, g: 186, b: 26, category: "wool", survivalFriendly: true },
    { name: "green_wool", r: 85, g: 110, b: 28, category: "wool", survivalFriendly: true },
    { name: "cyan_wool", r: 21, g: 138, b: 145, category: "wool", survivalFriendly: true },
    { name: "light_blue_wool", r: 60, g: 176, b: 218, category: "wool", survivalFriendly: true },
    { name: "blue_wool", r: 53, g: 58, b: 158, category: "wool", survivalFriendly: true },
    { name: "purple_wool", r: 123, g: 43, b: 173, category: "wool", survivalFriendly: true },
    { name: "magenta_wool", r: 190, g: 70, b: 181, category: "wool", survivalFriendly: true },
    { name: "pink_wool", r: 238, g: 144, b: 173, category: "wool", survivalFriendly: true },
    { name: "brown_wool", r: 115, g: 72, b: 41, category: "wool", survivalFriendly: true },
    { name: "white_terracotta", r: 210, g: 178, b: 161, category: "terracotta", survivalFriendly: true },
    { name: "light_gray_terracotta", r: 135, g: 107, b: 98, category: "terracotta", survivalFriendly: true },
    { name: "gray_terracotta", r: 58, g: 42, b: 36, category: "terracotta", survivalFriendly: true },
    { name: "black_terracotta", r: 37, g: 23, b: 16, category: "terracotta", survivalFriendly: true },
    { name: "red_terracotta", r: 143, g: 61, b: 47, category: "terracotta", survivalFriendly: true },
    { name: "orange_terracotta", r: 162, g: 84, b: 38, category: "terracotta", survivalFriendly: true },
    { name: "yellow_terracotta", r: 186, g: 133, b: 35, category: "terracotta", survivalFriendly: true },
    { name: "lime_terracotta", r: 104, g: 118, b: 53, category: "terracotta", survivalFriendly: true },
    { name: "green_terracotta", r: 76, g: 83, b: 42, category: "terracotta", survivalFriendly: true },
    { name: "cyan_terracotta", r: 87, g: 91, b: 91, category: "terracotta", survivalFriendly: true },
    { name: "light_blue_terracotta", r: 114, g: 109, b: 138, category: "terracotta", survivalFriendly: true },
    { name: "blue_terracotta", r: 74, g: 60, b: 91, category: "terracotta", survivalFriendly: true },
    { name: "purple_terracotta", r: 118, g: 70, b: 86, category: "terracotta", survivalFriendly: true },
    { name: "magenta_terracotta", r: 150, g: 88, b: 109, category: "terracotta", survivalFriendly: true },
    { name: "pink_terracotta", r: 162, g: 78, b: 79, category: "terracotta", survivalFriendly: true },
    { name: "brown_terracotta", r: 77, g: 51, b: 36, category: "terracotta", survivalFriendly: true }
].map(enrichBlockColorProfile);
const minecraftBlockLookup = Object.fromEntries(
    minecraftBlocks.map((block) => [block.name, block])
);

function scrollChatToLatest() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatApiUrl() {
    return buildApiUrl('/api/chat');
}

function getAuthApiUrl(path) {
    const normalizedPath = typeof path === 'string' && path.startsWith('/')
        ? path
        : `/api/auth/${String(path || '').replace(/^\/+/, '')}`;

    return buildApiUrl(normalizedPath);
}

function isLocalhostWorkspaceSession() {
    return window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
}

function getCheckoutApiUrl() {
    return buildApiUrl('/api/create-checkout-session');
}

function getCheckoutStatusApiUrl(sessionId) {
    const encodedSessionId = encodeURIComponent(sessionId);
    return buildApiUrl(`/api/checkout-session-status?session_id=${encodedSessionId}`);
}

function getConfiguredApiOrigin() {
    const apiOriginMeta = document.querySelector('meta[name="app-api-origin"]');
    const rawContent = apiOriginMeta?.getAttribute('content') || '';
    const normalizedContent = rawContent.trim();
    if (!normalizedContent || normalizedContent === APP_API_ORIGIN_PLACEHOLDER) {
        return '';
    }

    return normalizedContent.replace(/\/+$/, '');
}

function buildApiUrl(path) {
    const normalizedPath = String(path || '').startsWith('/')
        ? String(path || '')
        : `/${String(path || '').replace(/^\/+/, '')}`;

    if (window.location.protocol === 'file:') {
        return `${DEFAULT_LOCAL_APP_ORIGIN}${normalizedPath}`;
    }

    const configuredApiOrigin = getConfiguredApiOrigin();
    if (configuredApiOrigin) {
        return `${configuredApiOrigin}${normalizedPath}`;
    }

    return normalizedPath;
}

function hasActivePremiumSubscription() {
    return localStorage.getItem(SUBSCRIPTION_ACTIVE_STORAGE_KEY) === 'true';
}

function hasLifetimePremiumUnlock() {
    return localStorage.getItem(LIFETIME_UNLOCK_STORAGE_KEY) === 'true';
}

function hasPremiumSizeAccessForCurrentBlueprint() {
    return !!accountState.user?.has_premium_access || hasActivePremiumSubscription() || hasLifetimePremiumUnlock();
}

function isPremiumBlueprintSizeOption(option) {
    return !!option && option.longSide >= PREMIUM_SIZE_LONG_SIDE_THRESHOLD;
}

function isBlueprintSizeOptionLocked(option) {
    return isPremiumBlueprintSizeOption(option) && !hasPremiumSizeAccessForCurrentBlueprint();
}

function findSizeOptionByValue(value) {
    return currentBlueprintSizeOptions.find((option) => option.value === value) || null;
}

function getPreferredUnlockedSizeValue() {
    const preferredOption = findSizeOptionByValue(lastUnlockedSizeValue);
    if (preferredOption && !isBlueprintSizeOptionLocked(preferredOption)) {
        return preferredOption.value;
    }

    const fallbackOption = currentBlueprintSizeOptions.find((option) => !isBlueprintSizeOptionLocked(option));
    return fallbackOption ? fallbackOption.value : sizeSelector.value;
}

function getOptionDisplayLabel(option) {
    if (!option) {
        return '';
    }

    return isBlueprintSizeOptionLocked(option)
        ? `${option.label} (Premium)`
        : option.label;
}

function getBlueprintOptionDimensionLabel(option) {
    if (!option) {
        return '--';
    }

    return `${option.width} x ${option.height}`;
}

function getPremiumPreviewDisplayLabel(option) {
    if (!option) {
        return 'Premium';
    }

    if (option.longSide >= 256) {
        return 'Mega';
    }

    if (option.longSide >= 128) {
        return 'XL';
    }

    return option.label || 'Premium';
}

function getPremiumPreviewOptionByLongSide(longSide) {
    const options = currentBlueprintSizeOptions.length
        ? currentBlueprintSizeOptions
        : getBlueprintSizeOptions(currentImageOriginalWidth, currentImageOriginalHeight);

    return options.find((option) => option.longSide === longSide) || {
        ...calculateBlueprintDimensionsForLongSide(longSide, currentImageOriginalWidth, currentImageOriginalHeight),
        label: longSide >= 256 ? 'Mega' : 'X-Large',
        longSide,
        value: `${longSide}x${longSide}`
    };
}

function clearLockedPreviewTeaserCache() {
    lockedPreviewTeaserCache.clear();
    lockedPreviewRenderToken += 1;
}

function getLockedPreviewImageSource() {
    if (typeof latestUploadedImageSource === 'string' && latestUploadedImageSource.trim()) {
        return latestUploadedImageSource;
    }

    if (typeof currentImageSource === 'string' && currentImageSource.trim()) {
        return currentImageSource;
    }

    return '';
}

function setLockedSizePreviewPlaceholder(message) {
    if (lockedSizePreviewImage instanceof HTMLImageElement) {
        lockedSizePreviewImage.hidden = true;
        lockedSizePreviewImage.removeAttribute('src');
    }

    if (lockedSizePreviewPlaceholder instanceof HTMLElement) {
        lockedSizePreviewPlaceholder.hidden = false;
        lockedSizePreviewPlaceholder.textContent = message;
    }
}

function loadImageElementFromSource(imageSource) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Unable to load the selected image.'));
        image.src = imageSource;
    });
}

function buildResizedPixelGridFromImageElement(image, gridWidth, gridHeight) {
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = gridWidth;
    resizedCanvas.height = gridHeight;

    const resizedCtx = resizedCanvas.getContext('2d');
    if (!resizedCtx) {
        throw new Error('Unable to prepare the blueprint preview canvas.');
    }

    const sourceWidth = image.naturalWidth || image.width || gridWidth;
    const sourceHeight = image.naturalHeight || image.height || gridHeight;
    const isDownsampling = sourceWidth > gridWidth || sourceHeight > gridHeight;

    resizedCtx.imageSmoothingEnabled = isDownsampling;
    resizedCtx.imageSmoothingQuality = isDownsampling ? 'high' : 'medium';
    resizedCtx.drawImage(image, 0, 0, gridWidth, gridHeight);

    let imageData = resizedCtx.getImageData(0, 0, gridWidth, gridHeight);
    imageData = enhanceResizedImageData(imageData);
    resizedCtx.putImageData(imageData, 0, 0);

    const data = imageData.data;
    const grid = [];

    for (let y = 0; y < gridHeight; y++) {
        const row = [];
        for (let x = 0; x < gridWidth; x++) {
            const index = (y * gridWidth + x) * 4;
            row.push({
                x,
                y,
                r: data[index],
                g: data[index + 1],
                b: data[index + 2],
                a: data[index + 3]
            });
        }
        grid.push(row);
    }

    return { grid, resizedCanvas };
}

function createLockedBlueprintPreviewDataUrl(blueprint, option) {
    const maxSide = Math.max(option.width, option.height);
    const cellSize = Math.max(2, Math.floor(LOCKED_PREVIEW_TARGET_RENDER_SIDE / Math.max(1, maxSide)));
    const previewCanvas = document.createElement('canvas');
    previewCanvas.width = option.width * cellSize;
    previewCanvas.height = option.height * cellSize;

    const previewCtx = previewCanvas.getContext('2d');
    if (!previewCtx) {
        throw new Error('Unable to render the premium preview.');
    }

    previewCtx.imageSmoothingEnabled = false;
    previewCtx.fillStyle = '#f3ede3';
    previewCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

    for (let y = 0; y < blueprint.length; y++) {
        for (let x = 0; x < blueprint[y].length; x++) {
            const cell = blueprint[y][x];
            const block = minecraftBlockLookup[cell.block];
            previewCtx.fillStyle = block ? `rgb(${block.r}, ${block.g}, ${block.b})` : '#1A1A1A';
            previewCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    return previewCanvas.toDataURL('image/png');
}

async function renderLockedBlueprintStylePreview(option, renderToken) {
    const previewSource = getLockedPreviewImageSource();
    if (!previewSource) {
        return;
    }

    const cachedTeaser = lockedPreviewTeaserCache.get(option.value);
    if (cachedTeaser) {
        if (
            renderToken !== lockedPreviewRenderToken
            || pendingPremiumSizeOption?.value !== option.value
            || !(lockedSizePreviewImage instanceof HTMLImageElement)
        ) {
            return;
        }

        lockedSizePreviewImage.src = cachedTeaser;
        lockedSizePreviewImage.hidden = false;
        if (lockedSizePreviewPlaceholder instanceof HTMLElement) {
            lockedSizePreviewPlaceholder.hidden = true;
        }
        return;
    }

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const image = await loadImageElementFromSource(previewSource);
    const { grid } = buildResizedPixelGridFromImageElement(image, option.width, option.height);
    const blueprint = buildBlueprintFromGrid(grid);
    const teaserDataUrl = createLockedBlueprintPreviewDataUrl(blueprint, option);
    lockedPreviewTeaserCache.set(option.value, teaserDataUrl);

    if (
        renderToken !== lockedPreviewRenderToken
        || pendingPremiumSizeOption?.value !== option.value
        || !(lockedSizePreviewImage instanceof HTMLImageElement)
    ) {
        return;
    }

    lockedSizePreviewImage.src = teaserDataUrl;
    lockedSizePreviewImage.hidden = false;
    if (lockedSizePreviewPlaceholder instanceof HTMLElement) {
        lockedSizePreviewPlaceholder.hidden = true;
    }
}

function updateLockedSizePreview(option = null) {
    const isPreviewableOption = !!option && isPremiumBlueprintSizeOption(option);
    if (!lockedSizePreviewPanel) {
        return;
    }

    lockedSizePreviewPanel.hidden = !isPreviewableOption;
    if (!isPreviewableOption) {
        lockedPreviewRenderToken += 1;
        setLockedSizePreviewPlaceholder('Upload an image to see the premium blueprint preview.');
        return;
    }

    const previewLabel = getPremiumPreviewDisplayLabel(option);
    if (lockedSizePreviewTitle) {
        lockedSizePreviewTitle.textContent = `${previewLabel} Preview`;
    }
    if (lockedSizePreviewMeta) {
        lockedSizePreviewMeta.textContent = getBlueprintOptionDimensionLabel(option);
    }
    if (lockedSizePreviewUpsell) {
        lockedSizePreviewUpsell.textContent = (
            `${previewLabel} opens a ${getBlueprintOptionDimensionLabel(option)} premium build. `
            + 'Unlock premium to open the interactive full blueprint, focused sections, materials, and section navigation.'
        );
    }
    if (lockedSizePreviewFrame instanceof HTMLElement) {
        lockedSizePreviewFrame.style.aspectRatio = `${option.width} / ${option.height}`;
    }

    const renderToken = ++lockedPreviewRenderToken;
    const previewSource = getLockedPreviewImageSource();
    if (lockedSizePreviewImage instanceof HTMLImageElement) {
        lockedSizePreviewImage.alt = `${previewLabel} premium blueprint preview`;
    }

    if (!previewSource) {
        setLockedSizePreviewPlaceholder(`${previewLabel} preview. Upload an image to see the finished full blueprint result.`);
        return;
    }

    const cachedTeaser = lockedPreviewTeaserCache.get(option.value);
    if (cachedTeaser && lockedSizePreviewImage instanceof HTMLImageElement) {
        lockedSizePreviewImage.src = cachedTeaser;
        lockedSizePreviewImage.hidden = false;
        if (lockedSizePreviewPlaceholder instanceof HTMLElement) {
            lockedSizePreviewPlaceholder.hidden = true;
        }
        return;
    }

    setLockedSizePreviewPlaceholder(`Generating ${previewLabel} full blueprint preview...`);
    renderLockedBlueprintStylePreview(option, renderToken).catch((error) => {
        if (renderToken !== lockedPreviewRenderToken) {
            return;
        }

        console.error('[premium] Locked size preview render failed.', {
            size: option.value,
            error
        });
        setLockedSizePreviewPlaceholder(`Unable to render the ${previewLabel} preview right now.`);
    });
}

function getFallbackUnlockedBlueprintOption() {
    const fallbackValue = getPreferredUnlockedSizeValue();
    return findSizeOptionByValue(fallbackValue)
        || currentBlueprintSizeOptions.find((option) => !isBlueprintSizeOptionLocked(option))
        || currentBlueprintSizeOptions[0]
        || null;
}

function showLockedSizePreview(option) {
    if (!option) {
        openUpgradeModal();
        return;
    }

    const fallbackOption = getFallbackUnlockedBlueprintOption();
    if (fallbackOption) {
        sizeSelector.value = fallbackOption.value;
        setCurrentGridDimensions(fallbackOption.width, fallbackOption.height);
    }

    openUpgradeModal(option);
}

function setUpgradeModalStatus(message = '', isError = false) {
    if (!upgradeModalStatus) {
        return;
    }

    if (!message) {
        upgradeModalStatus.hidden = true;
        upgradeModalStatus.textContent = '';
        upgradeModalStatus.dataset.state = '';
        return;
    }

    upgradeModalStatus.hidden = false;
    upgradeModalStatus.textContent = message;
    upgradeModalStatus.dataset.state = isError ? 'error' : 'info';
}

function setUpgradeModalOpen(isOpen) {
    if (!upgradeModal) {
        return;
    }

    upgradeModal.hidden = !isOpen;
    upgradeModal.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('upgrade-modal-open', isOpen);
    if (!isOpen) {
        setUpgradeModalStatus('');
    }
}

function openUpgradeModal(option) {
    pendingPremiumSizeOption = option || null;
    setUpgradeModalStatus('');
    updateLockedSizePreview(option || null);
    if (upgradeModalDescription) {
        if (option && isPremiumBlueprintSizeOption(option)) {
            upgradeModalDescription.textContent = (
                `${getPremiumPreviewDisplayLabel(option)} is locked behind premium access. `
                + 'This preview shows the finished full blueprint image only. Unlock premium for the interactive build tools.'
            );
        } else {
            upgradeModalDescription.textContent = 'Unlock XL and Mega sizes with a monthly subscription or a lifetime unlock.';
        }
    }
    setUpgradeModalOpen(true);
}

function closeUpgradeModal() {
    pendingPremiumSizeOption = null;
    updateLockedSizePreview(null);
    setUpgradeModalOpen(false);
}

function storeVerifiedUnlock(purchaseType) {
    if (purchaseType === 'monthly_subscription') {
        localStorage.setItem(SUBSCRIPTION_ACTIVE_STORAGE_KEY, 'true');
        return;
    }

    if (purchaseType === 'lifetime_unlock') {
        localStorage.setItem(LIFETIME_UNLOCK_STORAGE_KEY, 'true');
    }
}

async function parseJsonResponse(response) {
    const rawText = await response.text();
    if (!rawText) {
        return {
            payload: null,
            rawText: '',
            contentType: response.headers.get('content-type') || ''
        };
    }

    try {
        return {
            payload: JSON.parse(rawText),
            rawText,
            contentType: response.headers.get('content-type') || ''
        };
    } catch (error) {
        console.error('[billing] Failed to parse checkout response JSON.', error, {
            status: response.status,
            contentType: response.headers.get('content-type') || '',
            rawText
        });
        return {
            payload: null,
            rawText,
            contentType: response.headers.get('content-type') || ''
        };
    }
}

function delay(ms) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });
}

function validateEmailInputValue(email) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(normalizedEmail)) {
        throw new Error(AUTH_EMAIL_ERROR_MESSAGE);
    }

    return normalizedEmail;
}

function validatePasswordInputValue(password) {
    const normalizedPassword = String(password || '').trim();
    if (normalizedPassword.length < 5) {
        throw new Error(AUTH_PASSWORD_TOO_SHORT_MESSAGE);
    }
    if (!/\d/.test(normalizedPassword)) {
        throw new Error(AUTH_PASSWORD_NUMBER_MESSAGE);
    }

    return normalizedPassword;
}

function validateMatchingPasswords(password, confirmPassword) {
    const normalizedPassword = String(password || '').trim();
    const normalizedConfirmPassword = String(confirmPassword || '').trim();
    if (normalizedPassword !== normalizedConfirmPassword) {
        throw new Error(AUTH_PASSWORD_MISMATCH_MESSAGE);
    }

    return normalizedConfirmPassword;
}

function getAuthViewConfig(view) {
    switch (view) {
        case 'account':
            return {
                title: 'Your Account',
                copy: 'Manage your pixel portrait, account status, and password reset options.'
            };
        case 'register':
            return {
                title: 'Create Account',
                copy: 'Save your account with email and password.'
            };
        case 'forgot':
            return {
                title: 'Forgot Password',
                copy: 'Enter your email and the reset link will be sent there when email delivery is configured.'
            };
        case 'reset':
            return {
                title: 'Reset Password',
                copy: 'Choose a new password for your account.'
            };
        case 'login':
        default:
            return {
                title: 'Login',
                copy: 'Sign in to keep premium access tied to your account.'
            };
    }
}

function getAuthFormMessageElement(view) {
    return authFormMessageElements.find((element) => element.dataset.authFormMessage === view) || null;
}

function getAuthFieldErrorElement(fieldId) {
    return authFieldErrorElements.find((element) => element.dataset.authFieldError === fieldId) || null;
}

function clearAuthFieldError(fieldId) {
    const errorElement = getAuthFieldErrorElement(fieldId);
    if (!errorElement) {
        return;
    }

    errorElement.hidden = true;
    errorElement.textContent = '';
}

function setAuthFieldError(fieldId, message) {
    const errorElement = getAuthFieldErrorElement(fieldId);
    if (!errorElement) {
        return;
    }

    errorElement.hidden = !message;
    errorElement.textContent = message || '';
}

function clearAuthFormMessage(view) {
    const messageElement = getAuthFormMessageElement(view);
    if (!messageElement) {
        return;
    }

    messageElement.hidden = true;
    messageElement.textContent = '';
    messageElement.dataset.state = '';
}

function setAuthFormMessage(view, message = '', state = 'error') {
    const messageElement = getAuthFormMessageElement(view);
    if (!messageElement) {
        return;
    }

    if (!message) {
        clearAuthFormMessage(view);
        return;
    }

    messageElement.hidden = false;
    messageElement.textContent = message;
    messageElement.dataset.state = state;
}

function clearForgotResetPreview() {
    if (!forgotResetPreview || !forgotResetPreviewLink) {
        return;
    }

    forgotResetPreview.hidden = true;
    forgotResetPreviewLink.href = '#';
}

function setForgotResetPreview(url = '') {
    if (!forgotResetPreview || !forgotResetPreviewLink) {
        return;
    }

    if (!url) {
        clearForgotResetPreview();
        return;
    }

    forgotResetPreview.hidden = false;
    forgotResetPreviewLink.href = url;
}

function clearAuthViewFeedback(view) {
    switch (view) {
        case 'account':
            clearAuthFormMessage('account');
            break;
        case 'register':
            clearAuthFieldError('registerEmail');
            clearAuthFieldError('registerPassword');
            clearAuthFieldError('registerConfirmPassword');
            clearAuthFormMessage('register');
            break;
        case 'login':
            clearAuthFieldError('loginEmail');
            clearAuthFieldError('loginPassword');
            clearAuthFormMessage('login');
            break;
        case 'forgot':
            clearAuthFieldError('forgotPasswordEmail');
            clearAuthFormMessage('forgot');
            clearForgotResetPreview();
            break;
        case 'reset':
            clearAuthFieldError('resetPasswordInput');
            clearAuthFormMessage('reset');
            break;
        default:
            break;
    }
}

function clearAllAuthFeedback() {
    ['account', 'register', 'login', 'forgot', 'reset'].forEach((view) => clearAuthViewFeedback(view));
}

function updateAuthModalFooter(view) {
    if (authFooterForgotBtn) {
        authFooterForgotBtn.hidden = !['register', 'login'].includes(view);
    }
    if (authFooterBackBtn) {
        authFooterBackBtn.hidden = !['forgot', 'reset'].includes(view);
    }
}

function setAuthModalOpen(isOpen) {
    if (!authModal) {
        return;
    }

    authModal.hidden = !isOpen;
    authModal.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('auth-modal-open', isOpen);
    if (!isOpen) {
        clearAllAuthFeedback();
    }
}

function focusAuthViewField(view) {
    const focusTargetByView = {
        account: authProfilePickerBtn || openResetPasswordFromAccountBtn,
        register: registerEmail,
        login: loginEmail,
        forgot: forgotPasswordEmail,
        reset: resetPasswordInput
    };
    const target = focusTargetByView[view];
    if (target instanceof HTMLElement) {
        target.focus();
    }
}

function getResetTokenFromUrl() {
    return new URLSearchParams(window.location.search).get('reset_token')?.trim() || '';
}

function removeSearchParams(...keysToRemove) {
    const params = new URLSearchParams(window.location.search);
    let changed = false;

    keysToRemove.forEach((key) => {
        if (params.has(key)) {
            params.delete(key);
            changed = true;
        }
    });

    if (!changed) {
        return;
    }

    const queryString = params.toString();
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash || ''}`;
    window.history.replaceState({}, document.title, nextUrl);
}

function getPremiumBadgeDetails() {
    if (accountState.user?.has_premium_access) {
        if (accountState.user.premium_source === 'lifetime') {
            return {
                text: 'Lifetime premium',
                isActive: true,
                summary: 'Premium lifetime access is active on this account.'
            };
        }
        if (accountState.user.premium_source === 'whitelist') {
            return {
                text: 'Premium whitelisted',
                isActive: true,
                summary: 'Premium access is active on this account from the backend whitelist.'
            };
        }
        return {
            text: 'Premium subscription',
            isActive: true,
            summary: 'Premium access is active on this account.'
        };
    }

    if (hasLifetimePremiumUnlock()) {
        return {
            text: 'Browser lifetime unlock',
            isActive: true,
            summary: 'Premium is unlocked in this browser from an earlier purchase.'
        };
    }

    if (hasActivePremiumSubscription()) {
        return {
            text: 'Browser premium active',
            isActive: true,
            summary: 'Premium is active in this browser from an earlier purchase.'
        };
    }

    return {
        text: '',
        isActive: false,
        summary: 'Premium is not active on this account yet.'
    };
}

function isFileModeSessionEnabled() {
    return window.location.protocol === 'file:';
}

function getStoredFileModeSessionToken() {
    if (!isFileModeSessionEnabled()) {
        return '';
    }

    return String(localStorage.getItem(FILE_MODE_SESSION_TOKEN_STORAGE_KEY) || '').trim();
}

function storeFileModeSessionToken(sessionToken = '') {
    if (!isFileModeSessionEnabled()) {
        return;
    }

    const normalizedToken = String(sessionToken || '').trim();
    if (normalizedToken) {
        localStorage.setItem(FILE_MODE_SESSION_TOKEN_STORAGE_KEY, normalizedToken);
        return;
    }

    localStorage.removeItem(FILE_MODE_SESSION_TOKEN_STORAGE_KEY);
}

function syncFileModeSessionFromPayload(payload) {
    if (!isFileModeSessionEnabled() || !payload || typeof payload !== 'object') {
        return;
    }

    if (payload.session_transport !== 'header') {
        return;
    }

    storeFileModeSessionToken(payload.session_token);
}

function buildApiRequestHeaders(headers = {}) {
    const nextHeaders = {
        'Accept': 'application/json',
        ...headers
    };
    const sessionToken = getStoredFileModeSessionToken();
    if (sessionToken && !Object.keys(nextHeaders).some((name) => name.toLowerCase() === API_SESSION_HEADER_NAME.toLowerCase())) {
        nextHeaders[API_SESSION_HEADER_NAME] = sessionToken;
    }
    return nextHeaders;
}

function buildApiRequestOptions(options = {}) {
    return {
        credentials: 'include',
        ...options,
        headers: buildApiRequestHeaders(options.headers || {})
    };
}

function buildProfileImageRenderSource(imageUrl, imageVersion = '') {
    const normalizedImageUrl = typeof imageUrl === 'string' ? imageUrl.trim() : '';
    if (!normalizedImageUrl) {
        return '';
    }

    // Keep account-stored data URLs exact so the browser renders the real image
    // payload instead of a mutated cache-busting variant.
    if (normalizedImageUrl.startsWith('data:')) {
        return normalizedImageUrl;
    }

    const normalizedVersion = typeof imageVersion === 'string' ? imageVersion.trim() : '';
    if (!normalizedVersion) {
        return normalizedImageUrl;
    }

    return normalizedImageUrl.startsWith('data:')
        ? `${normalizedImageUrl}#${encodeURIComponent(normalizedVersion)}`
        : `${normalizedImageUrl}${normalizedImageUrl.includes('?') ? '&' : '?'}v=${encodeURIComponent(normalizedVersion)}`;
}

function ensureAvatarImageHandlers(imageElement, fallbackElement) {
    if (!(imageElement instanceof HTMLImageElement) || imageElement.dataset.avatarHandlersBound === 'true') {
        return;
    }

    imageElement.addEventListener('load', () => {
        imageElement.hidden = false;
        if (fallbackElement instanceof HTMLElement) {
            fallbackElement.hidden = true;
        }
        if (imageElement === accountProfileBubbleImage) {
            setProfileBubbleAvatarState(true);
        }
    });

    imageElement.addEventListener('error', () => {
        imageElement.hidden = true;
        imageElement.removeAttribute('src');
        delete imageElement.dataset.renderSource;
        if (fallbackElement instanceof HTMLElement) {
            fallbackElement.hidden = false;
        }
        if (imageElement === accountProfileBubbleImage) {
            setProfileBubbleAvatarState(false);
        }
    });

    imageElement.dataset.avatarHandlersBound = 'true';
}

function setProfileBubbleAvatarState(hasImage) {
    if (openAccountBtn) {
        openAccountBtn.dataset.avatarState = hasImage ? 'image' : 'empty';
    }

    if (accountProfileBubbleStatus) {
        accountProfileBubbleStatus.hidden = !hasImage;
    }
}

function updateAvatarElements(imageElement, fallbackElement, imageUrl, imageVersion = '') {
    if (imageElement instanceof HTMLImageElement) {
        ensureAvatarImageHandlers(imageElement, fallbackElement);
        const nextSource = buildProfileImageRenderSource(imageUrl, imageVersion);
        if (nextSource) {
            const isSameSource = imageElement.dataset.renderSource === nextSource;
            if (isSameSource && imageElement.complete && imageElement.naturalWidth > 0) {
                imageElement.hidden = false;
                if (fallbackElement instanceof HTMLElement) {
                    fallbackElement.hidden = true;
                }
            } else {
                imageElement.hidden = true;
                if (fallbackElement instanceof HTMLElement) {
                    fallbackElement.hidden = false;
                }
            }
            if (!isSameSource) {
                imageElement.removeAttribute('src');
            }
            imageElement.dataset.renderSource = nextSource;
            if (!isSameSource || imageElement.currentSrc !== nextSource) {
                imageElement.src = nextSource;
            }
        } else {
            imageElement.hidden = true;
            delete imageElement.dataset.renderSource;
            imageElement.removeAttribute('src');
            if (fallbackElement instanceof HTMLElement) {
                fallbackElement.hidden = false;
            }
        }
    }
}

function updateProfileBubbleUi(premiumDetails) {
    if (!openAccountBtn) {
        return;
    }

    if (!accountState.isAuthenticated || !accountState.user) {
        openAccountBtn.removeAttribute('title');
        openAccountBtn.setAttribute('aria-label', 'Open account options');
        openAccountBtn.classList.remove('is-premium');
        updateAvatarElements(accountProfileBubbleImage, accountProfileBubbleFallback, '');
        setProfileBubbleAvatarState(false);
        if (accountProfileBubbleStatus) {
            accountProfileBubbleStatus.dataset.state = 'standard';
        }
        return;
    }

    const imageUrl = typeof accountState.user.profile_image_url === 'string'
        ? accountState.user.profile_image_url
        : '';
    const imageVersion = typeof accountState.user.profile_image_version === 'string'
        ? accountState.user.profile_image_version
        : '';
    const titleText = premiumDetails.isActive
        ? `${accountState.user.email} • ${premiumDetails.text}`
        : `${accountState.user.email} • Premium inactive`;
    const hasProfileImage = !!buildProfileImageRenderSource(imageUrl, imageVersion);

    updateAvatarElements(accountProfileBubbleImage, accountProfileBubbleFallback, imageUrl, imageVersion);
    setProfileBubbleAvatarState(hasProfileImage);
    openAccountBtn.title = titleText;
    openAccountBtn.setAttribute('aria-label', `Open account options for ${accountState.user.email}`);
    openAccountBtn.classList.toggle('is-premium', premiumDetails.isActive);
    if (accountProfileBubbleStatus) {
        accountProfileBubbleStatus.dataset.state = premiumDetails.isActive ? 'premium' : 'standard';
    }
}

function updateAccountStatusCard(premiumDetails) {
    const isSignedIn = !!(accountState.isAuthenticated && accountState.user);
    const isPremiumActive = !!premiumDetails?.isActive;
    const premiumBadgeState = isPremiumActive ? 'active' : 'inactive';
    const premiumText = isPremiumActive ? 'Active' : 'Inactive';
    const premiumIcon = isPremiumActive ? '✓' : 'X';

    if (accountStatusLabel) {
        accountStatusLabel.textContent = isSignedIn ? 'Signed In' : 'Account';
    }
    if (accountStatusCard) {
        accountStatusCard.dataset.state = isSignedIn ? 'member' : 'guest';
    }
    if (accountStatusEmail) {
        accountStatusEmail.textContent = accountState.user?.email || 'Not signed in';
        accountStatusEmail.title = accountState.user?.email || '';
    }
    if (accountStatusPremiumBadge) {
        accountStatusPremiumBadge.dataset.state = premiumBadgeState;
    }
    if (accountStatusPremiumIcon) {
        accountStatusPremiumIcon.textContent = premiumIcon;
    }
    if (accountStatusPremiumText) {
        accountStatusPremiumText.textContent = premiumText;
    }
}

function updateAccountUi() {
    const premiumDetails = getPremiumBadgeDetails();
    const premiumStatusText = premiumDetails.isActive ? premiumDetails.text : 'Premium inactive';
    document.body.classList.toggle('account-authenticated', accountState.isAuthenticated);

    if (accountState.isAuthenticated && accountState.user) {
        if (accountSummaryText) {
            accountSummaryText.textContent = `${accountState.user.email}. ${premiumDetails.summary}`;
        }
        if (authAccountEmailValue) {
            authAccountEmailValue.textContent = accountState.user.email;
        }
        if (authAccountStatusValue) {
            authAccountStatusValue.textContent = premiumStatusText;
        }
        if (authAccountSummary) {
            authAccountSummary.textContent = `Signed in as ${accountState.user.email}. ${premiumDetails.summary}`;
        }
        if (accountSignedOutActions) {
            accountSignedOutActions.hidden = true;
        }
        if (accountSignedInActions) {
            accountSignedInActions.hidden = false;
        }
        if (accountProfileCorner) {
            accountProfileCorner.hidden = false;
        }
        if (accountProfileActions) {
            accountProfileActions.hidden = false;
        }
    } else {
        if (accountSummaryText) {
            accountSummaryText.textContent = premiumDetails.isActive
                ? `${premiumDetails.summary} Log in before checkout to save future premium access to your email.`
                : 'Create an account to save premium access to your email and stay signed in.';
        }
        if (authAccountEmailValue) {
            authAccountEmailValue.textContent = '--';
        }
        if (authAccountStatusValue) {
            authAccountStatusValue.textContent = premiumStatusText;
        }
        if (authAccountSummary) {
            authAccountSummary.textContent = 'Signed out.';
        }
        if (accountSignedOutActions) {
            accountSignedOutActions.hidden = false;
        }
        if (accountSignedInActions) {
            accountSignedInActions.hidden = true;
        }
        if (accountProfileCorner) {
            accountProfileCorner.hidden = false;
        }
        if (accountProfileActions) {
            accountProfileActions.hidden = true;
        }
        if (accountState.activeView === 'account') {
            accountState.activeView = 'login';
        }
    }

    updateProfileBubbleUi(premiumDetails);
    updateAccountStatusCard(premiumDetails);
    if (currentImageSource) {
        updateBlueprintSizeOptions(currentImageOriginalWidth, currentImageOriginalHeight, sizeSelector.value);
    }
}

function setAuthenticatedUser(user) {
    accountState.isAuthenticated = !!user;
    accountState.user = user || null;
    updateAccountUi();
}

function setAuthModalView(view, options = {}) {
    const requestedView = typeof view === 'string' ? view : 'login';
    const resetTokenValue = resetPasswordToken?.value?.trim() || getResetTokenFromUrl();
    let normalizedView = requestedView;

    if (normalizedView === 'account' && !accountState.isAuthenticated) {
        normalizedView = 'login';
    }
    if (normalizedView === 'reset' && !resetTokenValue) {
        normalizedView = accountState.isAuthenticated ? 'account' : 'forgot';
    }

    accountState.activeView = normalizedView;

    const activeTopView = normalizedView === 'register'
        ? 'register'
        : (['login', 'forgot', 'reset'].includes(normalizedView) ? 'login' : null);

    authTabButtons.forEach((button) => {
        const buttonView = button.dataset.authViewTrigger;
        const isActive = buttonView === activeTopView;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
    });

    authPanels.forEach((panel) => {
        const isActive = panel.dataset.authView === normalizedView;
        panel.hidden = !isActive;
    });

    const viewConfig = getAuthViewConfig(normalizedView);
    if (authModalTitle) {
        authModalTitle.textContent = viewConfig.title;
    }
    if (authModalCopy) {
        authModalCopy.textContent = viewConfig.copy;
    }
    updateAuthModalFooter(normalizedView);
    if (!options.preserveStatus) {
        clearAuthViewFeedback(normalizedView);
    }
    if (options.open !== false) {
        setAuthModalOpen(true);
    }

    window.requestAnimationFrame(() => focusAuthViewField(normalizedView));
}

function hydrateResetTokenFromUrl() {
    const token = getResetTokenFromUrl();
    if (!resetPasswordToken) {
        return;
    }

    resetPasswordToken.value = token;
    if (token) {
        setAuthModalView('reset', { preserveStatus: true });
    }
}

function setRegisterError(message) {
    if (message === AUTH_EMAIL_ERROR_MESSAGE || message === AUTH_DUPLICATE_EMAIL_MESSAGE) {
        setAuthFieldError('registerEmail', message);
        return;
    }

    if (message === AUTH_PASSWORD_TOO_SHORT_MESSAGE || message === AUTH_PASSWORD_NUMBER_MESSAGE) {
        setAuthFieldError('registerPassword', message);
        return;
    }

    if (message === AUTH_PASSWORD_MISMATCH_MESSAGE) {
        setAuthFieldError('registerConfirmPassword', message);
        return;
    }

    setAuthFormMessage('register', message || 'Unable to create the account right now.');
}

function setLoginError(message) {
    if (message === AUTH_EMAIL_ERROR_MESSAGE || message === 'Account not found.') {
        setAuthFieldError('loginEmail', message);
        return;
    }

    if (message === AUTH_PASSWORD_REQUIRED_MESSAGE || message === 'Wrong password.') {
        setAuthFieldError('loginPassword', message);
        return;
    }

    setAuthFormMessage('login', message || 'Unable to log in right now.');
}

function setForgotPasswordError(message) {
    if (message === AUTH_EMAIL_ERROR_MESSAGE || message === 'Account not found.') {
        setAuthFieldError('forgotPasswordEmail', message);
        return;
    }

    setAuthFormMessage('forgot', message || 'Unable to send a reset link right now.');
}

function setResetPasswordError(message) {
    if (message === AUTH_PASSWORD_TOO_SHORT_MESSAGE || message === AUTH_PASSWORD_NUMBER_MESSAGE) {
        setAuthFieldError('resetPasswordInput', message);
        return;
    }

    setAuthFormMessage('reset', message || AUTH_RESET_INVALID_MESSAGE);
}

async function requestApiJson(url, options = {}) {
    const response = await fetch(url, buildApiRequestOptions(options));
    const { payload, rawText } = await parseJsonResponse(response);
    syncFileModeSessionFromPayload(payload);
    if (!response.ok) {
        if (response.status === 401) {
            storeFileModeSessionToken('');
        }
        const error = new Error(payload?.error || rawText || 'Request failed.');
        error.status = response.status;
        throw error;
    }

    return payload;
}

function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(image);
        };
        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error(PROFILE_IMAGE_FILE_MESSAGE));
        };
        image.src = objectUrl;
    });
}

async function createPixelatedProfileImageDataUrl(file) {
    if (!(file instanceof File) || !file.type.startsWith('image/')) {
        throw new Error(PROFILE_IMAGE_FILE_MESSAGE);
    }
    if (file.size > PROFILE_IMAGE_INPUT_MAX_BYTES) {
        throw new Error(PROFILE_IMAGE_SIZE_MESSAGE);
    }

    const image = await loadImageFromFile(file);
    const sourceWidth = Math.max(1, image.naturalWidth || image.width || 1);
    const sourceHeight = Math.max(1, image.naturalHeight || image.height || 1);
    const cropSize = Math.max(1, Math.min(sourceWidth, sourceHeight));
    const sourceX = Math.max(0, Math.floor((sourceWidth - cropSize) / 2));
    const sourceY = Math.max(0, Math.floor((sourceHeight - cropSize) / 2));
    const pixelCanvas = document.createElement('canvas');
    pixelCanvas.width = PROFILE_AVATAR_PIXEL_SIZE;
    pixelCanvas.height = PROFILE_AVATAR_PIXEL_SIZE;
    const pixelContext = pixelCanvas.getContext('2d');
    if (!pixelContext) {
        throw new Error(PROFILE_IMAGE_UPLOAD_ERROR_MESSAGE);
    }

    pixelContext.imageSmoothingEnabled = false;
    pixelContext.clearRect(0, 0, PROFILE_AVATAR_PIXEL_SIZE, PROFILE_AVATAR_PIXEL_SIZE);
    pixelContext.drawImage(
        image,
        sourceX,
        sourceY,
        cropSize,
        cropSize,
        0,
        0,
        PROFILE_AVATAR_PIXEL_SIZE,
        PROFILE_AVATAR_PIXEL_SIZE
    );

    return pixelCanvas.toDataURL('image/png');
}

async function uploadProfileImageDataUrl(imageDataUrl) {
    const payload = await requestApiJson(getAuthApiUrl('/api/auth/profile-image'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_data_url: imageDataUrl
        })
    });
    return payload?.user || null;
}

function setProfileImageControlsPending(isPending) {
    [changeProfileImageBtn, authProfilePickerBtn, profileImageInput].forEach((element) => {
        if (element instanceof HTMLElement) {
            element.disabled = isPending;
        }
    });
}

async function refreshAuthenticatedUser(options = {}) {
    try {
        const payload = await requestApiJson(getAuthApiUrl('/api/auth/me'));
        if (!payload?.authenticated) {
            storeFileModeSessionToken('');
        }
        setAuthenticatedUser(payload?.authenticated ? payload.user || null : null);
        if (payload?.authenticated && payload?.user?.email) {
            console.info('[auth] Session restore succeeded.', { email: payload.user.email });
        } else if (!options.quiet) {
            console.info('[auth] Session restore found no active session.');
        }
        return payload?.user || null;
    } catch (error) {
        console.error('[auth] Session restore failed.', error);
        if (!options.preserveOnError) {
            setAuthenticatedUser(null);
        }
        return null;
    }
}

function setAuthFormPending(form, isPending) {
    if (!(form instanceof HTMLFormElement) && !(form instanceof HTMLElement)) {
        return;
    }

    form.querySelectorAll('input, button').forEach((element) => {
        element.disabled = isPending;
    });
}

function clearAuthFeedbackForInput(input) {
    if (!(input instanceof HTMLElement)) {
        return;
    }

    switch (input.id) {
        case 'registerEmail':
            clearAuthFieldError('registerEmail');
            clearAuthFormMessage('register');
            break;
        case 'registerPassword':
            clearAuthFieldError('registerPassword');
            clearAuthFieldError('registerConfirmPassword');
            clearAuthFormMessage('register');
            updateRegisterPasswordMatchFeedback();
            break;
        case 'registerConfirmPassword':
            clearAuthFieldError('registerConfirmPassword');
            clearAuthFormMessage('register');
            updateRegisterPasswordMatchFeedback();
            break;
        case 'loginEmail':
            clearAuthFieldError('loginEmail');
            clearAuthFormMessage('login');
            break;
        case 'loginPassword':
            clearAuthFieldError('loginPassword');
            clearAuthFormMessage('login');
            break;
        case 'forgotPasswordEmail':
            clearAuthFieldError('forgotPasswordEmail');
            clearAuthFormMessage('forgot');
            clearForgotResetPreview();
            break;
        case 'resetPasswordInput':
            clearAuthFieldError('resetPasswordInput');
            clearAuthFormMessage('reset');
            break;
        default:
            break;
    }
}

function updateRegisterPasswordMatchFeedback() {
    if (!registerPassword || !registerConfirmPassword) {
        return;
    }

    const passwordValue = String(registerPassword.value || '').trim();
    const confirmPasswordValue = String(registerConfirmPassword.value || '').trim();
    if (!confirmPasswordValue) {
        clearAuthFieldError('registerConfirmPassword');
        return;
    }

    if (passwordValue !== confirmPasswordValue) {
        setAuthFieldError('registerConfirmPassword', AUTH_PASSWORD_MISMATCH_MESSAGE);
        return;
    }

    clearAuthFieldError('registerConfirmPassword');
}

async function submitRegisterForm(event) {
    event.preventDefault();

    clearAuthViewFeedback('register');
    let email;
    let password;
    let confirmPassword;
    try {
        email = validateEmailInputValue(registerEmail.value);
        password = validatePasswordInputValue(registerPassword.value);
        confirmPassword = validateMatchingPasswords(password, registerConfirmPassword.value);
    } catch (error) {
        setRegisterError(error.message || AUTH_EMAIL_ERROR_MESSAGE);
        return;
    }

    setAuthFormPending(registerForm, true);
    try {
        const payload = await requestApiJson(getAuthApiUrl('/api/auth/register'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, confirm_password: confirmPassword })
        });
        setAuthenticatedUser(payload?.user || null);
        console.info('[auth] Registration succeeded.', { email: payload?.user?.email || email });
        registerForm.reset();
        setAuthModalOpen(false);
    } catch (error) {
        console.warn('[auth] Registration failed.', { email, message: error.message || 'Unknown error.' });
        setRegisterError(error.message || 'Unable to create the account right now.');
    } finally {
        setAuthFormPending(registerForm, false);
    }
}

async function submitLoginForm(event) {
    event.preventDefault();

    clearAuthViewFeedback('login');
    let email;
    try {
        email = validateEmailInputValue(loginEmail.value);
    } catch (error) {
        setLoginError(error.message || AUTH_EMAIL_ERROR_MESSAGE);
        return;
    }

    const password = String(loginPassword.value || '').trim();
    if (!password) {
        setLoginError(AUTH_PASSWORD_REQUIRED_MESSAGE);
        return;
    }

    setAuthFormPending(loginForm, true);
    try {
        const payload = await requestApiJson(getAuthApiUrl('/api/auth/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        setAuthenticatedUser(payload?.user || null);
        console.info('[auth] Login succeeded.', { email: payload?.user?.email || email });
        loginForm.reset();
        setAuthModalOpen(false);
    } catch (error) {
        console.warn('[auth] Login failed.', { email, message: error.message || 'Unknown error.' });
        setLoginError(error.message || 'Unable to log in right now.');
    } finally {
        setAuthFormPending(loginForm, false);
    }
}

async function submitForgotPasswordForm(event) {
    event.preventDefault();

    clearAuthViewFeedback('forgot');
    let email;
    try {
        email = validateEmailInputValue(forgotPasswordEmail.value);
    } catch (error) {
        setForgotPasswordError(error.message || AUTH_EMAIL_ERROR_MESSAGE);
        return;
    }

    setAuthFormPending(forgotPasswordForm, true);
    try {
        const payload = await requestApiJson(getAuthApiUrl('/api/auth/forgot-password'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        setAuthFormMessage('forgot', payload?.message || 'Password reset request sent.', 'success');
        setForgotResetPreview(typeof payload?.reset_url === 'string' ? payload.reset_url : '');
    } catch (error) {
        setForgotPasswordError(error.message || 'Unable to send a reset link right now.');
    } finally {
        setAuthFormPending(forgotPasswordForm, false);
    }
}

async function submitResetPasswordForm(event) {
    event.preventDefault();

    clearAuthViewFeedback('reset');
    const token = resetPasswordToken?.value?.trim() || getResetTokenFromUrl();
    if (!token) {
        setResetPasswordError(AUTH_RESET_INVALID_MESSAGE);
        return;
    }

    let password;
    try {
        password = validatePasswordInputValue(resetPasswordInput.value);
    } catch (error) {
        setResetPasswordError(error.message || AUTH_PASSWORD_TOO_SHORT_MESSAGE);
        return;
    }

    setAuthFormPending(resetPasswordForm, true);
    try {
        const payload = await requestApiJson(getAuthApiUrl('/api/auth/reset-password'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, password })
        });
        setAuthenticatedUser(payload?.user || null);
        resetPasswordForm.reset();
        if (resetPasswordToken) {
            resetPasswordToken.value = '';
        }
        removeSearchParams('reset_token');
        setAuthModalOpen(false);
    } catch (error) {
        setResetPasswordError(error.message || AUTH_RESET_INVALID_MESSAGE);
    } finally {
        setAuthFormPending(resetPasswordForm, false);
    }
}

async function handleProfileImageSelection(file) {
    clearAuthViewFeedback('account');
    if (!file) {
        return;
    }

    const previousUser = accountState.user ? { ...accountState.user } : null;
    setProfileImageControlsPending(true);
    try {
        const previewImageDataUrl = await createPixelatedProfileImageDataUrl(file);
        const previewImageVersion = String(Date.now());
        if (previousUser) {
            setAuthenticatedUser({
                ...previousUser,
                profile_image_url: previewImageDataUrl,
                profile_image_version: previewImageVersion
            });
        }

        const updatedUser = await uploadProfileImageDataUrl(previewImageDataUrl);
        setAuthenticatedUser(updatedUser || (previousUser
            ? {
                ...previousUser,
                profile_image_url: previewImageDataUrl,
                profile_image_version: previewImageVersion
            }
            : null));
        const refreshedUser = await refreshAuthenticatedUser({ quiet: true, preserveOnError: true });
        if (refreshedUser) {
            setAuthenticatedUser(refreshedUser);
        }
        setAuthFormMessage('account', 'Profile picture updated.', 'success');
    } catch (error) {
        if (previousUser) {
            setAuthenticatedUser(previousUser);
        }
        const message = error instanceof TypeError
            ? PROFILE_IMAGE_UPLOAD_ERROR_MESSAGE
            : (error.message || PROFILE_IMAGE_UPLOAD_ERROR_MESSAGE);
        setAuthFormMessage('account', message);
    } finally {
        setProfileImageControlsPending(false);
        if (profileImageInput) {
            profileImageInput.value = '';
        }
    }
}

async function logoutCurrentAccount() {
    try {
        await requestApiJson(getAuthApiUrl('/api/auth/logout'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('[auth] Logout failed.', error);
    } finally {
        storeFileModeSessionToken('');
        setAuthenticatedUser(null);
        setAuthModalOpen(false);
    }
}

async function verifyCheckoutReturn() {
    const params = new URLSearchParams(window.location.search);
    const checkoutState = params.get('checkout');
    const sessionId = params.get('session_id');

    if (!checkoutState) {
        return;
    }

    const cleanedUrl = `${window.location.pathname}${window.location.hash || ''}`;

    if (checkoutState !== 'success' || !sessionId) {
        window.history.replaceState({}, document.title, cleanedUrl);
        return;
    }

    try {
        const fetchCheckoutStatusPayload = async () => {
            const requestUrl = getCheckoutStatusApiUrl(sessionId);
            console.info('[billing] Verifying checkout session.', { requestUrl, sessionId });
            const response = await fetch(requestUrl, buildApiRequestOptions());
            const { payload, rawText, contentType } = await parseJsonResponse(response);
            console.info('[billing] Checkout verification response received.', {
                status: response.status,
                ok: response.ok,
                contentType,
                payload,
                rawText
            });
            if (!response.ok) {
                if (response.status === 401) {
                    storeFileModeSessionToken('');
                }
                throw new Error(payload?.error || rawText || 'Unable to verify the checkout session.');
            }
            return payload;
        };

        let payload = await fetchCheckoutStatusPayload();
        if (payload?.is_paid && typeof payload.purchase_type === 'string') {
            if (!payload?.premium_activated) {
                for (let attempt = 0; attempt < 8; attempt += 1) {
                    await delay(1000);
                    payload = await fetchCheckoutStatusPayload();
                    if (payload?.premium_activated) {
                        break;
                    }
                }
            }

            if (payload?.premium_activated && payload?.user) {
                setAuthenticatedUser(payload.user);
                storeVerifiedUnlock(payload.purchase_type);
            } else {
                await refreshAuthenticatedUser({ quiet: true });
                setUpgradeModalStatus('Payment received. Premium will activate as soon as Stripe confirms the signed webhook.', false);
            }

            if (currentImageSource) {
                updateBlueprintSizeOptions(currentImageOriginalWidth, currentImageOriginalHeight, sizeSelector.value);
            }
        }
    } catch (error) {
        console.error('[billing] Checkout verification failed.', error);
        if (upgradeModalStatus) {
            setUpgradeModalStatus(
                error instanceof TypeError
                    ? CHECKOUT_VERIFICATION_ERROR_MESSAGE
                    : (error.message || CHECKOUT_VERIFICATION_ERROR_MESSAGE),
                true
            );
        }
    } finally {
        window.history.replaceState({}, document.title, cleanedUrl);
    }
}

async function startCheckout(purchaseType) {
    setUpgradeModalStatus('');

    if (!accountState.isAuthenticated) {
        setUpgradeModalStatus('Create an account or log in before checkout so premium access is saved to your account.', true);
        setAuthModalView('login');
        return;
    }

    const requestPayload = {
        purchase_type: purchaseType
    };

    try {
        const requestUrl = getCheckoutApiUrl();
        console.info('[billing] About to fetch checkout session.', {
            requestUrl,
            purchaseType,
            requestPayload
        });
        console.info('[billing] Creating checkout session.', {
            requestUrl,
            purchaseType,
            requestPayload
        });
        const response = await fetch(requestUrl, buildApiRequestOptions({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
        }));
        const { payload, rawText, contentType } = await parseJsonResponse(response);
        console.info('[billing] Checkout session response received.', {
            status: response.status,
            ok: response.ok,
            contentType,
            payload,
            rawText
        });
        if (!response.ok) {
            if (response.status === 401) {
                storeFileModeSessionToken('');
            }
            throw new Error(payload?.error || rawText || 'Unable to start checkout right now.');
        }
        if (!payload?.checkout_url || typeof payload.checkout_url !== 'string') {
            throw new Error('Stripe Checkout did not return a redirect URL.');
        }

        window.location.assign(payload.checkout_url);
    } catch (error) {
        console.error('[billing] Checkout session creation failed.', {
            error,
            purchaseType,
            requestUrl: getCheckoutApiUrl()
        });
        setUpgradeModalStatus(
            error instanceof TypeError
                ? CHECKOUT_NETWORK_ERROR_MESSAGE
                : (error.message || CHECKOUT_NETWORK_ERROR_MESSAGE),
            true
        );
    }
}

function setChatPendingState(isLoading) {
    chatState.isLoading = isLoading;
    chatWidget.classList.toggle('is-loading', isLoading);
    chatInput.disabled = isLoading;
    chatSendBtn.disabled = isLoading;
    chatInput.setAttribute('aria-busy', String(isLoading));
    chatSendBtn.textContent = isLoading ? 'Sending...' : 'Send';
}

function setChatWidgetOpen(isOpen) {
    chatState.isOpen = isOpen;
    chatWidget.classList.toggle('is-open', isOpen);
    chatPanel.hidden = !isOpen;
    chatLauncher.setAttribute('aria-expanded', String(isOpen));

    if (isOpen && !chatState.isLoading) {
        scrollChatToLatest();
        chatInput.focus();
    }
}

function addChatMessage(role, text, options = {}) {
    const normalizedRole = role === 'user' ? 'user' : 'bot';
    const messageElement = document.createElement('div');
    messageElement.className = `chat-widget-message is-${normalizedRole}`;
    if (options.isError) {
        messageElement.classList.add('is-error');
    }
    if (options.isPending) {
        messageElement.classList.add('is-pending');
    }

    const roleElement = document.createElement('span');
    roleElement.className = 'chat-widget-message-role';
    roleElement.textContent = normalizedRole === 'user' ? 'You' : 'Bot';

    const bodyElement = document.createElement('p');
    bodyElement.textContent = text;

    messageElement.append(roleElement, bodyElement);
    chatMessages.appendChild(messageElement);
    chatEmptyState.hidden = true;
    if (!options.skipHistory) {
        chatState.messages.push({ role: normalizedRole, text });
    }
    scrollChatToLatest();
    return messageElement;
}

async function requestChatReply(message) {
    const requestPayload = {
        message,
        history: chatState.messages
    };
    const chatApiUrl = getChatApiUrl();

    if (window.location.protocol === 'file:') {
        console.warn('[chat] The page is running from file://. Falling back to the local backend at', chatApiUrl);
        console.warn('[chat] Open http://127.0.0.1:8000/ for the clean same-origin setup.');
    }

    console.log('[chat] Sending request to', chatApiUrl, {
        historyCount: chatState.messages.length,
        protocol: window.location.protocol
    });

    let response;
    try {
        response = await fetch(chatApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
        });
    } catch (error) {
        console.error('[chat] Fetch failed before a response was received.', error);

        if (window.location.protocol === 'file:') {
            throw new Error(CHAT_FILE_MODE_ERROR_MESSAGE);
        }

        throw new Error(CHAT_NETWORK_ERROR_MESSAGE);
    }

    console.log('[chat] Backend response received.', {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText
    });

    let payload = null;
    try {
        payload = await response.json();
    } catch (error) {
        console.error('[chat] Response JSON parsing failed.', error);
        payload = null;
    }

    console.log('[chat] Parsed backend payload:', payload);

    if (!response.ok) {
        let errorMessage = payload?.error || CHAT_ERROR_MESSAGE;
        if (!payload?.error && response.status === 404) {
            errorMessage = 'The chat endpoint was not found. Make sure the site is running through the local backend server.';
        }
        throw new Error(errorMessage);
    }

    if (!payload?.reply || typeof payload.reply !== 'string') {
        throw new Error(CHAT_ERROR_MESSAGE);
    }

    return payload.reply;
}

async function sendChatMessage() {
    if (chatState.isLoading) {
        return;
    }

    const message = chatInput.value.trim();
    if (!message) {
        return;
    }

    addChatMessage('user', message);
    chatInput.value = '';
    setChatPendingState(true);

    const pendingMessage = addChatMessage('bot', 'Thinking...', {
        isPending: true,
        skipHistory: true
    });

    try {
        const reply = await requestChatReply(message);
        pendingMessage.remove();
        addChatMessage('bot', reply);
    } catch (error) {
        pendingMessage.remove();
        addChatMessage('bot', error.message || CHAT_ERROR_MESSAGE, { isError: true });
    } finally {
        setChatPendingState(false);
        if (chatState.isOpen) {
            chatInput.focus();
        }
    }
}

function srgbChannelToLinear(value) {
    const normalized = value / 255;
    if (normalized <= 0.04045) {
        return normalized / 12.92;
    }

    return Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function rgbToLab(r, g, b) {
    const linearR = srgbChannelToLinear(r);
    const linearG = srgbChannelToLinear(g);
    const linearB = srgbChannelToLinear(b);

    const x = ((linearR * 0.4124564) + (linearG * 0.3575761) + (linearB * 0.1804375)) / 0.95047;
    const y = ((linearR * 0.2126729) + (linearG * 0.7151522) + (linearB * 0.0721750)) / 1.00000;
    const z = ((linearR * 0.0193339) + (linearG * 0.1191920) + (linearB * 0.9503041)) / 1.08883;

    const transform = (value) => (
        value > 0.008856
            ? Math.cbrt(value)
            : ((7.787 * value) + (16 / 116))
    );

    const fx = transform(x);
    const fy = transform(y);
    const fz = transform(z);

    return {
        l: (116 * fy) - 16,
        a: 500 * (fx - fy),
        b: 200 * (fy - fz)
    };
}

function rgbToHsv(r, g, b) {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let hue = 0;

    if (delta !== 0) {
        if (max === red) {
            hue = 60 * (((green - blue) / delta) % 6);
        } else if (max === green) {
            hue = 60 * (((blue - red) / delta) + 2);
        } else {
            hue = 60 * (((red - green) / delta) + 4);
        }
    }

    return {
        h: hue < 0 ? hue + 360 : hue,
        s: max === 0 ? 0 : delta / max,
        v: max
    };
}

function createColorProfile(r, g, b) {
    const lab = rgbToLab(r, g, b);
    const hsv = rgbToHsv(r, g, b);
    const chroma = Math.sqrt((lab.a * lab.a) + (lab.b * lab.b));
    const brightness = ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;

    return {
        labL: lab.l,
        labA: lab.a,
        labB: lab.b,
        hue: hsv.h,
        saturation: hsv.s,
        value: hsv.v,
        chroma,
        brightness
    };
}

function enrichBlockColorProfile(block) {
    return {
        ...block,
        ...createColorProfile(block.r, block.g, block.b)
    };
}

function getHueDistanceDegrees(firstHue, secondHue) {
    const difference = Math.abs(firstHue - secondHue) % 360;
    return difference > 180 ? 360 - difference : difference;
}

function isHueWithinRange(hue, start, end) {
    if (start <= end) {
        return hue >= start && hue <= end;
    }

    return hue >= start || hue <= end;
}

function buildPixelProfileGrid(grid) {
    return grid.map((row) => row.map((pixel) => createColorProfile(pixel.r, pixel.g, pixel.b)));
}

function getPixelMappingContext(profileGrid, x, y) {
    const pixelProfile = profileGrid[y][x];
    let sampleCount = 0;
    let totalNeighborValue = 0;
    let totalNeighborBrightness = 0;
    let minLocalValue = pixelProfile.value;
    let maxLocalValue = pixelProfile.value;
    let maxImmediateValueDelta = 0;
    let maxImmediateBrightnessDelta = 0;

    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        const neighborRow = profileGrid[y + offsetY];
        if (!neighborRow) {
            continue;
        }

        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            if (offsetX === 0 && offsetY === 0) {
                continue;
            }

            const neighbor = neighborRow[x + offsetX];
            if (!neighbor) {
                continue;
            }

            sampleCount += 1;
            totalNeighborValue += neighbor.value;
            totalNeighborBrightness += neighbor.brightness;
            minLocalValue = Math.min(minLocalValue, neighbor.value);
            maxLocalValue = Math.max(maxLocalValue, neighbor.value);
            maxImmediateValueDelta = Math.max(
                maxImmediateValueDelta,
                Math.abs(pixelProfile.value - neighbor.value)
            );
            maxImmediateBrightnessDelta = Math.max(
                maxImmediateBrightnessDelta,
                Math.abs(pixelProfile.brightness - neighbor.brightness)
            );
        }
    }

    const neighborAverageValue = sampleCount ? (totalNeighborValue / sampleCount) : pixelProfile.value;
    const neighborAverageBrightness = sampleCount ? (totalNeighborBrightness / sampleCount) : pixelProfile.brightness;
    const localValueRange = maxLocalValue - minLocalValue;
    const valueVsNeighborAverage = pixelProfile.value - neighborAverageValue;
    const brightnessVsNeighborAverage = pixelProfile.brightness - neighborAverageBrightness;
    const edgeStrength = Math.max(
        Math.abs(valueVsNeighborAverage),
        maxImmediateValueDelta,
        maxImmediateBrightnessDelta
    );

    return {
        neighborAverageValue,
        neighborAverageBrightness,
        localValueRange,
        valueVsNeighborAverage,
        brightnessVsNeighborAverage,
        edgeStrength
    };
}

function getPerceptualBlockScore(pixelProfile, block, context = null) {
    const deltaL = pixelProfile.labL - block.labL;
    const deltaA = pixelProfile.labA - block.labA;
    const deltaB = pixelProfile.labB - block.labB;
    const deltaE = Math.sqrt((deltaL * deltaL) + (deltaA * deltaA) + (deltaB * deltaB));
    const chromaPenalty = Math.abs(pixelProfile.chroma - block.chroma) * 0.12;
    const hueDistance = getHueDistanceDegrees(pixelProfile.hue, block.hue);
    const saturationStrength = Math.max(pixelProfile.saturation, block.saturation);
    const valueDifference = Math.abs(pixelProfile.value - block.value);
    const brightnessDifference = Math.abs(pixelProfile.brightness - block.brightness);
    let score = deltaE + chromaPenalty;

    if (saturationStrength > 0.1) {
        score += (hueDistance / 180) * saturationStrength * 18;
    }

    if (pixelProfile.saturation < 0.1) {
        score += Math.max(0, block.saturation - 0.18) * 14;
    }

    if (pixelProfile.value < 0.12) {
        score += Math.max(0, block.value - 0.24) * 18;
    }

    if (pixelProfile.value > 0.9 && pixelProfile.saturation < 0.15) {
        score += Math.max(0, 0.78 - block.value) * 24;
    }

    if (
        pixelProfile.saturation > 0.45 &&
        isHueWithinRange(pixelProfile.hue, 345, 25) &&
        isHueWithinRange(block.hue, 20, 85)
    ) {
        score += 18 + (pixelProfile.saturation * 8);
    }

    if (
        pixelProfile.saturation > 0.4 &&
        isHueWithinRange(pixelProfile.hue, 205, 255) &&
        isHueWithinRange(block.hue, 160, 200)
    ) {
        score += 10 + (pixelProfile.saturation * 5);
    }

    if (context) {
        const strongColorWeight = Math.max(
            0,
            ((pixelProfile.saturation - 0.42) * 1.4) + ((pixelProfile.chroma - 34) / 38)
        );
        const edgeWeight = Math.max(
            0,
            ((context.edgeStrength - 0.1) * 3.2) + ((context.localValueRange - 0.1) * 2.4)
        );
        const darkDetailWeight = (
            pixelProfile.value < 0.42 && context.localValueRange > 0.06
                ? Math.max(0, ((0.42 - pixelProfile.value) * 2.2) + ((context.localValueRange - 0.06) * 3.4))
                : 0
        );
        const warmHueFocus = isHueWithinRange(pixelProfile.hue, 350, 55);
        const skinToneFocus = (
            isHueWithinRange(pixelProfile.hue, 8, 42) &&
            pixelProfile.saturation >= 0.18 &&
            pixelProfile.saturation <= 0.65 &&
            pixelProfile.value >= 0.32 &&
            pixelProfile.value <= 0.92
        );
        const blueGradientFocus = (
            isHueWithinRange(pixelProfile.hue, 190, 255) &&
            pixelProfile.saturation > 0.2
        );

        if (strongColorWeight > 0) {
            score += (hueDistance / 180) * strongColorWeight * 10;

            if (block.saturation + 0.08 < pixelProfile.saturation) {
                score += (pixelProfile.saturation - block.saturation) * strongColorWeight * 6;
            }
        }

        if (warmHueFocus && pixelProfile.saturation > 0.28 && !isHueWithinRange(block.hue, 338, 68)) {
            score += 6 + (pixelProfile.saturation * 6);
        }

        if (skinToneFocus && !isHueWithinRange(block.hue, 355, 55)) {
            score += 8;
        }

        if (blueGradientFocus) {
            if (!isHueWithinRange(block.hue, 185, 270)) {
                score += 7;
            }

            score += valueDifference * (2.5 + (pixelProfile.saturation * 3.5));
        }

        if (edgeWeight > 0) {
            score += valueDifference * edgeWeight * 22;
            score += brightnessDifference * edgeWeight * 16;

            if (Math.abs(context.valueVsNeighborAverage) > 0.08) {
                const pixelContrastDirection = Math.sign(context.valueVsNeighborAverage);
                const blockContrastDirection = Math.sign(block.value - context.neighborAverageValue);

                if (pixelContrastDirection !== 0 && blockContrastDirection !== 0 && pixelContrastDirection !== blockContrastDirection) {
                    score += 12 + (edgeWeight * 4);
                }

                score += Math.abs(
                    (block.value - context.neighborAverageValue) - context.valueVsNeighborAverage
                ) * edgeWeight * 10;
            }
        }

        if (darkDetailWeight > 0) {
            score += valueDifference * darkDetailWeight * 24;
            score += brightnessDifference * darkDetailWeight * 14;

            if (pixelProfile.saturation > 0.16 && block.saturation + 0.08 < pixelProfile.saturation) {
                score += (pixelProfile.saturation - block.saturation) * darkDetailWeight * 10;
            }
        }
    }

    return score;
}

function enhanceResizedImageData(imageData) {
    const { width, height, data } = imageData;
    const source = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const index = (y * width + x) * 4;
            if (source[index + 3] === 0) {
                continue;
            }

            for (let channel = 0; channel < 3; channel++) {
                const center = source[index + channel];
                const neighborAverage = (
                    source[index + channel - 4] +
                    source[index + channel + 4] +
                    source[index + channel - (width * 4)] +
                    source[index + channel + (width * 4)]
                ) / 4;
                const detail = center - neighborAverage;
                if (Math.abs(detail) < EDGE_ENHANCEMENT_THRESHOLD) {
                    continue;
                }

                data[index + channel] = clampColorChannel(
                    Math.round(center + (detail * EDGE_ENHANCEMENT_STRENGTH))
                );
            }
        }
    }

    return imageData;
}

function getClosestBlockForPixel(pixelProfile, allowedBlocks, context = null) {
    let closestBlock = allowedBlocks[0];
    let minScore = Infinity;

    for (const block of allowedBlocks) {
        const colorDistance = getPerceptualBlockScore(pixelProfile, block, context);

        if (colorDistance < minScore) {
            minScore = colorDistance;
            closestBlock = block;
        }
    }

    return closestBlock;
}

function parseBlueprintSizeValue(value) {
    const normalizedValue = String(value || '').trim().toLowerCase();
    if (normalizedValue.includes('x')) {
        const [widthValue, heightValue] = normalizedValue.split('x');
        const width = parseInt(widthValue, 10);
        const height = parseInt(heightValue, 10);
        if (!Number.isNaN(width) && !Number.isNaN(height) && width > 0 && height > 0) {
            return { width, height };
        }
    }

    const squareSize = parseInt(normalizedValue, 10);
    if (!Number.isNaN(squareSize) && squareSize > 0) {
        return { width: squareSize, height: squareSize };
    }

    return { width: 32, height: 32 };
}

function setCurrentGridDimensions(width, height) {
    currentGridWidth = width;
    currentGridHeight = height;
    currentGridSize = Math.max(width, height);
}

function getBlueprintOrientation(width, height) {
    if (width === height) {
        return 'square';
    }

    return width > height ? 'horizontal' : 'vertical';
}

function calculateBlueprintDimensionsForLongSide(longSide, imageWidth, imageHeight) {
    if (imageWidth >= imageHeight) {
        return {
            width: longSide,
            height: Math.max(1, Math.round((imageHeight / imageWidth) * longSide))
        };
    }

    return {
        width: Math.max(1, Math.round((imageWidth / imageHeight) * longSide)),
        height: longSide
    };
}

function getBlueprintSizeOptions(imageWidth = currentImageOriginalWidth, imageHeight = currentImageOriginalHeight) {
    const presets = SQUARE_BLUEPRINT_LONG_SIDE_OPTIONS;
    const options = [];
    const seenSizes = new Set();

    presets.forEach((longSide, index) => {
        const dimensions = calculateBlueprintDimensionsForLongSide(longSide, imageWidth, imageHeight);
        const value = `${dimensions.width}x${dimensions.height}`;
        if (seenSizes.has(value)) {
            return;
        }

        seenSizes.add(value);
        options.push({
            ...dimensions,
            label: BLUEPRINT_SIZE_LABELS[index] || `Size ${index + 1}`,
            longSide,
            value
        });
    });

    return options;
}

function updateBlueprintSizeOptions(imageWidth = currentImageOriginalWidth, imageHeight = currentImageOriginalHeight, preferredValue = sizeSelector.value) {
    const options = getBlueprintSizeOptions(imageWidth, imageHeight);
    currentBlueprintSizeOptions = options;
    const preferredDimensions = parseBlueprintSizeValue(preferredValue);
    const preferredLongSide = Math.max(preferredDimensions.width, preferredDimensions.height);

    sizeSelector.innerHTML = options.map((option) => (
        `<option value="${option.value}">${getOptionDisplayLabel(option)}</option>`
    )).join('');

    const exactMatch = options.find((option) => option.value === preferredValue);
    const bestLongSideMatch = options.find((option) => option.longSide === preferredLongSide);
    let selectedOption = exactMatch || bestLongSideMatch || options[0];
    if (selectedOption && isBlueprintSizeOptionLocked(selectedOption)) {
        const unlockedFallbackValue = getPreferredUnlockedSizeValue();
        selectedOption = findSizeOptionByValue(unlockedFallbackValue) || options[0];
    }

    sizeSelector.value = selectedOption.value;
    setCurrentGridDimensions(selectedOption.width, selectedOption.height);
    if (selectedOption && !isBlueprintSizeOptionLocked(selectedOption)) {
        lastUnlockedSizeValue = selectedOption.value;
    }
}

function buildBlueprintFromGrid(grid) {
    const allowedBlocks = minecraftBlocks;
    const blueprint = [];
    const profileGrid = buildPixelProfileGrid(grid);

    for (let y = 0; y < grid.length; y++) {
        const row = [];
        for (let x = 0; x < grid[y].length; x++) {
            const pixelProfile = profileGrid[y][x];
            const context = getPixelMappingContext(profileGrid, x, y);
            const block = getClosestBlockForPixel(pixelProfile, allowedBlocks, context);
            row.push({ x, y, block: block.name });
        }
        blueprint.push(row);
    }

    return blueprint;
}

function getSectionKey() {
    return `section-progress-${currentGridWidth}x${currentGridHeight}-${sectionSize}`;
}

function saveSectionProgress() {
    sessionSectionProgress.set(getSectionKey(), { ...sectionStatuses });
    localStorage.setItem(getSectionKey(), JSON.stringify(sectionStatuses));
}

function loadSectionProgress() {
    const saved = localStorage.getItem(getSectionKey());
    sectionStatuses = saved ? JSON.parse(saved) : {};
}

function loadSessionSectionProgress() {
    sectionStatuses = { ...(sessionSectionProgress.get(getSectionKey()) || {}) };
}

function getSectionColumnCount() {
    return Math.ceil(currentGridWidth / sectionSize);
}

function getSectionRowCount() {
    return Math.ceil(currentGridHeight / sectionSize);
}

function getSectionLabel(row, col) {
    return `${indexToLetters(row)}${col + 1}`;
}

function getSectionStatus(label) {
    return sectionStatuses[label] || 'not-started';
}

function getStatusDisplay(status) {
    if (status === 'in-progress') {
        return 'In Progress';
    }

    if (status === 'completed') {
        return 'Completed';
    }

    return 'Not Started';
}

function getOverallProgressPercentage() {
    const totalSections = getSectionColumnCount() * getSectionRowCount();
    if (!totalSections) {
        return 0;
    }

    let completedSections = 0;
    Object.values(sectionStatuses).forEach((status) => {
        if (status === 'completed') {
            completedSections += 1;
        }
    });

    return Math.round((completedSections / totalSections) * 100);
}

function getAllBlockCounts() {
    if (!currentBlueprint) {
        return {};
    }

    if (cachedBlockCountsSource === currentBlueprint && cachedBlockCounts) {
        return cachedBlockCounts;
    }

    const blockCounts = {};
    for (let y = 0; y < currentGridHeight; y++) {
        for (let x = 0; x < currentGridWidth; x++) {
            const blockName = currentBlueprint[y][x].block;
            blockCounts[blockName] = (blockCounts[blockName] || 0) + 1;
        }
    }

    cachedBlockCounts = blockCounts;
    cachedSortedBlockCounts = null;
    cachedBlockCountsSource = currentBlueprint;
    return blockCounts;
}

function getSortedBlockCountEntries() {
    if (!currentBlueprint) {
        return [];
    }

    if (cachedBlockCountsSource === currentBlueprint && cachedSortedBlockCounts) {
        return cachedSortedBlockCounts;
    }

    cachedSortedBlockCounts = Object.entries(getAllBlockCounts())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return cachedSortedBlockCounts;
}

function invalidateBlueprintCaches() {
    cachedFlatBlueprint = null;
    cachedFlatBlueprintSource = null;
    cachedBlockCounts = null;
    cachedSortedBlockCounts = null;
    cachedBlockCountsSource = null;
    cachedFocusedSectionCells.clear();
}

function getSectionBounds(section) {
    if (!section) {
        return null;
    }

    const startX = section.col * sectionSize;
    const startY = section.row * sectionSize;
    const endX = Math.min(startX + sectionSize, currentGridWidth);
    const endY = Math.min(startY + sectionSize, currentGridHeight);

    return {
        startX,
        startY,
        endX,
        endY,
        width: endX - startX,
        height: endY - startY
    };
}

function formatBlockDisplayName(blockName) {
    return blockName
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function getInvertedBlockColorByName(blockName) {
    const block = minecraftBlockLookup[blockName];
    if (!block) {
        return '#000';
    }

    return `rgb(${255 - block.r}, ${255 - block.g}, ${255 - block.b})`;
}

function updateBlueprintLegend() {
    if (!currentBlueprint) {
        blueprintLegendInfo.innerHTML = 'Generate a blueprint to see every block used in the build.';
        return;
    }

    const items = getSortedBlockCountEntries();

    if (items.length === 0) {
        blueprintLegendInfo.innerHTML = 'No blocks found for the current blueprint.';
        return;
    }

    blueprintLegendInfo.innerHTML = `
        <div class="legend-list">
            ${items.map(([blockName, count]) => `
                <button class="legend-row${focusedLegendInversionBlock === blockName ? ' active' : ''}" data-block="${blockName}" type="button" aria-pressed="${focusedLegendInversionBlock === blockName ? 'true' : 'false'}">
                    <span class="legend-color" style="background-color: ${getBlockColorByName(blockName)};"></span>
                    <span class="legend-name">${formatBlockDisplayName(blockName)}</span>
                    <span class="legend-count">${count} blocks</span>
                </button>
            `).join('')}
        </div>
    `;
}

function getBlockColorByName(blockName) {
    const block = minecraftBlockLookup[blockName];
    return block ? `rgb(${block.r}, ${block.g}, ${block.b})` : '#1A1A1A';
}
function updateProjectInfoBar() {
    if (!currentImageSource || !currentBlueprint) {
        projectInfoSize.textContent = '--';
        projectInfoBlocks.textContent = '--';
        projectInfoSection.textContent = 'None';
        return;
    }

    const currentSectionLabel = selectedSection?.label || 'None';

    projectInfoSize.textContent = `${currentGridWidth} x ${currentGridHeight}`;
    projectInfoBlocks.textContent = String(currentGridWidth * currentGridHeight);
    projectInfoSection.textContent = currentSectionLabel;
}

function getSectionByLabel(label) {
    if (!label) {
        return null;
    }

    const match = /^([A-Z]+)(\d+)$/i.exec(label.trim());
    if (!match) {
        return null;
    }

    const [, rowLetters, colDigits] = match;
    let row = 0;
    for (const letter of rowLetters.toUpperCase()) {
        row = (row * 26) + (letter.charCodeAt(0) - 64);
    }
    row -= 1;
    const col = parseInt(colDigits, 10) - 1;
    if (Number.isNaN(row) || Number.isNaN(col) || row < 0 || col < 0) {
        return null;
    }

    return {
        row,
        col,
        label
    };
}

function indexToLetters(index) {
    let value = index + 1;
    let label = '';

    while (value > 0) {
        const remainder = (value - 1) % 26;
        label = String.fromCharCode(65 + remainder) + label;
        value = Math.floor((value - 1) / 26);
    }

    return label;
}

function updateAppVisibility() {
    const hasProjectImage = !!currentImageSource;

    welcomeState.style.display = hasProjectImage ? 'none' : 'grid';
    appWorkspace.style.display = hasProjectImage ? 'grid' : 'none';
    document.body.classList.toggle('workspace-active', hasProjectImage);

    if (projectInfoBar) {
        projectInfoBar.style.display = hasProjectImage ? 'grid' : 'none';
    }

    if (chatWidget) {
        chatWidget.hidden = !hasProjectImage;
        chatWidget.style.display = hasProjectImage ? '' : 'none';
        chatWidget.setAttribute('aria-hidden', String(!hasProjectImage));
    }

    if (!hasProjectImage) {
        if (typeof setChatWidgetOpen === 'function') {
            setChatWidgetOpen(false);
        }
        if (chatPanel) {
            chatPanel.hidden = true;
        }
    }
}

function scheduleLastSessionSave() {
    // Project save/load UI was removed from the homepage, so this hook is intentionally inert.
}

function resetWorkspaceState() {
    const { width, height } = parseBlueprintSizeValue(sizeSelector.value);

    sessionSectionProgress.clear();
    clearLockedPreviewTeaserCache();
    currentBlueprint = null;
    currentPixelGrid = null;
    currentGridWidth = width;
    currentGridHeight = height;
    currentGridSize = Math.max(width, height);
    fullBlueprintZoomLevel = 1;
    focusedSectionZoomLevel = 1;
    activeZoomViewport = 'full';
    selectedBlock = null;
    focusedLegendInversionBlock = null;
    sectionSize = parseInt(sectionSizeSelector.value, 10);
    currentImageOriginalWidth = 1;
    currentImageOriginalHeight = 1;
    sectionStatuses = {};
    selectedSection = null;
    currentViewMode = 'full';
    currentImageSource = null;
    latestUploadedImageSource = null;
    buildModeEnabled = false;
    currentBuildRowIndex = 0;
    comparisonModeEnabled = false;
    syncComparisonEnabled = false;
    comparisonSyncLock = false;
    hoveredFullBlueprintSection = null;
    hoveredFocusedSectionCell = null;
    currentBlueprintSizeOptions = [];
    pendingPremiumSizeOption = null;
    fullBlueprintViewportState.offsetX = 0;
    fullBlueprintViewportState.offsetY = 0;
    fullBlueprintViewportState.scaledWidth = 0;
    fullBlueprintViewportState.scaledHeight = 0;
    fullBlueprintViewportState.viewportWidth = 0;
    fullBlueprintViewportState.viewportHeight = 0;
    focusedSectionViewportState.offsetX = 0;
    focusedSectionViewportState.offsetY = 0;
    focusedSectionViewportState.scaledWidth = 0;
    focusedSectionViewportState.scaledHeight = 0;
    focusedSectionViewportState.viewportWidth = 0;
    focusedSectionViewportState.viewportHeight = 0;

    invalidateBlueprintCaches();
    hideTooltip();
    if (imageUpload) {
        imageUpload.value = '';
    }
    if (syncComparisonCheckbox) {
        syncComparisonCheckbox.checked = false;
    }
    if (blueprintSectionHoverOverlay) {
        blueprintSectionHoverOverlay.hidden = true;
        blueprintSectionHoverOverlay.setAttribute('aria-hidden', 'true');
    }
    if (focusedSectionHoverOverlay) {
        focusedSectionHoverOverlay.hidden = true;
        focusedSectionHoverOverlay.setAttribute('aria-hidden', 'true');
    }
    blueprintGridDiv.innerHTML = '';
    focusedSectionGridDiv.innerHTML = '';
    pixelCanvas.width = 320;
    pixelCanvas.height = 320;
    ctx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
    closeUpgradeModal();
    updateBlueprintLegend();
    updateProjectInfoBar();
    updateCurrentSectionUI();
    updateViewModeUI();
    updatePreviewCanvasScale();
    updateZoomDisplayLabel();
    updateAppVisibility();
    syncFocusedSectionCardHeight();
}

function forceLocalhostIntroState() {
    currentImageSource = null;
    latestUploadedImageSource = null;
    currentBlueprint = null;
    currentPixelGrid = null;
    if (imageUpload) {
        imageUpload.value = '';
    }
    updateAppVisibility();
}

function handleInitialWorkspaceState() {
    resetWorkspaceState();
    if (isLocalhostWorkspaceSession()) {
        forceLocalhostIntroState();
    }
}

function clampColorChannel(value) {
    return Math.max(0, Math.min(255, value));
}

function clampFullBlueprintZoomLevel(zoomLevel) {
    return Math.max(FULL_BLUEPRINT_MIN_ZOOM, Math.min(FULL_BLUEPRINT_MAX_ZOOM, zoomLevel));
}

function syncFocusedSectionCardHeight() {
    if (!fullBlueprintCard || !focusedSectionCard) {
        return;
    }

    const fullBlueprintCardHeight = fullBlueprintCard.getBoundingClientRect().height;
    if (fullBlueprintCardHeight <= 0) {
        focusedSectionCard.style.height = '';
        return;
    }

    focusedSectionCard.style.height = `${Math.round(fullBlueprintCardHeight)}px`;
}

function updateViewModeUI() {
    currentViewMode = 'full';
    buildModeEnabled = false;
    comparisonModeEnabled = false;
    syncComparisonEnabled = false;
    document.body.classList.remove('focused-mode');
    document.body.classList.remove('build-mode-enabled');
    document.body.classList.remove('comparison-mode-enabled');
    document.body.classList.toggle('debug-lite-lower-workspace', DEBUG_SIMPLIFY_LOWER_WORKSPACE);
    fullBlueprintCard.classList.add('emphasized');
    fullBlueprintCard.classList.remove('deemphasized');
    focusedSectionCard.classList.add('emphasized');
    focusedSectionCard.classList.remove('deemphasized');
    syncComparisonCheckbox.checked = false;
    syncComparisonCheckbox.disabled = true;
}

function getSelectedSectionBounds() {
    return getSectionBounds(selectedSection);
}

function getBuildRowCount() {
    const bounds = getSelectedSectionBounds();
    return bounds ? bounds.height : 0;
}

function clampBuildRowIndex() {
    const rowCount = getBuildRowCount();
    if (rowCount <= 0) {
        currentBuildRowIndex = 0;
        return;
    }

    currentBuildRowIndex = Math.min(Math.max(currentBuildRowIndex, 0), rowCount - 1);
}

function getCurrentBuildRowAbsoluteY() {
    const bounds = getSelectedSectionBounds();
    if (!bounds) {
        return null;
    }

    clampBuildRowIndex();
    return bounds.startY + currentBuildRowIndex;
}

function getCurrentBuildRowCells() {
    if (!currentBlueprint || !selectedSection) {
        return [];
    }

    const bounds = getSelectedSectionBounds();
    const y = getCurrentBuildRowAbsoluteY();
    if (bounds === null || y === null) {
        return [];
    }

    const cells = [];
    for (let x = bounds.startX; x < bounds.endX; x++) {
        cells.push(currentBlueprint[y][x]);
    }

    return cells;
}

function updateBuildModePanel() {
    if (!buildModeEnabled) {
        buildModeStatusBadge.textContent = 'Build Mode: Off';
        buildModeSectionInfo.textContent = 'Current Section: None';
        buildModeRowInfo.textContent = 'Row: --';
        buildRowSequence.textContent = 'Enable Build Mode and select a section to see the current row.';
        prevRowBtn.disabled = true;
        nextRowBtn.disabled = true;
        completeSectionBtn.disabled = true;
        return;
    }

    buildModeStatusBadge.textContent = 'Build Mode: On';

    if (!currentBlueprint || !selectedSection) {
        buildModeSectionInfo.textContent = 'Current Section: None';
        buildModeRowInfo.textContent = 'Row: --';
        buildRowSequence.textContent = 'Select a section to start guided building.';
        prevRowBtn.disabled = true;
        nextRowBtn.disabled = true;
        completeSectionBtn.disabled = true;
        return;
    }

    clampBuildRowIndex();
    const rowCount = getBuildRowCount();
    const rowDisplay = rowCount > 0 ? currentBuildRowIndex + 1 : '--';
    const rowCells = getCurrentBuildRowCells();

    buildModeSectionInfo.textContent = `Current Section: ${selectedSection.label}`;
    buildModeRowInfo.textContent = `Row: ${rowDisplay}`;
    prevRowBtn.disabled = currentBuildRowIndex <= 0;
    nextRowBtn.disabled = rowCount === 0 || currentBuildRowIndex >= rowCount - 1;
    completeSectionBtn.disabled = rowCount === 0 || currentBuildRowIndex !== rowCount - 1;

    if (rowCells.length === 0) {
        buildRowSequence.textContent = 'No blocks found for the current row.';
        return;
    }

    const blocksHtml = rowCells.map((cell) => `<span class="build-row-block">${cell.block}</span>`).join('');
    buildRowSequence.innerHTML = `
        <div class="section-materials-header">Current Row Block Sequence</div>
        <div class="build-row-sequence-list">${blocksHtml}</div>
    `;
}

function setTooltipContent(cell, event) {
    if (activeTooltipCell !== cell) {
        const x = parseInt(cell.dataset.x, 10);
        const y = parseInt(cell.dataset.y, 10);
        const block = cell.dataset.block;
        const sectionLabel = cell.dataset.section;
        tooltip.textContent = `Block: ${block}\nX: ${x}\nY: ${y}\nSection: ${sectionLabel}`;
        activeTooltipCell = cell;
    }

    tooltipPointerX = event.pageX + 10;
    tooltipPointerY = event.pageY + 10;
    tooltip.style.display = 'block';
    scheduleTooltipPosition();
}

function hideTooltip() {
    activeTooltipCell = null;
    if (tooltipFrame) {
        cancelAnimationFrame(tooltipFrame);
        tooltipFrame = null;
    }
    tooltip.style.display = 'none';
}

// Throttle tooltip movement to one paint per frame so hover doesn't fight page scrolling.
function scheduleTooltipPosition() {
    if (tooltipFrame) {
        return;
    }

    tooltipFrame = requestAnimationFrame(() => {
        tooltipFrame = null;
        tooltip.style.transform = `translate(${tooltipPointerX}px, ${tooltipPointerY}px)`;
    });
}

function updateCurrentSectionUI() {
    if (!selectedSection) {
        updateSectionSummaryUI();
        updateBuildModePanel();
        updateProjectInfoBar();
        return;
    }

    updateSectionSummaryUI();
    updateBuildModePanel();
    updateProjectInfoBar();
}

function updateSectionSummaryUI() {
    if (!selectedSection) {
        currentSectionBadge.textContent = 'Selected Section: None';
        focusedSectionLabel.textContent = 'No section selected';
        focusedSectionSize.textContent = 'Section size: --';
        focusedSectionStatus.textContent = 'Status: --';
        prevSectionBtn.disabled = true;
        nextSectionBtn.disabled = true;
        return;
    }

    const { label } = selectedSection;
    const bounds = getSelectedSectionBounds();
    const status = getSectionStatus(label);

    currentSectionBadge.textContent = `Selected Section: ${label}`;
    focusedSectionLabel.textContent = `Current Section: ${label}`;
    focusedSectionSize.textContent = `Section size: ${bounds.width} x ${bounds.height}`;
    focusedSectionStatus.textContent = `Status: ${getStatusDisplay(status)}`;
    prevSectionBtn.disabled = false;
    nextSectionBtn.disabled = false;
}

function updateHighlight() {
    lastHighlightedCells.forEach((cell) => {
        cell.classList.remove('selected-cell');
    });
    lastHighlightedCells = [];

    if (!selectedBlock) {
        return;
    }

    const selector = `[data-x="${selectedBlock.x}"][data-y="${selectedBlock.y}"]`;
    lastHighlightedCells = Array.from(document.querySelectorAll(selector));
    lastHighlightedCells.forEach((cell) => {
        cell.classList.add('selected-cell');
    });
}

function setFullBlueprintSectionState(section, options = {}) {
    if (!section) {
        return;
    }

    const bounds = getSectionBounds(section);
    const cells = blueprintGridDiv.querySelectorAll(`.grid-cell[data-section="${section.label}"]`);
    cells.forEach((cell) => {
        const x = parseInt(cell.dataset.x, 10);
        const y = parseInt(cell.dataset.y, 10);
        const isSelected = !!options.isSelected;

        cell.classList.toggle('active-section-cell', isSelected);
        cell.classList.toggle('active-section-edge-left', isSelected && x === bounds.startX);
        cell.classList.toggle('active-section-edge-right', isSelected && x === bounds.endX - 1);
        cell.classList.toggle('active-section-edge-top', isSelected && y === bounds.startY);
        cell.classList.toggle('active-section-edge-bottom', isSelected && y === bounds.endY - 1);
        cell.classList.toggle('build-row-cell', isSelected && options.buildRowAbsoluteY !== null && y === options.buildRowAbsoluteY);
        cell.classList.toggle('dimmed-cell', !!options.isDimmed);
    });
}

// Patch only the affected section cells when navigation changes to avoid rebuilding a huge grid.
function updateFullBlueprintState(previousSection, previousBuildRowAbsoluteY = null) {
    const hasRenderedGrid = !!blueprintGridDiv.querySelector('.blueprint-grid');
    if (!hasRenderedGrid) {
        return;
    }

    const nextSection = selectedSection ? { ...selectedSection } : null;
    const nextBuildRowAbsoluteY = buildModeEnabled ? getCurrentBuildRowAbsoluteY() : null;

    if (previousSection && (!nextSection || previousSection.label !== nextSection.label)) {
        setFullBlueprintSectionState(previousSection, {
            isSelected: false,
            isDimmed: false,
            buildRowAbsoluteY: null
        });
    }

    if (nextSection) {
        setFullBlueprintSectionState(nextSection, {
            isSelected: true,
            isDimmed: false,
            buildRowAbsoluteY: nextBuildRowAbsoluteY
        });
    }

    if (
        previousSection &&
        nextSection &&
        previousSection.label === nextSection.label &&
        previousBuildRowAbsoluteY !== nextBuildRowAbsoluteY
    ) {
        setFullBlueprintSectionState(nextSection, {
            isSelected: true,
            isDimmed: false,
            buildRowAbsoluteY: nextBuildRowAbsoluteY
        });
    }
}

function buildCellMarkup(cell, options) {
    const block = minecraftBlockLookup[cell.block];
    const shortName = cell.block.split('_')[0];
    const shortLabel = shortName.charAt(0).toUpperCase() + shortName.slice(1);
    const sectionRow = Math.floor(cell.y / sectionSize);
    const sectionCol = Math.floor(cell.x / sectionSize);
    const sectionLabel = getSectionLabel(sectionRow, sectionCol);
    const status = getSectionStatus(sectionLabel);
    const fontSize = Math.max(4, options.cellSize * (options.fontScale || 0.5));
    const gridLineWidth = Math.max(0.5, Math.min(1, options.cellSize * 0.08));
    const sectionLineWidth = Math.max(1, Math.min(3, Math.round(options.cellSize * 0.12)));
    const activeEdgeWidth = Math.max(1, Math.min(3, Math.round(options.cellSize * 0.12)));
    const selectedBorderWidth = Math.max(1, Math.min(3, Math.round(options.cellSize * 0.16)));
    const selectedOutlineWidth = Math.max(1, Math.min(2, Math.round(options.cellSize * 0.1)));
    const buildOutlineWidth = Math.max(1, Math.min(2, Math.round(options.cellSize * 0.1)));
    const classes = ['grid-cell'];
    const selectedBounds = options.selectedBounds || null;

    const sectionBoundaryOverlays = [];
    if (cell.x % sectionSize === 0 && cell.x > 0) {
        sectionBoundaryOverlays.push('<div class="cell-boundary cell-boundary-left"></div>');
    }
    if (cell.y % sectionSize === 0 && cell.y > 0) {
        sectionBoundaryOverlays.push('<div class="cell-boundary cell-boundary-top"></div>');
    }

    if (selectedSection && sectionLabel === selectedSection.label) {
        classes.push(options.isFocusedViewer ? 'focused-section-cell' : 'active-section-cell');

        if (selectedBounds) {
            if (cell.x === selectedBounds.startX) {
                classes.push('active-section-edge-left');
            }
            if (cell.x === selectedBounds.endX - 1) {
                classes.push('active-section-edge-right');
            }
            if (cell.y === selectedBounds.startY) {
                classes.push('active-section-edge-top');
            }
            if (cell.y === selectedBounds.endY - 1) {
                classes.push('active-section-edge-bottom');
            }
        }
    }

    const buildRowAbsoluteY = options.buildRowAbsoluteY ?? null;
    if (buildModeEnabled && selectedSection && sectionLabel === selectedSection.label && cell.y === buildRowAbsoluteY) {
        classes.push('build-row-cell');
    }

    if (options.dimNonSelected && selectedSection && sectionLabel !== selectedSection.label) {
        classes.push('dimmed-cell');
    }

    let overlay = sectionBoundaryOverlays.join('');
    if (status === 'completed' || status === 'in-progress') {
        overlay += `<div class="section-overlay status-${status}"></div>`;
    }

    let cellStyle = '';
    let cellText = '';
    // Focused Section can temporarily invert one legend-selected material without mutating blueprint data.
    const invertedBlockName = options.invertedBlockName || null;
    const useInvertedColor = invertedBlockName === cell.block;
    const color = useInvertedColor
        ? getInvertedBlockColorByName(cell.block)
        : (block ? `rgb(${block.r}, ${block.g}, ${block.b})` : '#000');
    cellStyle = `background-color:${color};width:${options.cellSize}px;height:${options.cellSize}px;font-size:${fontSize}px;--grid-line-width:${gridLineWidth}px;--section-line-width:${sectionLineWidth}px;--active-edge-width:${activeEdgeWidth}px;--selected-border-width:${selectedBorderWidth}px;--selected-outline-width:${selectedOutlineWidth}px;--build-outline-width:${buildOutlineWidth}px;`;
    cellText = options.showLabelsInColorView && options.cellSize >= 18 ? shortLabel : '';

    return `<div class="${classes.join(' ')}" data-x="${cell.x}" data-y="${cell.y}" data-section="${sectionLabel}" data-block="${cell.block}" style="${cellStyle}" title="${cell.block}">${cellText}${overlay}</div>`;
}

function attachGridEvents(container) {
    if (container.dataset.gridEventsBound === 'true') {
        return;
    }

    container.dataset.gridEventsBound = 'true';
    // Debug simplification: keep click selection, but avoid per-cell hover tracking on the
    // large lower-workspace grids because it causes continuous pointer-driven work.

    container.addEventListener('click', (event) => {
        if (container.dataset.gridInteraction !== 'cell-select') {
            return;
        }

        const cell = event.target.closest('.grid-cell');
        if (!cell || !container.contains(cell)) {
            return;
        }

        selectedBlock = {
            x: parseInt(cell.dataset.x, 10),
            y: parseInt(cell.dataset.y, 10),
            block: cell.dataset.block,
            sectionLabel: cell.dataset.section
        };
        updateHighlight();
    });
}

function isRenderedFullBlueprintTarget(target) {
    return !!target?.closest('.grid-frame');
}

function isRenderedFocusedSectionTarget(target) {
    return !!target?.closest('.grid-frame');
}

function getAxisFrameSize(cellSize) {
    const axisFontSize = Math.max(8, Math.min(16, cellSize * 0.46));
    return Math.max(18, Math.min(28, Math.round(axisFontSize + 10)));
}

function hideFullBlueprintSectionHoverOverlay() {
    if (!blueprintSectionHoverOverlay) {
        return;
    }

    blueprintSectionHoverOverlay.hidden = true;
}

function hideFocusedSectionHoverOverlay() {
    if (!focusedSectionHoverOverlay) {
        return;
    }

    focusedSectionHoverOverlay.hidden = true;
}

function applyHoverOverlayRect(overlayElement, left, top, width, height, borderThickness) {
    if (!overlayElement) {
        return;
    }

    overlayElement.style.setProperty('--hover-border-thickness', `${borderThickness}px`);
    overlayElement.style.left = `${Math.round(left)}px`;
    overlayElement.style.top = `${Math.round(top)}px`;
    overlayElement.style.width = `${Math.max(1, Math.round(width))}px`;
    overlayElement.style.height = `${Math.max(1, Math.round(height))}px`;
    overlayElement.hidden = false;
}

function getFullBlueprintSectionFromPointer(event) {
    if (!currentBlueprint) {
        return null;
    }

    const viewerRect = blueprintViewer.getBoundingClientRect();
    const pointerX = event.clientX - viewerRect.left;
    const pointerY = event.clientY - viewerRect.top;
    const cellSize = getFullBlueprintBaseCellSize();
    const axisSize = getAxisFrameSize(cellSize);
    const naturalX = (pointerX - fullBlueprintViewportState.offsetX) / fullBlueprintZoomLevel;
    const naturalY = (pointerY - fullBlueprintViewportState.offsetY) / fullBlueprintZoomLevel;
    const gridX = naturalX - axisSize;
    const gridY = naturalY - axisSize;
    const gridWidth = currentGridWidth * cellSize;
    const gridHeight = currentGridHeight * cellSize;

    if (gridX < 0 || gridY < 0 || gridX >= gridWidth || gridY >= gridHeight) {
        return null;
    }

    const cellX = Math.floor(gridX / cellSize);
    const cellY = Math.floor(gridY / cellSize);
    const row = Math.floor(cellY / sectionSize);
    const col = Math.floor(cellX / sectionSize);

    return {
        row,
        col,
        label: getSectionLabel(row, col)
    };
}

function renderFullBlueprintSectionHoverOverlay() {
    if (!blueprintSectionHoverOverlay || !currentBlueprint || !hoveredFullBlueprintSection) {
        hideFullBlueprintSectionHoverOverlay();
        return;
    }

    const bounds = getSectionBounds(hoveredFullBlueprintSection);
    if (!bounds) {
        hideFullBlueprintSectionHoverOverlay();
        return;
    }

    const cellSize = getFullBlueprintBaseCellSize();
    const axisSize = getAxisFrameSize(cellSize);
    const scaledLeft = (axisSize + (bounds.startX * cellSize)) * fullBlueprintZoomLevel;
    const scaledTop = (axisSize + (bounds.startY * cellSize)) * fullBlueprintZoomLevel;
    const scaledWidth = bounds.width * cellSize * fullBlueprintZoomLevel;
    const scaledHeight = bounds.height * cellSize * fullBlueprintZoomLevel;
    const borderThickness = Math.max(2, Math.min(6, Math.round(Math.min(scaledWidth, scaledHeight) * 0.12)));

    applyHoverOverlayRect(
        blueprintSectionHoverOverlay,
        fullBlueprintViewportState.offsetX + scaledLeft,
        fullBlueprintViewportState.offsetY + scaledTop,
        scaledWidth,
        scaledHeight,
        borderThickness
    );
}

function setHoveredFullBlueprintSection(section) {
    const nextLabel = section?.label || null;
    const previousLabel = hoveredFullBlueprintSection?.label || null;
    if (nextLabel === previousLabel) {
        if (nextLabel) {
            renderFullBlueprintSectionHoverOverlay();
        } else {
            hideFullBlueprintSectionHoverOverlay();
        }
        return;
    }

    hoveredFullBlueprintSection = section ? { ...section } : null;
    renderFullBlueprintSectionHoverOverlay();
}

function handleFullBlueprintHover(event) {
    if (!currentBlueprint || fullBlueprintPanState.active) {
        setHoveredFullBlueprintSection(null);
        return;
    }

    setHoveredFullBlueprintSection(getFullBlueprintSectionFromPointer(event));
}

function handleFullBlueprintLeave() {
    setHoveredFullBlueprintSection(null);
}

function getFocusedSectionCellFromPointer(event) {
    if (!currentBlueprint || !selectedSection) {
        return null;
    }

    const bounds = getSelectedSectionBounds();
    if (!bounds) {
        return null;
    }

    const viewerRect = focusedSectionViewer.getBoundingClientRect();
    const pointerX = event.clientX - viewerRect.left;
    const pointerY = event.clientY - viewerRect.top;
    const cellSize = getFocusedBaseCellSize(bounds.width, bounds.height);
    const axisSize = getAxisFrameSize(cellSize);
    const naturalX = (pointerX - focusedSectionViewportState.offsetX) / focusedSectionZoomLevel;
    const naturalY = (pointerY - focusedSectionViewportState.offsetY) / focusedSectionZoomLevel;
    const gridX = naturalX - axisSize;
    const gridY = naturalY - axisSize;
    const gridWidth = bounds.width * cellSize;
    const gridHeight = bounds.height * cellSize;

    if (gridX < 0 || gridY < 0 || gridX >= gridWidth || gridY >= gridHeight) {
        return null;
    }

    return {
        cellX: Math.floor(gridX / cellSize),
        cellY: Math.floor(gridY / cellSize),
        sectionLabel: selectedSection.label
    };
}

function renderFocusedSectionCellHoverOverlay() {
    if (!focusedSectionHoverOverlay || !currentBlueprint || !selectedSection || !hoveredFocusedSectionCell) {
        hideFocusedSectionHoverOverlay();
        return;
    }

    const bounds = getSelectedSectionBounds();
    if (!bounds) {
        hideFocusedSectionHoverOverlay();
        return;
    }

    const { cellX, cellY, sectionLabel } = hoveredFocusedSectionCell;
    if (sectionLabel !== selectedSection.label) {
        hoveredFocusedSectionCell = null;
        hideFocusedSectionHoverOverlay();
        return;
    }

    if (cellX < 0 || cellY < 0 || cellX >= bounds.width || cellY >= bounds.height) {
        hideFocusedSectionHoverOverlay();
        return;
    }

    const cellSize = getFocusedBaseCellSize(bounds.width, bounds.height);
    const axisSize = getAxisFrameSize(cellSize);
    const scaledLeft = (axisSize + (cellX * cellSize)) * focusedSectionZoomLevel;
    const scaledTop = (axisSize + (cellY * cellSize)) * focusedSectionZoomLevel;
    const scaledCellSize = cellSize * focusedSectionZoomLevel;
    const borderThickness = Math.max(2, Math.min(6, Math.round(scaledCellSize * 0.12)));

    applyHoverOverlayRect(
        focusedSectionHoverOverlay,
        focusedSectionViewportState.offsetX + scaledLeft,
        focusedSectionViewportState.offsetY + scaledTop,
        scaledCellSize,
        scaledCellSize,
        borderThickness
    );
}

function setHoveredFocusedSectionCell(cell) {
    const nextKey = cell ? `${cell.sectionLabel}:${cell.cellX},${cell.cellY}` : null;
    const previousKey = hoveredFocusedSectionCell
        ? `${hoveredFocusedSectionCell.sectionLabel}:${hoveredFocusedSectionCell.cellX},${hoveredFocusedSectionCell.cellY}`
        : null;

    if (nextKey === previousKey) {
        if (nextKey) {
            renderFocusedSectionCellHoverOverlay();
        } else {
            hideFocusedSectionHoverOverlay();
        }
        return;
    }

    hoveredFocusedSectionCell = cell
        ? { cellX: cell.cellX, cellY: cell.cellY, sectionLabel: cell.sectionLabel }
        : null;
    renderFocusedSectionCellHoverOverlay();
}

function handleFocusedSectionHover(event) {
    if (!currentBlueprint || !selectedSection || focusedSectionPanState.active) {
        setHoveredFocusedSectionCell(null);
        return;
    }

    setHoveredFocusedSectionCell(getFocusedSectionCellFromPointer(event));
}

function handleFocusedSectionLeave() {
    setHoveredFocusedSectionCell(null);
}

function handleFullBlueprintClick(event) {
    if (event.button !== 0 || !currentBlueprint || fullBlueprintPanState.active) {
        return;
    }

    const section = getFullBlueprintSectionFromPointer(event);
    if (!section) {
        return;
    }

    selectSection(section.row, section.col);
}

function beginFullBlueprintPan(event) {
    if (event.button !== 2 || !currentBlueprint || !isRenderedFullBlueprintTarget(event.target)) {
        return;
    }

    // Reserve right-drag on the rendered full blueprint for viewport panning.
    setActiveZoomViewport('full');
    fullBlueprintPanState.active = true;
    fullBlueprintPanState.moved = false;
    fullBlueprintPanState.startX = event.clientX;
    fullBlueprintPanState.startY = event.clientY;
    fullBlueprintPanState.offsetX = fullBlueprintViewportState.offsetX;
    fullBlueprintPanState.offsetY = fullBlueprintViewportState.offsetY;
    setHoveredFullBlueprintSection(null);
    blueprintViewer.classList.add('is-panning');
    event.preventDefault();
}

function updateFullBlueprintPan(event) {
    if (!fullBlueprintPanState.active) {
        return;
    }

    const deltaX = event.clientX - fullBlueprintPanState.startX;
    const deltaY = event.clientY - fullBlueprintPanState.startY;

    if (!fullBlueprintPanState.moved && (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1)) {
        fullBlueprintPanState.moved = true;
    }

    setFullBlueprintViewportOffset(
        fullBlueprintPanState.offsetX + deltaX,
        fullBlueprintPanState.offsetY + deltaY
    );
    event.preventDefault();
}

function endFullBlueprintPan() {
    if (!fullBlueprintPanState.active) {
        return;
    }

    fullBlueprintPanState.active = false;
    blueprintViewer.classList.remove('is-panning');
}

function handleFullBlueprintWheelZoom(event) {
    if (!fullBlueprintPanState.active || !currentBlueprint || !blueprintViewer.contains(event.target)) {
        return;
    }

    const zoomFactor = event.deltaY < 0 ? 1.12 : (1 / 1.12);
    const nextZoom = clampFullBlueprintZoomLevel(fullBlueprintZoomLevel * zoomFactor);
    if (nextZoom === fullBlueprintZoomLevel) {
        return;
    }

    fullBlueprintZoomLevel = nextZoom;
    activeZoomViewport = 'full';
    updateZoomDisplay({ clientX: event.clientX, clientY: event.clientY });
    event.preventDefault();
}

function beginFocusedSectionPan(event) {
    if (event.button !== 2 || !currentBlueprint || !selectedSection || !isRenderedFocusedSectionTarget(event.target)) {
        return;
    }

    setActiveZoomViewport('focused');
    focusedSectionPanState.active = true;
    focusedSectionPanState.moved = false;
    focusedSectionPanState.startX = event.clientX;
    focusedSectionPanState.startY = event.clientY;
    focusedSectionPanState.offsetX = focusedSectionViewportState.offsetX;
    focusedSectionPanState.offsetY = focusedSectionViewportState.offsetY;
    setHoveredFocusedSectionCell(null);
    focusedSectionViewer.classList.add('is-panning');
    event.preventDefault();
}

function updateFocusedSectionPan(event) {
    if (!focusedSectionPanState.active) {
        return;
    }

    const deltaX = event.clientX - focusedSectionPanState.startX;
    const deltaY = event.clientY - focusedSectionPanState.startY;

    if (!focusedSectionPanState.moved && (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1)) {
        focusedSectionPanState.moved = true;
    }

    setFocusedSectionViewportOffset(
        focusedSectionPanState.offsetX + deltaX,
        focusedSectionPanState.offsetY + deltaY
    );
    event.preventDefault();
}

function endFocusedSectionPan() {
    if (!focusedSectionPanState.active) {
        return;
    }

    focusedSectionPanState.active = false;
    focusedSectionViewer.classList.remove('is-panning');
}

function handleFocusedSectionWheelZoom(event) {
    if (!focusedSectionPanState.active || !currentBlueprint || !selectedSection || !focusedSectionViewer.contains(event.target)) {
        return;
    }

    const zoomFactor = event.deltaY < 0 ? 1.12 : (1 / 1.12);
    const nextZoom = Math.max(0.05, Math.min(20, focusedSectionZoomLevel * zoomFactor));
    if (nextZoom === focusedSectionZoomLevel) {
        return;
    }

    focusedSectionZoomLevel = nextZoom;
    activeZoomViewport = 'focused';
    updateZoomDisplay({ clientX: event.clientX, clientY: event.clientY }, 'focused');
    event.preventDefault();
}

function getAxisLabelInterval(cellSize) {
    if (cellSize <= 4) {
        return 10;
    }
    if (cellSize <= 7) {
        return 5;
    }
    if (cellSize <= 10) {
        return 2;
    }
    return 1;
}

function buildCoordinateFrame(cellsMarkup, columns, rows, options = {}) {
    const startX = options.startX || 0;
    const startY = options.startY || 0;
    const cellSize = options.cellSize || 20;
    const axisFontSize = Math.max(8, Math.min(16, cellSize * 0.46));
    const axisSize = getAxisFrameSize(cellSize);
    const labelInterval = getAxisLabelInterval(cellSize);
    const hideOriginOverlapLabels = !!options.hideOriginOverlapLabels;
    const xLabelsTop = [];
    const yLabelsLeft = [];

    for (let x = 0; x < columns; x++) {
        const axisClasses = ['axis-cell', 'axis-x-cell'];
        if ((startX + x) % sectionSize === 0) {
            axisClasses.push('axis-section-start-x');
        }
        const columnNumber = startX + x + 1;
        const showLabel = (x === 0 || x === columns - 1 || columnNumber % labelInterval === 0)
            && !(hideOriginOverlapLabels && startX === 0 && x === 0);
        const label = showLabel ? columnNumber : '&nbsp;';
        xLabelsTop.push(
            `<div class="${axisClasses.concat('axis-x-top-cell').join(' ')}" style="width:${cellSize}px;height:${axisSize}px;font-size:${axisFontSize}px;">${label}</div>`
        );
    }

    for (let y = 0; y < rows; y++) {
        const axisClasses = ['axis-cell', 'axis-y-cell'];
        if ((startY + y) % sectionSize === 0) {
            axisClasses.push('axis-section-start-y');
        }
        const rowLabel = startY + y + 1;
        const showLabel = (y === 0 || y === rows - 1 || (startY + y + 1) % labelInterval === 0)
            && !(hideOriginOverlapLabels && startY === 0 && y === 0);
        const label = showLabel ? rowLabel : '&nbsp;';
        yLabelsLeft.push(
            `<div class="${axisClasses.concat('axis-y-left-cell').join(' ')}" style="width:${axisSize}px;height:${cellSize}px;font-size:${axisFontSize}px;">${label}</div>`
        );
    }

    return `
        <div class="grid-frame" style="--axis-size:${axisSize}px;">
            <div class="grid-corner" style="width:${axisSize}px;height:${axisSize}px;"></div>
            <div class="grid-axis grid-axis-x grid-axis-x-top" style="grid-template-columns:repeat(${columns}, max-content);">${xLabelsTop.join('')}</div>
            <div class="grid-corner" style="width:${axisSize}px;height:${axisSize}px;"></div>
            <div class="grid-axis grid-axis-y grid-axis-y-left" style="grid-template-rows:repeat(${rows}, max-content);">${yLabelsLeft.join('')}</div>
            <div class="blueprint-grid">${cellsMarkup}</div>
            <div class="grid-spacer grid-spacer-y" style="width:${axisSize}px;height:${rows * cellSize}px;"></div>
            <div class="grid-corner" style="width:${axisSize}px;height:${axisSize}px;"></div>
            <div class="grid-spacer grid-spacer-x" style="width:${columns * cellSize}px;height:${axisSize}px;"></div>
            <div class="grid-corner" style="width:${axisSize}px;height:${axisSize}px;"></div>
        </div>
    `;
}

function getFocusedSectionCells(bounds) {
    if (!currentBlueprint || !selectedSection || !bounds) {
        return [];
    }

    // Reuse the flattened section cell list so switching rows within a section avoids rebuilding it.
    const cacheKey = `${selectedSection.label}:${sectionSize}:${currentGridWidth}x${currentGridHeight}`;
    const cachedCells = cachedFocusedSectionCells.get(cacheKey);
    if (cachedCells) {
        return cachedCells;
    }

    const cells = [];
    for (let y = bounds.startY; y < bounds.endY; y++) {
        for (let x = bounds.startX; x < bounds.endX; x++) {
            cells.push(currentBlueprint[y][x]);
        }
    }

    cachedFocusedSectionCells.set(cacheKey, cells);
    return cells;
}

function renderGrid(target, cells, columns, options = {}) {
    const rowCount = options.rows || Math.ceil(cells.length / columns);
    const markup = [];
    const resolvedOptions = {
        ...options,
        selectedBounds: options.selectedBounds || null,
        buildRowAbsoluteY: options.buildRowAbsoluteY ?? null
    };

    for (let index = 0; index < cells.length; index++) {
        markup.push(buildCellMarkup(cells[index], resolvedOptions));
    }
    const frameMarkup = buildCoordinateFrame(markup.join(''), columns, rowCount, options);
    target.dataset.gridInteraction = options.interactionMode || 'cell-select';
    target.innerHTML = options.useZoomLayer
        ? `<div class="blueprint-zoom-layer">${frameMarkup}</div>`
        : frameMarkup;

    const gridElement = target.querySelector('.blueprint-grid');
    if (gridElement) {
        gridElement.style.gridTemplateColumns = `repeat(${columns}, max-content)`;
        gridElement.style.gridTemplateRows = `repeat(${rowCount}, max-content)`;
    }

    attachGridEvents(target);
}

function snapRenderCellSize(targetSize, minimum = 1) {
    return Math.max(minimum, Math.round(targetSize));
}

function getSharedBaseCellSize(maxSide, minimum = 1) {
    return snapRenderCellSize(Math.max(minimum, 480 / Math.max(1, maxSide)), minimum);
}

function getFullBlueprintBaseCellSize() {
    // Use the same snapped sizing pipeline as the focused viewer, just with a smaller floor.
    return getSharedBaseCellSize(currentGridSize, 1);
}

function getFullCellSize() {
    return getFullBlueprintBaseCellSize() * fullBlueprintZoomLevel;
}

function getFocusedCellSize(sectionWidth, sectionHeight) {
    const sectionMaxSide = Math.max(sectionWidth, sectionHeight);
    const base = 480 / Math.max(1, sectionMaxSide);
    return Math.max(18, base * focusedSectionZoomLevel);
}

function getFocusedBaseCellSize(sectionWidth, sectionHeight) {
    const sectionMaxSide = Math.max(sectionWidth, sectionHeight);
    return getSharedBaseCellSize(sectionMaxSide, 18);
}

function renderBlueprintViewport(target, cells, options = {}) {
    const columns = options.columns;
    const rows = options.rows;
    const maxSide = Math.max(columns, rows);
    const minimumCellSize = options.minimumCellSize ?? 1;
    const cellSize = getSharedBaseCellSize(maxSide, minimumCellSize);

    renderGrid(target, cells, columns, {
        buildRowAbsoluteY: options.buildRowAbsoluteY ?? null,
        cellSize,
        dimNonSelected: !!options.dimNonSelected,
        hideOriginOverlapLabels: !!options.hideOriginOverlapLabels,
        isFocusedViewer: !!options.isFocusedViewer,
        invertedBlockName: options.invertedBlockName || null,
        selectedBounds: options.selectedBounds || null,
        showLabelsInColorView: true,
        rows,
        startX: options.startX || 0,
        startY: options.startY || 0,
        useZoomLayer: true
    });
}

function renderFullBlueprint() {
    if (!currentBlueprint) {
        invalidateBlueprintCaches();
        hideFullBlueprintSectionHoverOverlay();
        blueprintGridDiv.innerHTML = '';
        blueprintGridDiv.style.width = '0px';
        blueprintGridDiv.style.height = '0px';
        return;
    }

    if (cachedFlatBlueprintSource !== currentBlueprint) {
        cachedFlatBlueprint = [];
        for (let y = 0; y < currentGridHeight; y++) {
            for (let x = 0; x < currentGridWidth; x++) {
                cachedFlatBlueprint.push(currentBlueprint[y][x]);
            }
        }
        cachedFlatBlueprintSource = currentBlueprint;
    }

    renderBlueprintViewport(blueprintGridDiv, cachedFlatBlueprint, {
        buildRowAbsoluteY: buildModeEnabled ? getCurrentBuildRowAbsoluteY() : null,
        columns: currentGridWidth,
        dimNonSelected: false,
        hideOriginOverlapLabels: true,
        interactionMode: 'section-select',
        minimumCellSize: 1,
        rows: currentGridHeight,
        selectedBounds: selectedSection ? getSelectedSectionBounds() : null,
        startX: 0,
        startY: 0
    });
    applyFullBlueprintViewportLayout();
}

function renderFocusedSection() {
    if (!currentBlueprint || !selectedSection) {
        setHoveredFocusedSectionCell(null);
        focusedSectionGridDiv.innerHTML = '<p>Select a section to isolate it here.</p>';
        focusedSectionGridDiv.style.width = '0px';
        focusedSectionGridDiv.style.height = '0px';
        return;
    }

    const bounds = getSelectedSectionBounds();
    const cells = getFocusedSectionCells(bounds);

    renderBlueprintViewport(focusedSectionGridDiv, cells, {
        buildRowAbsoluteY: buildModeEnabled ? getCurrentBuildRowAbsoluteY() : null,
        columns: bounds.width,
        invertedBlockName: focusedLegendInversionBlock,
        isFocusedViewer: true,
        interactionMode: 'cell-select',
        minimumCellSize: 18,
        rows: bounds.height,
        selectedBounds: bounds,
        startX: bounds.startX,
        startY: bounds.startY
    });
    applyFocusedSectionViewportLayout();
}

function regenerateGrid() {
    renderFullBlueprint();
    renderFocusedSection();
    syncFocusedSectionCardHeight();
    updateHighlight();
    updateCurrentSectionUI();
    updateViewModeUI();
    scheduleLastSessionSave();
}

function getFullBlueprintViewportMetrics() {
    const zoomLayer = blueprintGridDiv.querySelector('.blueprint-zoom-layer');
    const naturalWidth = zoomLayer ? zoomLayer.offsetWidth : 0;
    const naturalHeight = zoomLayer ? zoomLayer.offsetHeight : 0;
    const viewportWidth = blueprintViewer.clientWidth;
    const viewportHeight = blueprintViewer.clientHeight;

    return {
        naturalWidth,
        naturalHeight,
        scaledWidth: naturalWidth * fullBlueprintZoomLevel,
        scaledHeight: naturalHeight * fullBlueprintZoomLevel,
        viewportWidth,
        viewportHeight
    };
}

function getFocusedSectionViewportMetrics() {
    const zoomLayer = focusedSectionGridDiv.querySelector('.blueprint-zoom-layer');
    const naturalWidth = zoomLayer ? zoomLayer.offsetWidth : 0;
    const naturalHeight = zoomLayer ? zoomLayer.offsetHeight : 0;
    const viewportWidth = focusedSectionViewer.clientWidth;
    const viewportHeight = focusedSectionViewer.clientHeight;

    return {
        naturalWidth,
        naturalHeight,
        scaledWidth: naturalWidth * focusedSectionZoomLevel,
        scaledHeight: naturalHeight * focusedSectionZoomLevel,
        viewportWidth,
        viewportHeight
    };
}

function getCenteredViewportOffsets(metrics) {
    return {
        x: (metrics.viewportWidth - metrics.scaledWidth) / 2,
        y: (metrics.viewportHeight - metrics.scaledHeight) / 2
    };
}

function getRecoverableViewportOffsetRange(scaledSize, viewportSize) {
    if (scaledSize <= 0 || viewportSize <= 0) {
        const centeredOffset = (viewportSize - scaledSize) / 2;
        return {
            min: centeredOffset,
            max: centeredOffset
        };
    }

    const minVisibleStrip = Math.min(140, Math.max(72, viewportSize * 0.18), scaledSize);

    return {
        min: minVisibleStrip - scaledSize,
        max: viewportSize - minVisibleStrip
    };
}

function clampViewportOffsets(offsetX, offsetY, metrics) {
    if (metrics.scaledWidth <= 0 || metrics.scaledHeight <= 0 || metrics.viewportWidth <= 0 || metrics.viewportHeight <= 0) {
        return {
            ...getCenteredViewportOffsets(metrics),
            metrics
        };
    }

    // Leave a visible strip of the blueprint recoverable at every edge so panning feels freer
    // without letting the content disappear completely outside the viewport.
    const horizontalRange = getRecoverableViewportOffsetRange(metrics.scaledWidth, metrics.viewportWidth);
    const verticalRange = getRecoverableViewportOffsetRange(metrics.scaledHeight, metrics.viewportHeight);
    const clampedX = Math.min(horizontalRange.max, Math.max(horizontalRange.min, offsetX));
    const clampedY = Math.min(verticalRange.max, Math.max(verticalRange.min, offsetY));

    return {
        x: clampedX,
        y: clampedY,
        metrics
    };
}

function clampFullBlueprintOffsets(offsetX, offsetY, metrics = getFullBlueprintViewportMetrics()) {
    return clampViewportOffsets(offsetX, offsetY, metrics);
}

function centerFullBlueprintViewport() {
    const metrics = getFullBlueprintViewportMetrics();
    const centeredOffsets = getCenteredViewportOffsets(metrics);
    setFullBlueprintViewportOffset(centeredOffsets.x, centeredOffsets.y);
}

function centerFocusedSectionViewport() {
    const metrics = getFocusedSectionViewportMetrics();
    const centeredOffsets = getCenteredViewportOffsets(metrics);
    setFocusedSectionViewportOffset(centeredOffsets.x, centeredOffsets.y);
}

function syncComparisonPreviewToFullBlueprint() {
    if (!comparisonModeEnabled || !syncComparisonEnabled || comparisonSyncLock) {
        return;
    }

    const metrics = getFullBlueprintViewportMetrics();
    const horizontalRange = Math.max(0, metrics.scaledWidth - metrics.viewportWidth);
    const verticalRange = Math.max(0, metrics.scaledHeight - metrics.viewportHeight);
    const previewMaxLeft = Math.max(0, comparisonPreviewViewer.scrollWidth - comparisonPreviewViewer.clientWidth);
    const previewMaxTop = Math.max(0, comparisonPreviewViewer.scrollHeight - comparisonPreviewViewer.clientHeight);
    const horizontalProgress = horizontalRange ? (-fullBlueprintViewportState.offsetX / horizontalRange) : 0;
    const verticalProgress = verticalRange ? (-fullBlueprintViewportState.offsetY / verticalRange) : 0;

    comparisonSyncLock = true;
    comparisonPreviewViewer.scrollLeft = horizontalProgress * previewMaxLeft;
    comparisonPreviewViewer.scrollTop = verticalProgress * previewMaxTop;
    requestAnimationFrame(() => {
        comparisonSyncLock = false;
    });
}

function setFullBlueprintViewportOffset(offsetX, offsetY, options = {}) {
    const { syncComparison = true } = options;
    const { x, y, metrics } = clampFullBlueprintOffsets(offsetX, offsetY);
    const snappedX = Math.round(x);
    const snappedY = Math.round(y);

    fullBlueprintViewportState.offsetX = snappedX;
    fullBlueprintViewportState.offsetY = snappedY;
    fullBlueprintViewportState.scaledWidth = metrics.scaledWidth;
    fullBlueprintViewportState.scaledHeight = metrics.scaledHeight;
    fullBlueprintViewportState.viewportWidth = metrics.viewportWidth;
    fullBlueprintViewportState.viewportHeight = metrics.viewportHeight;

    blueprintGridDiv.style.transform = `translate(${snappedX}px, ${snappedY}px)`;
    renderFullBlueprintSectionHoverOverlay();

    if (syncComparison) {
        syncComparisonPreviewToFullBlueprint();
    }
}

function applyFullBlueprintViewportLayout() {
    const zoomLayer = blueprintGridDiv.querySelector('.blueprint-zoom-layer');
    if (!zoomLayer) {
        return;
    }

    // Keep the full blueprint in a fixed viewport: only the inner layer scales, while the outer box stays stable.
    zoomLayer.style.transform = `scale(${fullBlueprintZoomLevel})`;

    const metrics = getFullBlueprintViewportMetrics();
    blueprintGridDiv.style.width = `${metrics.scaledWidth}px`;
    blueprintGridDiv.style.height = `${metrics.scaledHeight}px`;
    setFullBlueprintViewportOffset(fullBlueprintViewportState.offsetX, fullBlueprintViewportState.offsetY);
    renderFullBlueprintSectionHoverOverlay();
}

function setFocusedSectionViewportOffset(offsetX, offsetY) {
    const { x, y, metrics } = clampViewportOffsets(offsetX, offsetY, getFocusedSectionViewportMetrics());
    const snappedX = Math.round(x);
    const snappedY = Math.round(y);

    focusedSectionViewportState.offsetX = snappedX;
    focusedSectionViewportState.offsetY = snappedY;
    focusedSectionViewportState.scaledWidth = metrics.scaledWidth;
    focusedSectionViewportState.scaledHeight = metrics.scaledHeight;
    focusedSectionViewportState.viewportWidth = metrics.viewportWidth;
    focusedSectionViewportState.viewportHeight = metrics.viewportHeight;

    focusedSectionGridDiv.style.transform = `translate(${snappedX}px, ${snappedY}px)`;
    renderFocusedSectionCellHoverOverlay();
}

function applyFocusedSectionViewportLayout() {
    const zoomLayer = focusedSectionGridDiv.querySelector('.blueprint-zoom-layer');
    if (!zoomLayer) {
        syncFocusedSectionCardHeight();
        return;
    }

    zoomLayer.style.transform = `scale(${focusedSectionZoomLevel})`;

    const metrics = getFocusedSectionViewportMetrics();
    focusedSectionGridDiv.style.width = `${metrics.scaledWidth}px`;
    focusedSectionGridDiv.style.height = `${metrics.scaledHeight}px`;
    setFocusedSectionViewportOffset(focusedSectionViewportState.offsetX, focusedSectionViewportState.offsetY);
    syncFocusedSectionCardHeight();
}

function scrollFullViewerToSection(section) {
    if (!section || !currentBlueprint) {
        return;
    }

    const cellSize = getFullBlueprintBaseCellSize();
    const sectionWidth = Math.min(sectionSize, currentGridWidth - (section.col * sectionSize));
    const sectionHeight = Math.min(sectionSize, currentGridHeight - (section.row * sectionSize));
    const sectionCenterX = ((section.col * sectionSize * cellSize) + ((sectionWidth * cellSize) / 2)) * fullBlueprintZoomLevel;
    const sectionCenterY = ((section.row * sectionSize * cellSize) + ((sectionHeight * cellSize) / 2)) * fullBlueprintZoomLevel;
    const viewportWidth = blueprintViewer.clientWidth;
    const viewportHeight = blueprintViewer.clientHeight;

    setFullBlueprintViewportOffset(
        (viewportWidth / 2) - sectionCenterX,
        (viewportHeight / 2) - sectionCenterY
    );
}

function selectSection(row, col, options = {}) {
    if (!currentBlueprint) {
        return;
    }

    const maxRows = getSectionRowCount();
    const maxCols = getSectionColumnCount();
    if (row < 0 || col < 0 || row >= maxRows || col >= maxCols) {
        return;
    }

    const previousSection = selectedSection ? { ...selectedSection } : null;
    const previousBuildRowAbsoluteY = buildModeEnabled ? getCurrentBuildRowAbsoluteY() : null;
    const previousViewMode = currentViewMode;

    selectedSection = {
        row,
        col,
        label: getSectionLabel(row, col)
    };
    currentBuildRowIndex = 0;

    currentViewMode = 'full';

    if (previousViewMode !== currentViewMode) {
        regenerateGrid();
    } else {
        renderFocusedSection();
        updateFullBlueprintState(previousSection, previousBuildRowAbsoluteY);
        updateHighlight();
        updateSectionSummaryUI();
        updateBuildModePanel();
        updateProjectInfoBar();
        updateViewModeUI();
        scheduleLastSessionSave();
    }
    scrollFullViewerToSection(selectedSection);
    centerFocusedSectionViewport();
}

function focusAdjacentSection(direction) {
    if (!currentBlueprint) {
        return;
    }

    const maxRows = getSectionRowCount();
    const maxCols = getSectionColumnCount();
    const total = maxRows * maxCols;
    let currentIndex = 0;

    if (selectedSection) {
        currentIndex = (selectedSection.row * maxCols) + selectedSection.col;
    }

    const nextIndex = (currentIndex + direction + total) % total;
    const nextRow = Math.floor(nextIndex / maxCols);
    const nextCol = nextIndex % maxCols;
    selectSection(nextRow, nextCol, { switchToFocused: true });
}

function setBuildMode(enabled) {
    buildModeEnabled = false;
    if (buildModeEnabled && !selectedSection && currentBlueprint) {
        selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
    }
    clampBuildRowIndex();
    renderFocusedSection();
    updateFullBlueprintState(selectedSection);
    updateSectionSummaryUI();
    updateBuildModePanel();
    updateProjectInfoBar();
    updateViewModeUI();
    scheduleLastSessionSave();
}

function stepBuildRow(direction) {
    if (!buildModeEnabled || !selectedSection) {
        return;
    }

    const previousBuildRowAbsoluteY = getCurrentBuildRowAbsoluteY();
    currentBuildRowIndex += direction;
    clampBuildRowIndex();
    renderFocusedSection();
    updateFullBlueprintState(selectedSection, previousBuildRowAbsoluteY);
    updateHighlight();
    updateBuildModePanel();
    scheduleLastSessionSave();
    const bounds = getSelectedSectionBounds();
    const focusedCellSize = getFocusedBaseCellSize(bounds.width, bounds.height) * focusedSectionZoomLevel;
    setFocusedSectionViewportOffset(
        focusedSectionViewportState.offsetX,
        (focusedSectionViewer.clientHeight / 3) - ((currentBuildRowIndex + 0.5) * focusedCellSize)
    );
}

function markSelectedSectionCompleted() {
    if (!selectedSection || !buildModeEnabled) {
        return;
    }

    clampBuildRowIndex();
    if (currentBuildRowIndex !== getBuildRowCount() - 1) {
        return;
    }

    sectionStatuses[selectedSection.label] = 'completed';
    saveSectionProgress();
    regenerateGrid();
}

function getActiveZoomLevel() {
    return activeZoomViewport === 'focused' ? focusedSectionZoomLevel : fullBlueprintZoomLevel;
}

function setActiveZoomViewport(viewport) {
    activeZoomViewport = viewport;
    updateZoomDisplayLabel();
}

function updateZoomDisplayLabel() {
    zoomLevelSpan.textContent = `Zoom: ${Math.round(getActiveZoomLevel() * 100)}%`;
}

function updateZoomDisplay(anchorPoint = null, viewport = 'full') {
    const isFocusedViewport = viewport === 'focused';
    const zoomLevel = isFocusedViewport ? focusedSectionZoomLevel : fullBlueprintZoomLevel;
    const viewerElement = isFocusedViewport ? focusedSectionViewer : blueprintViewer;
    const viewportState = isFocusedViewport ? focusedSectionViewportState : fullBlueprintViewportState;
    const getMetrics = isFocusedViewport ? getFocusedSectionViewportMetrics : getFullBlueprintViewportMetrics;
    const applyOffset = isFocusedViewport ? setFocusedSectionViewportOffset : setFullBlueprintViewportOffset;
    const metricsBeforeZoom = getMetrics();
    const viewerRect = viewerElement.getBoundingClientRect();
    const anchorX = anchorPoint
        ? Math.max(0, Math.min(metricsBeforeZoom.viewportWidth, anchorPoint.clientX - viewerRect.left))
        : (metricsBeforeZoom.viewportWidth / 2);
    const anchorY = anchorPoint
        ? Math.max(0, Math.min(metricsBeforeZoom.viewportHeight, anchorPoint.clientY - viewerRect.top))
        : (metricsBeforeZoom.viewportHeight / 2);
    const centerX = metricsBeforeZoom.scaledWidth
        ? (anchorX - viewportState.offsetX) / metricsBeforeZoom.scaledWidth
        : 0.5;
    const centerY = metricsBeforeZoom.scaledHeight
        ? (anchorY - viewportState.offsetY) / metricsBeforeZoom.scaledHeight
        : 0.5;

    setActiveZoomViewport(viewport);
    if (zoomRefreshFrame) {
        cancelAnimationFrame(zoomRefreshFrame);
    }

    zoomRefreshFrame = requestAnimationFrame(() => {
        zoomRefreshFrame = null;
        regenerateGrid();
        const metricsAfterZoom = getMetrics();
        applyOffset(
            anchorX - (metricsAfterZoom.scaledWidth * centerX),
            anchorY - (metricsAfterZoom.scaledHeight * centerY)
        );
        updatePreviewCanvasScale();
    });
}

function zoomIn() {
    if (activeZoomViewport === 'focused') {
        focusedSectionZoomLevel = Math.min(focusedSectionZoomLevel * 1.5, 20);
        updateZoomDisplay(null, 'focused');
        return;
    }

    fullBlueprintZoomLevel = clampFullBlueprintZoomLevel(fullBlueprintZoomLevel * 1.5);
    updateZoomDisplay(null, 'full');
}

function zoomOut() {
    if (activeZoomViewport === 'focused') {
        focusedSectionZoomLevel = Math.max(focusedSectionZoomLevel / 1.5, 0.05);
        updateZoomDisplay(null, 'focused');
        return;
    }

    fullBlueprintZoomLevel = clampFullBlueprintZoomLevel(fullBlueprintZoomLevel / 1.5);
    updateZoomDisplay(null, 'full');
}

function resetZoom() {
    if (activeZoomViewport === 'focused') {
        focusedSectionZoomLevel = 1;
        updateZoomDisplay(null, 'focused');
        return;
    }

    fullBlueprintZoomLevel = 1;
    updateZoomDisplay(null, 'full');
}

function regenerateBlueprint() {
    if (!currentPixelGrid) {
        return;
    }

    const selectedOption = findSizeOptionByValue(sizeSelector.value);
    if (selectedOption && isBlueprintSizeOptionLocked(selectedOption)) {
        console.warn('[premium] Blocked locked blueprint regeneration.', { size: selectedOption.value });
        showLockedSizePreview(selectedOption);
        return;
    }

    currentBlueprint = buildBlueprintFromGrid(currentPixelGrid);
    focusedLegendInversionBlock = null;
    invalidateBlueprintCaches();
    if (selectedSection) {
        const maxRows = getSectionRowCount();
        const maxCols = getSectionColumnCount();
        if (selectedSection.row >= maxRows || selectedSection.col >= maxCols) {
            selectedSection = null;
        }
    }
    clampBuildRowIndex();

    regenerateGrid();
    updateBlockCounts();
}

function updateBlockCounts() {
    if (!currentBlueprint) {
        updateBlueprintLegend();
        updateProjectInfoBar();
        return;
    }
    updateBlueprintLegend();
    updateProjectInfoBar();
}

function updatePreviewCanvasScale() {
    const scaledWidth = currentImageSource ? currentGridWidth * getFullCellSize() : 320;
    const scaledHeight = currentImageSource ? currentGridHeight * getFullCellSize() : 320;
    pixelCanvas.style.width = `${scaledWidth}px`;
    pixelCanvas.style.height = `${scaledHeight}px`;
}

function syncScrollPosition(source, target) {
    if (!comparisonModeEnabled || !syncComparisonEnabled || comparisonSyncLock) {
        return;
    }

    comparisonSyncLock = true;

    const sourceMaxLeft = Math.max(1, source.scrollWidth - source.clientWidth);
    const sourceMaxTop = Math.max(1, source.scrollHeight - source.clientHeight);
    const targetMaxLeft = Math.max(0, target.scrollWidth - target.clientWidth);
    const targetMaxTop = Math.max(0, target.scrollHeight - target.clientHeight);

    target.scrollLeft = (source.scrollLeft / sourceMaxLeft) * targetMaxLeft;
    target.scrollTop = (source.scrollTop / sourceMaxTop) * targetMaxTop;

    requestAnimationFrame(() => {
        comparisonSyncLock = false;
    });
}

function processImageSource(imageSource, options = {}) {
    const restoreProject = options.restoreProject || null;
    const img = new Image();

    img.onload = () => {
        const isNewPreviewSource = imageSource !== latestUploadedImageSource;
        if (isNewPreviewSource) {
            latestUploadedImageSource = imageSource;
            clearLockedPreviewTeaserCache();
        }

        currentImageOriginalWidth = img.naturalWidth || img.width || currentImageOriginalWidth;
        currentImageOriginalHeight = img.naturalHeight || img.height || currentImageOriginalHeight;
        updateBlueprintSizeOptions(currentImageOriginalWidth, currentImageOriginalHeight, sizeSelector.value);
        const selectedOption = findSizeOptionByValue(sizeSelector.value);
        if (selectedOption && isBlueprintSizeOptionLocked(selectedOption)) {
            console.warn('[premium] Blocked locked blueprint generation during image processing.', { size: selectedOption.value });
            showLockedSizePreview(selectedOption);
            return;
        }
        const { width: gridWidth, height: gridHeight } = parseBlueprintSizeValue(sizeSelector.value);
        const { grid, resizedCanvas } = buildResizedPixelGridFromImageElement(img, gridWidth, gridHeight);

        setCurrentGridDimensions(gridWidth, gridHeight);
        currentPixelGrid = grid;
        currentImageSource = imageSource;
        focusedLegendInversionBlock = null;
        updateAppVisibility();
        selectedBlock = null;
        if (restoreProject) {
            sectionStatuses = { ...(restoreProject.sectionStatuses || {}) };
        } else if (isLocalhostWorkspaceSession()) {
            sectionStatuses = {};
        } else {
            loadSectionProgress();
        }

        pixelCanvas.width = currentGridWidth;
        pixelCanvas.height = currentGridHeight;
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
        ctx.drawImage(resizedCanvas, 0, 0, currentGridWidth, currentGridHeight);
        updatePreviewCanvasScale();

        currentBlueprint = buildBlueprintFromGrid(grid);
        invalidateBlueprintCaches();

        const maxRows = getSectionRowCount();
        const maxCols = getSectionColumnCount();
        if (restoreProject) {
            currentViewMode = 'full';
            buildModeEnabled = false;
            currentBuildRowIndex = restoreProject.currentBuildRowIndex || 0;

            const restoredSection = restoreProject.currentSection;
            if (restoredSection && restoredSection.row < maxRows && restoredSection.col < maxCols) {
                selectedSection = {
                    row: restoredSection.row,
                    col: restoredSection.col,
                    label: getSectionLabel(restoredSection.row, restoredSection.col)
                };
            } else {
                selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
            }
        } else if (!selectedSection || selectedSection.row >= maxRows || selectedSection.col >= maxCols) {
            selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
        } else {
            selectedSection = getSectionByLabel(getSectionLabel(selectedSection.row, selectedSection.col));
        }
        if (!restoreProject) {
            currentBuildRowIndex = 0;
        }

        regenerateGrid();
        updateBlockCounts();
        centerFullBlueprintViewport();
        centerFocusedSectionViewport();
    };

    img.src = imageSource;
}

function processImage(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        processImageSource(event.target.result);
    };
    reader.readAsDataURL(file);
}

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        processImage(file);
    }
});

sizeSelector.addEventListener('change', function () {
    const selectedOption = findSizeOptionByValue(this.value);
    if (selectedOption && isBlueprintSizeOptionLocked(selectedOption)) {
        showLockedSizePreview(selectedOption);
        return;
    }

    const { width, height } = parseBlueprintSizeValue(this.value);
    setCurrentGridDimensions(width, height);
    lastUnlockedSizeValue = this.value;
    if (isLocalhostWorkspaceSession()) {
        sectionStatuses = {};
    } else {
        loadSectionProgress();
    }
    if (currentImageSource) {
        processImageSource(currentImageSource);
    }
});

sectionSizeSelector.addEventListener('change', function () {
    sectionSize = parseInt(this.value, 10);
    if (isLocalhostWorkspaceSession()) {
        sectionStatuses = {};
    } else {
        loadSectionProgress();
    }

    if (selectedSection) {
        const maxRows = getSectionRowCount();
        const maxCols = getSectionColumnCount();
        if (selectedSection.row >= maxRows || selectedSection.col >= maxCols) {
            selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
        } else {
            selectedSection.label = getSectionLabel(selectedSection.row, selectedSection.col);
        }
    }
    currentBuildRowIndex = 0;

    regenerateGrid();
});

document.getElementById('zoomIn').addEventListener('click', zoomIn);
document.getElementById('zoomOut').addEventListener('click', zoomOut);
document.getElementById('resetZoom').addEventListener('click', resetZoom);

syncComparisonCheckbox.addEventListener('change', function () {
    syncComparisonEnabled = this.checked;
    if (comparisonModeEnabled && syncComparisonEnabled) {
        syncComparisonPreviewToFullBlueprint();
    }
});

prevSectionBtn.addEventListener('click', () => focusAdjacentSection(-1));
nextSectionBtn.addEventListener('click', () => focusAdjacentSection(1));
prevRowBtn.addEventListener('click', () => stepBuildRow(-1));
nextRowBtn.addEventListener('click', () => stepBuildRow(1));
completeSectionBtn.addEventListener('click', markSelectedSectionCompleted);
// These listeners only mirror viewer scroll state, so they can stay passive.
comparisonPreviewViewer.addEventListener('scroll', () => {
    if (!comparisonModeEnabled || !syncComparisonEnabled || comparisonSyncLock) {
        return;
    }

    const metrics = getFullBlueprintViewportMetrics();
    const previewMaxLeft = Math.max(0, comparisonPreviewViewer.scrollWidth - comparisonPreviewViewer.clientWidth);
    const previewMaxTop = Math.max(0, comparisonPreviewViewer.scrollHeight - comparisonPreviewViewer.clientHeight);
    const horizontalProgress = previewMaxLeft ? (comparisonPreviewViewer.scrollLeft / previewMaxLeft) : 0;
    const verticalProgress = previewMaxTop ? (comparisonPreviewViewer.scrollTop / previewMaxTop) : 0;
    const horizontalRange = Math.max(0, metrics.scaledWidth - metrics.viewportWidth);
    const verticalRange = Math.max(0, metrics.scaledHeight - metrics.viewportHeight);

    comparisonSyncLock = true;
    setFullBlueprintViewportOffset(
        -(horizontalProgress * horizontalRange),
        -(verticalProgress * verticalRange),
        { syncComparison: false }
    );
    requestAnimationFrame(() => {
        comparisonSyncLock = false;
    });
}, { passive: true });
blueprintViewer.addEventListener('mousedown', beginFullBlueprintPan);
blueprintViewer.addEventListener('mouseenter', () => setActiveZoomViewport('full'));
blueprintViewer.addEventListener('mousemove', handleFullBlueprintHover);
blueprintViewer.addEventListener('mouseleave', handleFullBlueprintLeave);
blueprintViewer.addEventListener('click', handleFullBlueprintClick);
blueprintViewer.addEventListener('wheel', handleFullBlueprintWheelZoom, { passive: false });
blueprintViewer.addEventListener('contextmenu', (event) => {
    if (isRenderedFullBlueprintTarget(event.target)) {
        event.preventDefault();
    }
});
focusedSectionViewer.addEventListener('mousedown', beginFocusedSectionPan);
focusedSectionViewer.addEventListener('mouseenter', () => setActiveZoomViewport('focused'));
focusedSectionViewer.addEventListener('mousemove', handleFocusedSectionHover);
focusedSectionViewer.addEventListener('mouseleave', handleFocusedSectionLeave);
focusedSectionViewer.addEventListener('wheel', handleFocusedSectionWheelZoom, { passive: false });
focusedSectionViewer.addEventListener('contextmenu', (event) => {
    if (isRenderedFocusedSectionTarget(event.target)) {
        event.preventDefault();
    }
});
window.addEventListener('mousemove', updateFullBlueprintPan);
window.addEventListener('mousemove', updateFocusedSectionPan);
window.addEventListener('mouseup', endFullBlueprintPan);
window.addEventListener('mouseup', endFocusedSectionPan);
window.addEventListener('blur', endFullBlueprintPan);
window.addEventListener('blur', endFocusedSectionPan);
window.addEventListener('blur', handleFullBlueprintLeave);
window.addEventListener('blur', handleFocusedSectionLeave);
window.addEventListener('resize', syncFocusedSectionCardHeight);
window.addEventListener('pageshow', (event) => {
    if (event.persisted && isLocalhostWorkspaceSession()) {
        resetWorkspaceState();
        forceLocalhostIntroState();
    }
});

blueprintLegendInfo.addEventListener('click', (event) => {
    const legendRow = event.target.closest('.legend-row[data-block]');
    if (!legendRow || !blueprintLegendInfo.contains(legendRow)) {
        return;
    }

    const blockName = legendRow.dataset.block;
    focusedLegendInversionBlock = focusedLegendInversionBlock === blockName ? null : blockName;
    updateBlueprintLegend();
    renderFocusedSection();
    updateHighlight();
});

if (upgradeModal) {
    upgradeModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.hasAttribute('data-close-upgrade-modal')) {
            closeUpgradeModal();
        }
    });
}

if (upgradeModalCloseBtn) {
    upgradeModalCloseBtn.addEventListener('click', closeUpgradeModal);
}

if (authModal) {
    authModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.hasAttribute('data-close-auth-modal')) {
            setAuthModalOpen(false);
        }
    });
}

if (authModalCloseBtn) {
    authModalCloseBtn.addEventListener('click', () => setAuthModalOpen(false));
}

authViewTriggerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const nextView = button.dataset.authViewTrigger || 'login';
        setAuthModalView(nextView);
    });
});

if (authFooterForgotBtn) {
    authFooterForgotBtn.addEventListener('click', () => setAuthModalView('forgot'));
}

if (authFooterBackBtn) {
    authFooterBackBtn.addEventListener('click', () => setAuthModalView('login'));
}

if (openCreateAccountBtn) {
    openCreateAccountBtn.addEventListener('click', () => setAuthModalView('register'));
}

if (openLoginBtn) {
    openLoginBtn.addEventListener('click', () => setAuthModalView('login'));
}

if (openAccountBtn) {
    openAccountBtn.addEventListener('click', () => setAuthModalView('account'));
}

if (openPremiumBtn) {
    openPremiumBtn.addEventListener('click', () => {
        openUpgradeModal();
    });
}

if (openXlPreviewBtn) {
    openXlPreviewBtn.addEventListener('click', () => {
        openUpgradeModal(getPremiumPreviewOptionByLongSide(128));
    });
}

if (openMegaPreviewBtn) {
    openMegaPreviewBtn.addEventListener('click', () => {
        openUpgradeModal(getPremiumPreviewOptionByLongSide(256));
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        void logoutCurrentAccount();
    });
}

if (openResetPasswordFromAccountBtn) {
    openResetPasswordFromAccountBtn.addEventListener('click', () => {
        if (accountState.user?.email && forgotPasswordEmail) {
            forgotPasswordEmail.value = accountState.user.email;
        }
        setAuthModalView('forgot');
    });
}

if (profileImageInput) {
    const openProfileImagePicker = () => {
        clearAuthViewFeedback('account');
        profileImageInput.value = '';
        profileImageInput.click();
    };

    if (authProfilePickerBtn) {
        authProfilePickerBtn.addEventListener('click', openProfileImagePicker);
    }

    if (changeProfileImageBtn) {
        changeProfileImageBtn.addEventListener('click', openProfileImagePicker);
    }

    profileImageInput.addEventListener('change', () => {
        const selectedFile = profileImageInput.files?.[0];
        if (!selectedFile) {
            return;
        }
        void handleProfileImageSelection(selectedFile);
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        void submitRegisterForm(event);
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        void submitLoginForm(event);
    });
}

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', (event) => {
        void submitForgotPasswordForm(event);
    });
}

if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', (event) => {
        void submitResetPasswordForm(event);
    });
}

[registerEmail, registerPassword, registerConfirmPassword, loginEmail, loginPassword, forgotPasswordEmail, resetPasswordInput].forEach((input) => {
    if (!(input instanceof HTMLElement)) {
        return;
    }

    input.addEventListener('input', () => clearAuthFeedbackForInput(input));
});

if (unlockCurrentBlueprintBtn) {
    console.info('[billing] Monthly premium button handler attached.');
    unlockCurrentBlueprintBtn.addEventListener('click', (event) => {
        event.preventDefault();
        setUpgradeModalStatus('');
        console.info('[billing] Monthly premium button clicked.', {
            buttonId: unlockCurrentBlueprintBtn.id,
            requestUrl: getCheckoutApiUrl()
        });
        startCheckout('monthly_subscription');
    });
} else {
    console.warn('[billing] Monthly premium button was not found in the DOM.');
}

if (unlockLifetimeBtn) {
    console.info('[billing] Lifetime premium button handler attached.');
    unlockLifetimeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        setUpgradeModalStatus('');
        console.info('[billing] Lifetime premium button clicked.', {
            buttonId: unlockLifetimeBtn.id,
            requestUrl: getCheckoutApiUrl()
        });
        startCheckout('lifetime_unlock');
    });
} else {
    console.warn('[billing] Lifetime premium button was not found in the DOM.');
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && authModal && !authModal.hidden) {
        setAuthModalOpen(false);
    }
    if (event.key === 'Escape' && upgradeModal && !upgradeModal.hidden) {
        closeUpgradeModal();
    }
});

updateCurrentSectionUI();
updateViewModeUI();
updateBlueprintSizeOptions(1, 1, sizeSelector.value);
updatePreviewCanvasScale();
updateZoomDisplayLabel();
handleInitialWorkspaceState();
updateAccountUi();

async function initializeAccountSession() {
    await refreshAuthenticatedUser();
    await verifyCheckoutReturn();
    hydrateResetTokenFromUrl();
}

void initializeAccountSession();

chatLauncher.addEventListener('click', () => setChatWidgetOpen(true));
chatCloseBtn.addEventListener('click', () => {
    setChatWidgetOpen(false);
    chatLauncher.focus();
});
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendChatMessage();
});
chatInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.shiftKey) {
        return;
    }

    event.preventDefault();
    sendChatMessage();
});
