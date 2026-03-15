const imageUpload = document.getElementById('imageUpload');
const pixelCanvas = document.getElementById('pixelCanvas');
const ctx = pixelCanvas.getContext('2d');
const welcomeState = document.getElementById('welcomeState');
const appWorkspace = document.getElementById('appWorkspace');
const sizeSelector = document.getElementById('sizeSelector');
const viewSelector = document.getElementById('viewSelector');
const paletteSelector = document.getElementById('paletteSelector');
const conversionModeSelector = document.getElementById('conversionModeSelector');
const sectionSizeSelector = document.getElementById('sectionSizeSelector');
const comparisonModeBtn = document.getElementById('comparisonModeBtn');
const comparisonPreviewViewer = document.getElementById('comparisonPreviewViewer');
const syncComparisonCheckbox = document.getElementById('syncComparisonCheckbox');
const projectNameInput = document.getElementById('projectNameInput');
const saveProjectBtn = document.getElementById('saveProjectBtn');
const loadProjectSelect = document.getElementById('loadProjectSelect');
const loadProjectBtn = document.getElementById('loadProjectBtn');
const deleteProjectBtn = document.getElementById('deleteProjectBtn');
const projectMessage = document.getElementById('projectMessage');
const savedProjectsList = document.getElementById('savedProjectsList');
const templateCards = document.querySelectorAll('.template-card');
const brightnessSlider = document.getElementById('brightnessSlider');
const contrastSlider = document.getElementById('contrastSlider');
const saturationSlider = document.getElementById('saturationSlider');
const brightnessValue = document.getElementById('brightnessValue');
const contrastValue = document.getElementById('contrastValue');
const saturationValue = document.getElementById('saturationValue');
const resetAdjustmentsBtn = document.getElementById('resetAdjustmentsBtn');
const detailLevelSlider = document.getElementById('detailLevelSlider');
const noiseReductionSlider = document.getElementById('noiseReductionSlider');
const edgeStrengthSlider = document.getElementById('edgeStrengthSlider');
const detailLevelValue = document.getElementById('detailLevelValue');
const noiseReductionValue = document.getElementById('noiseReductionValue');
const edgeStrengthValue = document.getElementById('edgeStrengthValue');
const resetSimplificationBtn = document.getElementById('resetSimplificationBtn');
const blueprintGridDiv = document.getElementById('blueprintGrid');
const focusedSectionGridDiv = document.getElementById('focusedSectionGrid');
const blueprintViewer = document.getElementById('blueprintViewer');
const focusedSectionViewer = document.getElementById('focusedSectionViewer');
const statusDiv = document.getElementById('status');
const zoomLevelSpan = document.getElementById('zoomLevel');
const tooltip = document.getElementById('tooltip');
const selectedBlockInfo = document.getElementById('selectedBlockInfo');
const sectionMapInfo = document.getElementById('sectionMapInfo');
const sectionMaterialsInfo = document.getElementById('sectionMaterialsInfo');
const sectionsPanel = document.getElementById('sectionsPanel');
const focusedSectionLabel = document.getElementById('focusedSectionLabel');
const focusedSectionSize = document.getElementById('focusedSectionSize');
const focusedSectionStatus = document.getElementById('focusedSectionStatus');
const currentSectionBadge = document.getElementById('currentSectionBadge');
const fullViewBtn = document.getElementById('fullViewBtn');
const focusedViewBtn = document.getElementById('focusedViewBtn');
const buildModeBtn = document.getElementById('buildModeBtn');
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

ctx.imageSmoothingEnabled = false;

let currentBlueprint = null;
let currentPixelGrid = null;
let currentGridSize = parseInt(sizeSelector.value, 10);
let currentPalette = 'all';
let currentConversionMode = 'best-match';
let zoomLevel = 1;
let selectedBlock = null;
let sectionSize = parseInt(sectionSizeSelector.value, 10);
let sectionStatuses = {};
let selectedSection = null;
let currentViewMode = 'full';
let currentImageSource = null;
let buildModeEnabled = false;
let currentBuildRowIndex = 0;
let comparisonModeEnabled = false;
let syncComparisonEnabled = false;
let imageAdjustments = {
    brightness: 100,
    contrast: 100,
    saturation: 100
};
let imageSimplification = {
    detailLevel: 50,
    noiseReduction: 25,
    edgeStrength: 50
};
const PROJECTS_STORAGE_KEY = 'minecraft-blueprint-projects-v1';
let comparisonSyncLock = false;

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
];

function getAllowedBlocks(palette) {
    if (palette === 'all') {
        return minecraftBlocks;
    }

    if (palette === 'survival') {
        return minecraftBlocks.filter((block) => block.survivalFriendly);
    }

    return minecraftBlocks.filter((block) => block.category === palette);
}

function getPixelLuminance(r, g, b) {
    return (0.299 * r) + (0.587 * g) + (0.114 * b);
}

function adjustPixelForConversion(pixel, grid = currentPixelGrid) {
    let red = pixel.r;
    let green = pixel.g;
    let blue = pixel.b;

    if (currentConversionMode === 'best-match') {
        return { r: red, g: green, b: blue };
    }

    if (currentConversionMode === 'high-contrast') {
        red = clampColorChannel(((red - 128) * 1.25) + 128);
        green = clampColorChannel(((green - 128) * 1.25) + 128);
        blue = clampColorChannel(((blue - 128) * 1.25) + 128);
        return { r: red, g: green, b: blue };
    }

    if (currentConversionMode === 'portrait-mode') {
        const luminance = getPixelLuminance(red, green, blue);
        const warmBias = red > blue && red > 70 && Math.abs(red - green) < 90;
        if (warmBias) {
            red = clampColorChannel((red * 1.06) + 8);
            green = clampColorChannel((green * 1.01) + 2);
            blue = clampColorChannel(blue * 0.94);
        }
        const contrastBoost = luminance > 92 && luminance < 210 ? 1.12 : 1.04;
        red = clampColorChannel(((red - 128) * contrastBoost) + 128);
        green = clampColorChannel(((green - 128) * contrastBoost) + 128);
        blue = clampColorChannel(((blue - 128) * contrastBoost) + 128);
        return { r: red, g: green, b: blue };
    }

    if (!grid) {
        return { r: red, g: green, b: blue };
    }

    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    let samples = 0;

    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        const sampleRow = grid[pixel.y + offsetY];
        if (!sampleRow) {
            continue;
        }
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            const sample = sampleRow[pixel.x + offsetX];
            if (!sample) {
                continue;
            }
            totalR += sample.r;
            totalG += sample.g;
            totalB += sample.b;
            samples += 1;
        }
    }

    const averageR = totalR / samples;
    const averageG = totalG / samples;
    const averageB = totalB / samples;

    if (currentConversionMode === 'clean-build') {
        return {
            r: Math.round((red * 0.35) + (averageR * 0.65)),
            g: Math.round((green * 0.35) + (averageG * 0.65)),
            b: Math.round((blue * 0.35) + (averageB * 0.65))
        };
    }

    if (currentConversionMode === 'survival-friendly') {
        return {
            r: Math.round((red * 0.45) + (averageR * 0.55)),
            g: Math.round((green * 0.45) + (averageG * 0.55)),
            b: Math.round((blue * 0.45) + (averageB * 0.55))
        };
    }

    return { r: red, g: green, b: blue };
}

function getBlockModePenalty(block, adjustedPixel, rawPixel) {
    if (currentConversionMode === 'best-match') {
        return 0;
    }

    const luminance = getPixelLuminance(adjustedPixel.r, adjustedPixel.g, adjustedPixel.b);
    const blockLuminance = getPixelLuminance(block.r, block.g, block.b);

    if (currentConversionMode === 'clean-build') {
        const neutralPenalty = Math.abs(block.r - block.g) + Math.abs(block.g - block.b);
        return (neutralPenalty / 40) + (block.category === 'terracotta' ? 5 : 0);
    }

    if (currentConversionMode === 'survival-friendly') {
        const categoryPenaltyMap = {
            concrete: 0,
            wool: 4,
            terracotta: 10
        };
        return (categoryPenaltyMap[block.category] || 6) + (block.survivalFriendly ? 0 : 18);
    }

    if (currentConversionMode === 'high-contrast') {
        return Math.abs(luminance - blockLuminance) * 0.14;
    }

    if (currentConversionMode === 'portrait-mode') {
        const warmPixel = rawPixel.r > rawPixel.b && rawPixel.r > 70;
        const warmBlock = block.r > block.b && block.r > 70;
        const warmPenalty = warmPixel === warmBlock ? 0 : 18;
        return warmPenalty + (Math.abs(rawPixel.r - block.r) * 0.02);
    }

    return 0;
}

function getClosestBlockForPixel(pixel, allowedBlocks, grid = currentPixelGrid) {
    const adjustedPixel = adjustPixelForConversion(pixel, grid);
    let closestBlock = allowedBlocks[0];
    let minScore = Infinity;

    for (const block of allowedBlocks) {
        const colorDistance = Math.sqrt(
            Math.pow(adjustedPixel.r - block.r, 2) +
            Math.pow(adjustedPixel.g - block.g, 2) +
            Math.pow(adjustedPixel.b - block.b, 2)
        );
        const score = colorDistance + getBlockModePenalty(block, adjustedPixel, pixel);

        if (score < minScore) {
            minScore = score;
            closestBlock = block;
        }
    }

    return closestBlock;
}

function buildBlueprintFromGrid(grid, gridSize) {
    const allowedBlocks = getAllowedBlocks(currentPalette);
    const blueprint = [];

    for (let y = 0; y < gridSize; y++) {
        const row = [];
        for (let x = 0; x < gridSize; x++) {
            const pixel = grid[y][x];
            const block = getClosestBlockForPixel(pixel, allowedBlocks, grid);
            row.push({ x, y, block: block.name });
        }
        blueprint.push(row);
    }

    return blueprint;
}

function getSectionKey() {
    return `section-progress-${currentGridSize}-${sectionSize}`;
}

function saveSectionProgress() {
    localStorage.setItem(getSectionKey(), JSON.stringify(sectionStatuses));
}

function loadSectionProgress() {
    const saved = localStorage.getItem(getSectionKey());
    sectionStatuses = saved ? JSON.parse(saved) : {};
}

function getSectionCountPerAxis() {
    return Math.ceil(currentGridSize / sectionSize);
}

function getSectionLabel(row, col) {
    return `${String.fromCharCode(65 + row)}${col + 1}`;
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

function getSectionByLabel(label) {
    if (!label) {
        return null;
    }

    const row = label.charCodeAt(0) - 65;
    const col = parseInt(label.slice(1), 10) - 1;
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

function getCurrentSectionSpan() {
    return document.getElementById('currentSection');
}

function updateAppVisibility() {
    const hasProjectImage = !!currentImageSource;
    welcomeState.style.display = hasProjectImage ? 'none' : 'grid';
    appWorkspace.style.display = hasProjectImage ? 'grid' : 'none';
}

function setProjectMessage(message, type = '') {
    projectMessage.textContent = message;
    projectMessage.className = `project-message${type ? ` ${type}` : ''}`;
}

function getStoredProjects() {
    try {
        const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Unable to read saved projects:', error);
        return {};
    }
}

function setStoredProjects(projects) {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

function updateProjectListUI(selectedName = loadProjectSelect.value) {
    const projects = getStoredProjects();
    const projectNames = Object.keys(projects).sort((a, b) => a.localeCompare(b));

    loadProjectSelect.innerHTML = '<option value="">Select a project</option>';
    projectNames.forEach((name) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        loadProjectSelect.appendChild(option);
    });

    if (selectedName && projects[selectedName]) {
        loadProjectSelect.value = selectedName;
    }

    if (projectNames.length === 0) {
        savedProjectsList.innerHTML = '';
        if (!projectMessage.textContent || projectMessage.textContent === 'No saved projects yet.') {
            setProjectMessage('No saved projects yet.');
        }
        return;
    }

    savedProjectsList.innerHTML = projectNames.map((name) => {
        const isActive = selectedName === name ? ' active' : '';
        return `<button class="saved-project-chip${isActive}" data-project-name="${name}" type="button">${name}</button>`;
    }).join('');

    savedProjectsList.querySelectorAll('.saved-project-chip').forEach((button) => {
        button.addEventListener('click', () => {
            const projectName = button.dataset.projectName;
            loadProjectSelect.value = projectName;
            projectNameInput.value = projectName;
            updateProjectListUI(projectName);
            setProjectMessage(`Selected project "${projectName}".`);
        });
    });
}

function getCurrentProjectPayload(projectName) {
    return {
        name: projectName,
        savedAt: new Date().toISOString(),
        imageSource: currentImageSource,
        blueprintSize: parseInt(sizeSelector.value, 10),
        palette: currentPalette,
        conversionMode: currentConversionMode,
        viewSelector: viewSelector.value,
        currentViewMode,
        comparisonModeEnabled,
        syncComparisonEnabled,
        zoomLevel,
        imageAdjustments: { ...imageAdjustments },
        imageSimplification: { ...imageSimplification },
        sectionSize,
        currentSection: selectedSection ? { ...selectedSection } : null,
        sectionStatuses: { ...sectionStatuses },
        buildModeEnabled,
        currentBuildRowIndex
    };
}

function saveCurrentProject() {
    const projectName = projectNameInput.value.trim();
    if (!projectName) {
        setProjectMessage('Enter a project name before saving.', 'error');
        return;
    }

    if (!currentImageSource) {
        setProjectMessage('Upload an image before saving a project.', 'error');
        return;
    }

    const projects = getStoredProjects();
    const alreadyExists = !!projects[projectName];
    projects[projectName] = getCurrentProjectPayload(projectName);

    try {
        setStoredProjects(projects);
        updateProjectListUI(projectName);
        loadProjectSelect.value = projectName;
        setProjectMessage(alreadyExists ? `Project "${projectName}" updated.` : `Project "${projectName}" saved.`, 'success');
    } catch (error) {
        console.error('Unable to save project:', error);
        setProjectMessage('Unable to save project. Local storage may be full.', 'error');
    }
}

function loadSavedProject() {
    const projectName = loadProjectSelect.value;
    if (!projectName) {
        setProjectMessage('Select a project to load.', 'error');
        return;
    }

    const projects = getStoredProjects();
    const project = projects[projectName];
    if (!project) {
        setProjectMessage('Selected project could not be found.', 'error');
        updateProjectListUI();
        return;
    }

    projectNameInput.value = project.name;
    sizeSelector.value = String(project.blueprintSize || 32);
    currentPalette = project.palette || 'all';
    paletteSelector.value = currentPalette;
    currentConversionMode = project.conversionMode || 'best-match';
    conversionModeSelector.value = currentConversionMode;
    viewSelector.value = project.viewSelector || 'color';
    sectionSize = project.sectionSize || 16;
    sectionSizeSelector.value = String(sectionSize);
    currentViewMode = project.currentViewMode || 'full';
    comparisonModeEnabled = !!project.comparisonModeEnabled;
    syncComparisonEnabled = !!project.syncComparisonEnabled;
    zoomLevel = project.zoomLevel || 1;
    zoomLevelSpan.textContent = `Zoom: ${Math.round(zoomLevel * 100)}%`;
    imageAdjustments = {
        brightness: project.imageAdjustments?.brightness ?? 100,
        contrast: project.imageAdjustments?.contrast ?? 100,
        saturation: project.imageAdjustments?.saturation ?? 100
    };
    imageSimplification = {
        detailLevel: project.imageSimplification?.detailLevel ?? 50,
        noiseReduction: project.imageSimplification?.noiseReduction ?? 25,
        edgeStrength: project.imageSimplification?.edgeStrength ?? 50
    };
    brightnessSlider.value = String(imageAdjustments.brightness);
    contrastSlider.value = String(imageAdjustments.contrast);
    saturationSlider.value = String(imageAdjustments.saturation);
    detailLevelSlider.value = String(imageSimplification.detailLevel);
    noiseReductionSlider.value = String(imageSimplification.noiseReduction);
    edgeStrengthSlider.value = String(imageSimplification.edgeStrength);
    syncComparisonCheckbox.checked = syncComparisonEnabled;
    updateAdjustmentLabels();
    updateSimplificationLabels();

    if (!project.imageSource) {
        setProjectMessage(`Project "${projectName}" is missing image data and cannot be loaded fully.`, 'error');
        return;
    }

    processImageSource(project.imageSource, { restoreProject: project });
    updateProjectListUI(projectName);
    setProjectMessage(`Project "${projectName}" loaded.`, 'success');
}

function deleteSavedProject() {
    const projectName = loadProjectSelect.value || projectNameInput.value.trim();
    if (!projectName) {
        setProjectMessage('Select a project to delete.', 'error');
        return;
    }

    const projects = getStoredProjects();
    if (!projects[projectName]) {
        setProjectMessage('Selected project could not be found.', 'error');
        updateProjectListUI();
        return;
    }

    delete projects[projectName];

    try {
        setStoredProjects(projects);
        if (loadProjectSelect.value === projectName) {
            loadProjectSelect.value = '';
        }
        if (projectNameInput.value.trim() === projectName) {
            projectNameInput.value = '';
        }
        updateProjectListUI();
        setProjectMessage(`Project "${projectName}" deleted.`, 'success');
    } catch (error) {
        console.error('Unable to delete project:', error);
        setProjectMessage('Unable to delete project.', 'error');
    }
}

function loadTemplate(templateName, templateSource) {
    if (!templateSource) {
        setProjectMessage('Template could not be loaded.', 'error');
        return;
    }

    projectNameInput.value = templateName;
    processImageSource(templateSource);
    setProjectMessage(`Template "${templateName}" loaded.`, 'success');
}

function clampColorChannel(value) {
    return Math.max(0, Math.min(255, value));
}

function updateAdjustmentLabels() {
    brightnessValue.textContent = `${imageAdjustments.brightness}%`;
    contrastValue.textContent = `${imageAdjustments.contrast}%`;
    saturationValue.textContent = `${imageAdjustments.saturation}%`;
}

function describeLevel(value) {
    if (value <= 33) {
        return 'Low';
    }

    if (value >= 67) {
        return 'High';
    }

    return 'Medium';
}

function updateSimplificationLabels() {
    detailLevelValue.textContent = describeLevel(imageSimplification.detailLevel);
    noiseReductionValue.textContent = describeLevel(imageSimplification.noiseReduction);
    edgeStrengthValue.textContent = describeLevel(imageSimplification.edgeStrength);
}

function createImageDataCopy(imageData) {
    return new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
}

function createBoxBlurredData(imageData, radius) {
    if (radius <= 0) {
        return createImageDataCopy(imageData);
    }

    const { width, height, data } = imageData;
    const output = new Uint8ClampedArray(data.length);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let red = 0;
            let green = 0;
            let blue = 0;
            let alpha = 0;
            let samples = 0;

            for (let offsetY = -radius; offsetY <= radius; offsetY++) {
                const sampleY = Math.min(height - 1, Math.max(0, y + offsetY));
                for (let offsetX = -radius; offsetX <= radius; offsetX++) {
                    const sampleX = Math.min(width - 1, Math.max(0, x + offsetX));
                    const sampleIndex = ((sampleY * width) + sampleX) * 4;
                    red += data[sampleIndex];
                    green += data[sampleIndex + 1];
                    blue += data[sampleIndex + 2];
                    alpha += data[sampleIndex + 3];
                    samples += 1;
                }
            }

            const index = ((y * width) + x) * 4;
            output[index] = Math.round(red / samples);
            output[index + 1] = Math.round(green / samples);
            output[index + 2] = Math.round(blue / samples);
            output[index + 3] = Math.round(alpha / samples);
        }
    }

    return new ImageData(output, width, height);
}

function applySimplificationToData(imageData) {
    const noiseAmount = imageSimplification.noiseReduction / 100;
    const detailPreservation = imageSimplification.detailLevel / 100;
    const edgeAmount = imageSimplification.edgeStrength / 100;
    const blurRadius = Math.max(1, Math.round((noiseAmount * 2) + ((1 - detailPreservation) * 2)));

    if (noiseAmount === 0 && detailPreservation === 1 && edgeAmount === 0.5) {
        return imageData;
    }

    const original = createImageDataCopy(imageData);
    const blurred = createBoxBlurredData(imageData, blurRadius);
    const output = new Uint8ClampedArray(imageData.data.length);
    const simplificationBlend = Math.min(0.9, (noiseAmount * 0.65) + ((1 - detailPreservation) * 0.55));
    const edgeBoost = edgeAmount * 0.85;

    for (let index = 0; index < output.length; index += 4) {
        for (let channel = 0; channel < 3; channel++) {
            const originalValue = original.data[index + channel];
            const blurredValue = blurred.data[index + channel];
            const simplifiedValue = originalValue + ((blurredValue - originalValue) * simplificationBlend);
            const edgeValue = originalValue - blurredValue;
            output[index + channel] = clampColorChannel(simplifiedValue + (edgeValue * edgeBoost));
        }

        output[index + 3] = original.data[index + 3];
    }

    return new ImageData(output, imageData.width, imageData.height);
}

function applyImageAdjustmentsToData(imageData) {
    const data = imageData.data;
    const brightnessShift = ((imageAdjustments.brightness - 100) / 100) * 255;
    const contrastFactor = imageAdjustments.contrast / 100;
    const saturationFactor = imageAdjustments.saturation / 100;

    for (let index = 0; index < data.length; index += 4) {
        let red = data[index];
        let green = data[index + 1];
        let blue = data[index + 2];

        red = clampColorChannel(red + brightnessShift);
        green = clampColorChannel(green + brightnessShift);
        blue = clampColorChannel(blue + brightnessShift);

        red = clampColorChannel(((red - 128) * contrastFactor) + 128);
        green = clampColorChannel(((green - 128) * contrastFactor) + 128);
        blue = clampColorChannel(((blue - 128) * contrastFactor) + 128);

        const luminance = (0.299 * red) + (0.587 * green) + (0.114 * blue);
        red = clampColorChannel(luminance + ((red - luminance) * saturationFactor));
        green = clampColorChannel(luminance + ((green - luminance) * saturationFactor));
        blue = clampColorChannel(luminance + ((blue - luminance) * saturationFactor));

        data[index] = red;
        data[index + 1] = green;
        data[index + 2] = blue;
    }

    return imageData;
}

function regenerateFromAdjustments() {
    updateAdjustmentLabels();
    updateSimplificationLabels();
    if (currentImageSource) {
        processImageSource(currentImageSource);
    }
}

function updateViewModeUI() {
    const focusedMode = currentViewMode === 'focused';
    document.body.classList.toggle('focused-mode', focusedMode);
    document.body.classList.toggle('build-mode-enabled', buildModeEnabled);
    document.body.classList.toggle('comparison-mode-enabled', comparisonModeEnabled);
    fullViewBtn.classList.toggle('active', !focusedMode);
    focusedViewBtn.classList.toggle('active', focusedMode);
    buildModeBtn.classList.toggle('active', buildModeEnabled);
    comparisonModeBtn.classList.toggle('active', comparisonModeEnabled);
    fullBlueprintCard.classList.toggle('emphasized', !focusedMode);
    fullBlueprintCard.classList.toggle('deemphasized', focusedMode);
    focusedSectionCard.classList.toggle('emphasized', focusedMode);
    focusedSectionCard.classList.toggle('deemphasized', !focusedMode && !!selectedSection);
    syncComparisonCheckbox.disabled = !comparisonModeEnabled;
}

function updateSelectedBlockPanel() {
    if (!selectedBlock) {
        selectedBlockInfo.innerHTML = 'Click a block to inspect it.';
        return;
    }

    const block = minecraftBlocks.find((item) => item.name === selectedBlock.block);
    const color = block ? `rgb(${block.r}, ${block.g}, ${block.b})` : '#000';
    const sectionText = selectedBlock.sectionLabel ? `<div>Section: ${selectedBlock.sectionLabel}</div>` : '';

    selectedBlockInfo.innerHTML = `
        <div>Block: ${selectedBlock.block}</div>
        <div>X: ${selectedBlock.x}</div>
        <div>Y: ${selectedBlock.y}</div>
        ${sectionText}
        <div class="selected-block-color" style="background-color: ${color};"></div>
    `;
}

function getSelectedSectionBounds() {
    if (!selectedSection) {
        return null;
    }

    const startX = selectedSection.col * sectionSize;
    const startY = selectedSection.row * sectionSize;
    const endX = Math.min(startX + sectionSize, currentGridSize);
    const endY = Math.min(startY + sectionSize, currentGridSize);

    return {
        startX,
        startY,
        endX,
        endY,
        width: endX - startX,
        height: endY - startY
    };
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

function getSectionMaterialCounts() {
    if (!currentBlueprint || !selectedSection) {
        return [];
    }

    const bounds = getSelectedSectionBounds();
    const counts = {};

    for (let y = bounds.startY; y < bounds.endY; y++) {
        for (let x = bounds.startX; x < bounds.endX; x++) {
            const blockName = currentBlueprint[y][x].block;
            counts[blockName] = (counts[blockName] || 0) + 1;
        }
    }

    return Object.entries(counts).sort((a, b) => {
        if (b[1] !== a[1]) {
            return b[1] - a[1];
        }

        return a[0].localeCompare(b[0]);
    });
}

function updateSectionMaterialsPanel() {
    if (!currentBlueprint || !selectedSection) {
        sectionMaterialsInfo.innerHTML = 'Select a section to see its materials list.';
        return;
    }

    const materials = getSectionMaterialCounts();
    const sectionHeader = `Section ${selectedSection.label} Materials`;

    if (materials.length === 0) {
        sectionMaterialsInfo.innerHTML = `
            <div class="section-materials-header">${sectionHeader}</div>
            <p>No blocks found for this section.</p>
        `;
        return;
    }

    const items = materials.map(([block, count]) => `
        <div class="section-material-row">
            <div class="section-material-name">${block}</div>
            <div class="section-material-count">${count}</div>
        </div>
    `).join('');

    sectionMaterialsInfo.innerHTML = `
        <div class="section-materials-header">${sectionHeader}</div>
        <div class="section-materials-list">${items}</div>
    `;
}

function updateSectionMap() {
    if (!currentBlueprint) {
        sectionMapInfo.innerHTML = 'Upload an image to generate the section map.';
        return;
    }

    const cols = getSectionCountPerAxis();
    const rows = getSectionCountPerAxis();
    const cells = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const label = getSectionLabel(row, col);
            const status = getSectionStatus(label);
            const isActive = selectedSection && selectedSection.label === label ? ' active' : '';
            cells.push(
                `<button class="section-map-cell ${status}${isActive}" data-row="${row}" data-col="${col}" data-label="${label}" type="button">${label}</button>`
            );
        }
    }

    sectionMapInfo.innerHTML = `
        <div class="section-materials-header">Click a section to jump to it</div>
        <div class="section-map-grid" style="grid-template-columns: repeat(${cols}, minmax(0, 1fr));">
            ${cells.join('')}
        </div>
    `;

    sectionMapInfo.querySelectorAll('.section-map-cell').forEach((button) => {
        button.addEventListener('click', () => {
            selectSection(parseInt(button.dataset.row, 10), parseInt(button.dataset.col, 10));
        });
    });
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
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);
    const block = cell.dataset.block;
    const sectionLabel = cell.dataset.section;
    tooltip.textContent = `Block: ${block}\nX: ${x}\nY: ${y}\nSection: ${sectionLabel}`;
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
    tooltip.style.display = 'block';
}

function hideTooltip() {
    tooltip.style.display = 'none';
}

function updateCurrentSectionUI() {
    const currentSectionSpan = getCurrentSectionSpan();

    if (!selectedSection) {
        if (currentSectionSpan) {
            currentSectionSpan.textContent = 'None';
        }
        currentSectionBadge.textContent = 'Selected Section: None';
        focusedSectionLabel.textContent = 'No section selected';
        focusedSectionSize.textContent = 'Section size: --';
        focusedSectionStatus.textContent = 'Status: --';
        prevSectionBtn.disabled = true;
        nextSectionBtn.disabled = true;
        updateSectionMaterialsPanel();
        updateSectionMap();
        updateBuildModePanel();
        return;
    }

    const { label } = selectedSection;
    const bounds = getSelectedSectionBounds();
    const status = getSectionStatus(label);

    if (currentSectionSpan) {
        currentSectionSpan.textContent = label;
    }
    currentSectionBadge.textContent = `Selected Section: ${label}`;
    focusedSectionLabel.textContent = `Current Section: ${label}`;
    focusedSectionSize.textContent = `Section size: ${bounds.width} x ${bounds.height}`;
    focusedSectionStatus.textContent = `Status: ${getStatusDisplay(status)}`;
    prevSectionBtn.disabled = false;
    nextSectionBtn.disabled = false;
    updateSectionMaterialsPanel();
    updateSectionMap();
    updateBuildModePanel();
}

function updateHighlight() {
    document.querySelectorAll('.grid-cell.selected-cell').forEach((cell) => {
        cell.classList.remove('selected-cell');
    });

    if (!selectedBlock) {
        return;
    }

    const selector = `[data-x="${selectedBlock.x}"][data-y="${selectedBlock.y}"]`;
    document.querySelectorAll(selector).forEach((cell) => {
        cell.classList.add('selected-cell');
    });
}

function buildCellMarkup(cell, options) {
    const block = minecraftBlocks.find((item) => item.name === cell.block);
    const view = viewSelector.value;
    const shortName = cell.block.split('_')[0];
    const shortLabel = shortName.charAt(0).toUpperCase() + shortName.slice(1);
    const sectionRow = Math.floor(cell.y / sectionSize);
    const sectionCol = Math.floor(cell.x / sectionSize);
    const sectionLabel = getSectionLabel(sectionRow, sectionCol);
    const status = getSectionStatus(sectionLabel);
    const fontSize = Math.max(4, options.cellSize * (options.fontScale || 0.5));
    const classes = ['grid-cell'];

    if (cell.x % sectionSize === 0 && cell.x > 0) {
        classes.push('section-border-left');
    }
    if (cell.y % sectionSize === 0 && cell.y > 0) {
        classes.push('section-border-top');
    }

    if (selectedSection && sectionLabel === selectedSection.label) {
        classes.push(options.isFocusedViewer ? 'focused-section-cell' : 'active-section-cell');
    }

    const buildRowAbsoluteY = buildModeEnabled ? getCurrentBuildRowAbsoluteY() : null;
    if (buildModeEnabled && selectedSection && sectionLabel === selectedSection.label && cell.y === buildRowAbsoluteY) {
        classes.push('build-row-cell');
    }

    if (options.dimNonSelected && selectedSection && sectionLabel !== selectedSection.label) {
        classes.push('dimmed-cell');
    }

    let overlay = '';
    if (status === 'completed' || status === 'in-progress') {
        overlay = `<div class="section-overlay status-${status}"></div>`;
    }

    let cellStyle = '';
    let cellText = '';
    if (view === 'color') {
        const color = block ? `rgb(${block.r}, ${block.g}, ${block.b})` : '#000';
        cellStyle = `background-color:${color};width:${options.cellSize}px;height:${options.cellSize}px;font-size:${fontSize}px;`;
        cellText = options.showLabelsInColorView ? shortLabel : '';
    } else {
        cellStyle = `background-color:white;color:black;width:${options.cellSize}px;height:${options.cellSize}px;font-size:${fontSize}px;`;
        cellText = shortLabel;
    }

    return `<div class="${classes.join(' ')}" data-x="${cell.x}" data-y="${cell.y}" data-section="${sectionLabel}" data-block="${cell.block}" style="${cellStyle}" title="${cell.block}">${cellText}${overlay}</div>`;
}

function attachGridEvents(container) {
    container.querySelectorAll('.grid-cell').forEach((cell) => {
        cell.addEventListener('mouseover', (event) => {
            setTooltipContent(cell, event);
        });
        cell.addEventListener('mousemove', (event) => {
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        });
        cell.addEventListener('mouseout', hideTooltip);
        cell.addEventListener('click', () => {
            selectedBlock = {
                x: parseInt(cell.dataset.x, 10),
                y: parseInt(cell.dataset.y, 10),
                block: cell.dataset.block,
                sectionLabel: cell.dataset.section
            };
            updateSelectedBlockPanel();
            updateHighlight();
        });
    });
}

function buildCoordinateFrame(cellsMarkup, columns, rows, options = {}) {
    const startX = options.startX || 0;
    const startY = options.startY || 0;
    const cellSize = options.cellSize || 20;
    const axisFontSize = Math.max(10, cellSize * 0.4);
    const axisSize = Math.max(30, cellSize);
    const xLabels = [];
    const yLabels = [];

    for (let x = 0; x < columns; x++) {
        xLabels.push(
            `<div class="axis-cell axis-x-cell" style="width:${cellSize}px;height:${axisSize}px;font-size:${axisFontSize}px;">${startX + x + 1}</div>`
        );
    }

    for (let y = 0; y < rows; y++) {
        yLabels.push(
            `<div class="axis-cell axis-y-cell" style="width:${axisSize}px;height:${cellSize}px;font-size:${axisFontSize}px;">${indexToLetters(startY + y)}</div>`
        );
    }

    return `
        <div class="grid-frame" style="--axis-size:${axisSize}px;">
            <div class="grid-corner" style="width:${axisSize}px;height:${axisSize}px;"></div>
            <div class="grid-axis grid-axis-x" style="grid-template-columns:repeat(${columns}, max-content);">${xLabels.join('')}</div>
            <div class="grid-axis grid-axis-y" style="grid-template-rows:repeat(${rows}, max-content);">${yLabels.join('')}</div>
            <div class="blueprint-grid">${cellsMarkup}</div>
        </div>
    `;
}

function renderGrid(target, cells, columns, options = {}) {
    const rowCount = options.rows || Math.ceil(cells.length / columns);
    const markup = [];
    cells.forEach((cell) => {
        markup.push(buildCellMarkup(cell, options));
    });
    target.innerHTML = buildCoordinateFrame(markup.join(''), columns, rowCount, options);

    const gridElement = target.querySelector('.blueprint-grid');
    if (gridElement) {
        gridElement.style.gridTemplateColumns = `repeat(${columns}, max-content)`;
        gridElement.style.gridTemplateRows = `repeat(${rowCount}, max-content)`;
    }

    attachGridEvents(target);
}

function getFullCellSize() {
    return (320 / currentGridSize) * zoomLevel;
}

function getFocusedCellSize(sectionWidth, sectionHeight) {
    const sectionMaxSide = Math.max(sectionWidth, sectionHeight);
    const base = 480 / Math.max(1, sectionMaxSide);
    return Math.max(18, base * zoomLevel);
}

function renderFullBlueprint() {
    if (!currentBlueprint) {
        blueprintGridDiv.innerHTML = '';
        return;
    }

    const flatCells = [];
    for (let y = 0; y < currentGridSize; y++) {
        for (let x = 0; x < currentGridSize; x++) {
            flatCells.push(currentBlueprint[y][x]);
        }
    }

    renderGrid(blueprintGridDiv, flatCells, currentGridSize, {
        cellSize: getFullCellSize(),
        dimNonSelected: currentViewMode === 'focused',
        showLabelsInColorView: false,
        rows: currentGridSize,
        startX: 0,
        startY: 0
    });
}

function renderFocusedSection() {
    if (!currentBlueprint || !selectedSection) {
        focusedSectionGridDiv.innerHTML = '<p>Select a section to isolate it here.</p>';
        return;
    }

    const bounds = getSelectedSectionBounds();
    const cells = [];

    for (let y = bounds.startY; y < bounds.endY; y++) {
        for (let x = bounds.startX; x < bounds.endX; x++) {
            cells.push(currentBlueprint[y][x]);
        }
    }

    renderGrid(focusedSectionGridDiv, cells, bounds.width, {
        cellSize: getFocusedCellSize(bounds.width, bounds.height),
        isFocusedViewer: true,
        showLabelsInColorView: true,
        rows: bounds.height,
        startX: bounds.startX,
        startY: bounds.startY
    });
}

function regenerateGrid() {
    renderFullBlueprint();
    renderFocusedSection();
    updateHighlight();
    updateCurrentSectionUI();
    updateViewModeUI();
}

function scrollFullViewerToSection(section) {
    if (!section || !currentBlueprint) {
        return;
    }

    const cellSize = getFullCellSize();
    const sectionWidth = Math.min(sectionSize, currentGridSize - (section.col * sectionSize));
    const sectionHeight = Math.min(sectionSize, currentGridSize - (section.row * sectionSize));
    const sectionLeft = section.col * sectionSize * cellSize;
    const sectionTop = section.row * sectionSize * cellSize;
    const centerOffsetX = (sectionWidth * cellSize) / 2;
    const centerOffsetY = (sectionHeight * cellSize) / 2;

    blueprintViewer.scrollTo({
        left: Math.max(0, sectionLeft + centerOffsetX - (blueprintViewer.clientWidth / 2)),
        top: Math.max(0, sectionTop + centerOffsetY - (blueprintViewer.clientHeight / 2)),
        behavior: 'smooth'
    });
}

function selectSection(row, col, options = {}) {
    if (!currentBlueprint) {
        return;
    }

    const maxSections = getSectionCountPerAxis();
    if (row < 0 || col < 0 || row >= maxSections || col >= maxSections) {
        return;
    }

    selectedSection = {
        row,
        col,
        label: getSectionLabel(row, col)
    };
    currentBuildRowIndex = 0;

    if (options.switchToFocused !== false) {
        currentViewMode = 'focused';
    }

    generateSections();
    regenerateGrid();
    scrollFullViewerToSection(selectedSection);

    if (currentViewMode === 'focused') {
        focusedSectionViewer.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
}

function focusAdjacentSection(direction) {
    if (!currentBlueprint) {
        return;
    }

    const maxSections = getSectionCountPerAxis();
    const total = maxSections * maxSections;
    let currentIndex = 0;

    if (selectedSection) {
        currentIndex = (selectedSection.row * maxSections) + selectedSection.col;
    }

    const nextIndex = (currentIndex + direction + total) % total;
    const nextRow = Math.floor(nextIndex / maxSections);
    const nextCol = nextIndex % maxSections;
    selectSection(nextRow, nextCol, { switchToFocused: true });
}

function generateSections() {
    const cols = getSectionCountPerAxis();
    const rows = getSectionCountPerAxis();
    let html = '<h4>Sections</h4>';
    html += '<div class="current-section-row">Current Section: <span id="currentSection">None</span></div>';
    html += '<div class="sections-list">';

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const label = getSectionLabel(row, col);
            const status = getSectionStatus(label);
            const isActive = selectedSection && selectedSection.label === label ? ' active' : '';
            html += `<button class="section-btn ${status}${isActive}" data-row="${row}" data-col="${col}" data-label="${label}" type="button">${label}</button>`;
        }
    }

    html += '</div>';
    sectionsPanel.innerHTML = html;

    sectionsPanel.querySelectorAll('.section-btn').forEach((button) => {
        button.addEventListener('click', () => {
            selectSection(parseInt(button.dataset.row, 10), parseInt(button.dataset.col, 10));
        });

        button.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            cycleSectionStatus(button.dataset.label);
        });
    });

    updateCurrentSectionUI();
}

function cycleSectionStatus(label) {
    const statuses = ['not-started', 'in-progress', 'completed'];
    const currentStatus = getSectionStatus(label);
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    sectionStatuses[label] = nextStatus;
    saveSectionProgress();
    generateSections();
    regenerateGrid();
}

function setBuildMode(enabled) {
    buildModeEnabled = enabled;
    if (buildModeEnabled && !selectedSection && currentBlueprint) {
        selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
    }
    clampBuildRowIndex();
    regenerateGrid();
}

function stepBuildRow(direction) {
    if (!buildModeEnabled || !selectedSection) {
        return;
    }

    currentBuildRowIndex += direction;
    clampBuildRowIndex();
    regenerateGrid();

    if (currentViewMode === 'focused') {
        const bounds = getSelectedSectionBounds();
        const focusedCellSize = getFocusedCellSize(bounds.width, bounds.height);
        focusedSectionViewer.scrollTo({
            top: Math.max(0, currentBuildRowIndex * focusedCellSize - (focusedSectionViewer.clientHeight / 3)),
            behavior: 'smooth'
        });
    }
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
    generateSections();
    regenerateGrid();
}

function updateZoomDisplay() {
    zoomLevelSpan.textContent = `Zoom: ${Math.round(zoomLevel * 100)}%`;
    regenerateGrid();
    updatePreviewCanvasScale();
}

function zoomIn() {
    zoomLevel = Math.min(zoomLevel * 1.5, 20);
    updateZoomDisplay();
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel / 1.5, 0.05);
    updateZoomDisplay();
}

function resetZoom() {
    zoomLevel = 1;
    updateZoomDisplay();
}

function regenerateBlueprint() {
    if (!currentPixelGrid) {
        return;
    }

    currentBlueprint = buildBlueprintFromGrid(currentPixelGrid, currentGridSize);
    if (selectedSection) {
        const maxSections = getSectionCountPerAxis();
        if (selectedSection.row >= maxSections || selectedSection.col >= maxSections) {
            selectedSection = null;
        }
    }
    clampBuildRowIndex();

    regenerateGrid();
    updateBlockCounts();
}

function updateBlockCounts() {
    if (!currentBlueprint) {
        statusDiv.innerHTML = '';
        return;
    }

    const blockCounts = {};

    for (let y = 0; y < currentGridSize; y++) {
        for (let x = 0; x < currentGridSize; x++) {
            const blockName = currentBlueprint[y][x].block;
            blockCounts[blockName] = (blockCounts[blockName] || 0) + 1;
        }
    }

    const items = Object.entries(blockCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([block, count]) => `<li>${block}: ${count}</li>`)
        .join('');

    statusDiv.innerHTML = `
        <p>Image loaded</p>
        <p>Grid size: ${currentGridSize} x ${currentGridSize}</p>
        <p>Total pixels processed: ${currentGridSize * currentGridSize}</p>
        <p>Block Counts:</p>
        <ul>${items}</ul>
    `;
}

function updatePreviewCanvasScale() {
    const scaledSize = currentGridSize ? currentGridSize * getFullCellSize() : 320;
    pixelCanvas.style.width = `${scaledSize}px`;
    pixelCanvas.style.height = `${scaledSize}px`;
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
    const gridSize = parseInt(sizeSelector.value, 10);
    const restoreProject = options.restoreProject || null;
    const img = new Image();

    img.onload = () => {
        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = gridSize;
        resizedCanvas.height = gridSize;

        const resizedCtx = resizedCanvas.getContext('2d');
        resizedCtx.imageSmoothingEnabled = false;
        resizedCtx.drawImage(img, 0, 0, gridSize, gridSize);

        let imageData = resizedCtx.getImageData(0, 0, gridSize, gridSize);
        imageData = applyImageAdjustmentsToData(imageData);
        imageData = applySimplificationToData(imageData);
        resizedCtx.putImageData(imageData, 0, 0);
        const data = imageData.data;
        const grid = [];

        for (let y = 0; y < gridSize; y++) {
            const row = [];
            for (let x = 0; x < gridSize; x++) {
                const index = (y * gridSize + x) * 4;
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

        currentGridSize = gridSize;
        currentPixelGrid = grid;
        currentImageSource = imageSource;
        updateAppVisibility();
        selectedBlock = null;
        updateSelectedBlockPanel();
        if (restoreProject) {
            sectionStatuses = { ...(restoreProject.sectionStatuses || {}) };
        } else {
            loadSectionProgress();
        }

        ctx.clearRect(0, 0, 320, 320);
        ctx.drawImage(resizedCanvas, 0, 0, 320, 320);
        updatePreviewCanvasScale();

        currentBlueprint = buildBlueprintFromGrid(grid, gridSize);

        const maxSections = getSectionCountPerAxis();
        if (restoreProject) {
            currentViewMode = restoreProject.currentViewMode || 'full';
            buildModeEnabled = !!restoreProject.buildModeEnabled;
            currentBuildRowIndex = restoreProject.currentBuildRowIndex || 0;

            const restoredSection = restoreProject.currentSection;
            if (restoredSection && restoredSection.row < maxSections && restoredSection.col < maxSections) {
                selectedSection = {
                    row: restoredSection.row,
                    col: restoredSection.col,
                    label: getSectionLabel(restoredSection.row, restoredSection.col)
                };
            } else {
                selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
            }
        } else if (!selectedSection || selectedSection.row >= maxSections || selectedSection.col >= maxSections) {
            selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
        } else {
            selectedSection = getSectionByLabel(getSectionLabel(selectedSection.row, selectedSection.col));
        }
        if (!restoreProject) {
            currentBuildRowIndex = 0;
        }

        generateSections();
        regenerateGrid();
        updateBlockCounts();
        scrollFullViewerToSection(selectedSection);
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
    currentGridSize = parseInt(this.value, 10);
    loadSectionProgress();
    if (currentImageSource) {
        processImageSource(currentImageSource);
    }
});

viewSelector.addEventListener('change', () => {
    regenerateGrid();
});

sectionSizeSelector.addEventListener('change', function () {
    sectionSize = parseInt(this.value, 10);
    loadSectionProgress();

    if (selectedSection) {
        const maxSections = getSectionCountPerAxis();
        if (selectedSection.row >= maxSections || selectedSection.col >= maxSections) {
            selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
        } else {
            selectedSection.label = getSectionLabel(selectedSection.row, selectedSection.col);
        }
    }
    currentBuildRowIndex = 0;

    generateSections();
    regenerateGrid();
});

paletteSelector.addEventListener('change', function () {
    currentPalette = this.value;
    regenerateBlueprint();
});

conversionModeSelector.addEventListener('change', function () {
    currentConversionMode = this.value;
    regenerateBlueprint();
});

document.getElementById('zoomIn').addEventListener('click', zoomIn);
document.getElementById('zoomOut').addEventListener('click', zoomOut);
document.getElementById('resetZoom').addEventListener('click', resetZoom);

fullViewBtn.addEventListener('click', () => {
    currentViewMode = 'full';
    updateViewModeUI();
    regenerateGrid();
});

focusedViewBtn.addEventListener('click', () => {
    currentViewMode = 'focused';
    if (!selectedSection && currentBlueprint) {
        selectedSection = { row: 0, col: 0, label: getSectionLabel(0, 0) };
        generateSections();
    }
    updateViewModeUI();
    regenerateGrid();
});

buildModeBtn.addEventListener('click', () => {
    setBuildMode(!buildModeEnabled);
});

comparisonModeBtn.addEventListener('click', () => {
    comparisonModeEnabled = !comparisonModeEnabled;
    updateViewModeUI();
    updatePreviewCanvasScale();
    if (comparisonModeEnabled && syncComparisonEnabled) {
        syncScrollPosition(blueprintViewer, comparisonPreviewViewer);
    }
});

syncComparisonCheckbox.addEventListener('change', function () {
    syncComparisonEnabled = this.checked;
    if (comparisonModeEnabled && syncComparisonEnabled) {
        syncScrollPosition(blueprintViewer, comparisonPreviewViewer);
    }
});

prevSectionBtn.addEventListener('click', () => focusAdjacentSection(-1));
nextSectionBtn.addEventListener('click', () => focusAdjacentSection(1));
prevRowBtn.addEventListener('click', () => stepBuildRow(-1));
nextRowBtn.addEventListener('click', () => stepBuildRow(1));
completeSectionBtn.addEventListener('click', markSelectedSectionCompleted);
blueprintViewer.addEventListener('scroll', () => {
    syncScrollPosition(blueprintViewer, comparisonPreviewViewer);
});
comparisonPreviewViewer.addEventListener('scroll', () => {
    syncScrollPosition(comparisonPreviewViewer, blueprintViewer);
});

updateSelectedBlockPanel();
generateSections();
updateCurrentSectionUI();
updateViewModeUI();
updateAdjustmentLabels();
updateSimplificationLabels();
updatePreviewCanvasScale();
updateAppVisibility();

brightnessSlider.addEventListener('input', function () {
    imageAdjustments.brightness = parseInt(this.value, 10);
    regenerateFromAdjustments();
});

contrastSlider.addEventListener('input', function () {
    imageAdjustments.contrast = parseInt(this.value, 10);
    regenerateFromAdjustments();
});

saturationSlider.addEventListener('input', function () {
    imageAdjustments.saturation = parseInt(this.value, 10);
    regenerateFromAdjustments();
});

resetAdjustmentsBtn.addEventListener('click', () => {
    imageAdjustments = {
        brightness: 100,
        contrast: 100,
        saturation: 100
    };
    brightnessSlider.value = '100';
    contrastSlider.value = '100';
    saturationSlider.value = '100';
    regenerateFromAdjustments();
});

detailLevelSlider.addEventListener('input', function () {
    imageSimplification.detailLevel = parseInt(this.value, 10);
    regenerateFromAdjustments();
});

noiseReductionSlider.addEventListener('input', function () {
    imageSimplification.noiseReduction = parseInt(this.value, 10);
    regenerateFromAdjustments();
});

edgeStrengthSlider.addEventListener('input', function () {
    imageSimplification.edgeStrength = parseInt(this.value, 10);
    regenerateFromAdjustments();
});

resetSimplificationBtn.addEventListener('click', () => {
    imageSimplification = {
        detailLevel: 50,
        noiseReduction: 25,
        edgeStrength: 50
    };
    detailLevelSlider.value = '50';
    noiseReductionSlider.value = '25';
    edgeStrengthSlider.value = '50';
    regenerateFromAdjustments();
});

saveProjectBtn.addEventListener('click', saveCurrentProject);
loadProjectBtn.addEventListener('click', loadSavedProject);
deleteProjectBtn.addEventListener('click', deleteSavedProject);
loadProjectSelect.addEventListener('change', function () {
    projectNameInput.value = this.value;
    updateProjectListUI(this.value);
});
projectNameInput.addEventListener('input', function () {
    updateProjectListUI(loadProjectSelect.value);
});
templateCards.forEach((card) => {
    card.addEventListener('click', () => {
        loadTemplate(card.dataset.templateName, card.dataset.templateSrc);
    });
});

updateProjectListUI();
