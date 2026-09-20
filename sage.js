// =============================================================================
// DECK REGISTRY
// =============================================================================

const deckConfig = {};

// =============================================================================
// IMAGE PATH RESOLVER
// All decks are custom (user-uploaded); images are looked up by stable card id.
// =============================================================================

function getCardImagePath(deckName, cardId) {
    const cfg = deckConfig[deckName];
    if (!cfg) return null;
    return cfg.cardMap[cardId] || null;
}

function getCardDescription(deckName, cardId) {
    const cfg = deckConfig[deckName];
    if (!cfg) return null;
    return cfg.descriptionMap?.[cardId] || null;
}

// =============================================================================
// LAYOUTS
// Add new layouts here — positions and draw order only.
// =============================================================================

const layouts = {
    grid: {
        cardSize: { width: '200px', height: '300px' },
        1: { x: '25%', y: '25%' },
        2: { x: '42%', y: '25%' },
        3: { x: '59%', y: '25%' },
        4: { x: '76%', y: '25%' },
        5: { x: '25%', y: '72%' },
        6: { x: '42%', y: '72%' },
        7: { x: '59%', y: '72%' },
        8: { x: '76%', y: '72%' },
    },
    slant: {
        cardSize: { width: '120px', height: '200px' },
        1: { x: '20%', y: '20%' },
        2: { x: '35%', y: '35%' },
        3: { x: '50%', y: '50%' },
        4: { x: '65%', y: '65%' },
    },
    vformation: {
        cardSize: { width: '120px', height: '200px' },
        1: { x: '8%',  y: '8%'  },  // 1 – left tip
        2: { x: '24%', y: '28%' },  // 2
        3: { x: '38%', y: '52%' },  // 3
        4: { x: '50%', y: '85%' },  // 4 – bottom point
        5: { x: '62%', y: '52%' },  // 5
        6: { x: '76%', y: '28%' },  // 6
        7: { x: '92%', y: '8%'  },  // 7 – right tip
    },
};

const drawOrders = {
    grid:       [1, 2, 3, 4, 5, 6, 7, 8],
    slant:      [1, 2, 3, 4],
    vformation: [1, 7, 2, 6, 3, 5, 4],
    // ADD THIS:
    custom: [],
};

// =============================================================================
// RUNTIME STATE
// =============================================================================

let currentDeckName = null;
let currentDeck     = [];
let activeDeckType  = "qigong";
let layoutIndex     = 0;
let currentLayout = 'grid';
let positions       = layouts.grid;      // default layout
let drawOrder       = drawOrders.grid;   // default draw order

// =============================================================================
// LAYOUT SWITCHER
// =============================================================================

function setLayout(name) {
    currentLayout = name;
    positions   = layouts[name];
    drawOrder   = drawOrders[name];
    layoutIndex = 0;
    document.getElementById("table").innerHTML = "";
    createDeck();
}

// =============================================================================
// UI — DECK SELECTOR BUTTONS + TAB TOGGLE
// =============================================================================

const deckSelector = document.getElementById("deckSelector");

// Custom deck buttons are added dynamically by registerCustomDeck().

document.querySelectorAll(".deckTypeBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedType = btn.dataset.type;
        if (selectedType === activeDeckType) return;
        activeDeckType = selectedType;

        document.querySelectorAll(".deckTypeBtn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".deckButton").forEach(deckBtn => {
            deckBtn.style.display = deckBtn.dataset.type === selectedType ? "flex" : "none";
        });
    });
});

// =============================================================================
// UI — PANEL TOGGLES
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
    const sideDrawer       = document.getElementById("sideDrawer");
    const drawerTrack      = document.getElementById("drawerTrack");
    const toggleBtn        = document.getElementById("toggleSettingsBar");
    const slideToSettings  = document.getElementById("slideToSettings");
    const slideToDeck      = document.getElementById("slideToDeck");

    sideDrawer.classList.add("collapsed");

    toggleBtn.onclick = () => {
        sideDrawer.classList.toggle("collapsed");
        if (!sideDrawer.classList.contains("collapsed")) {
            drawerTrack.classList.remove("showSettings"); // always open on the deck page
        }
    };

    slideToSettings.onclick = () => drawerTrack.classList.add("showSettings");
    slideToDeck.onclick     = () => drawerTrack.classList.remove("showSettings");
});

// =============================================================================
// BACKGROUND PICKER MODAL
// =============================================================================

const BG_CATEGORIES = {

    animals: [
        { file: "background74.png",   label: "Default" },
        { file: "background1.jpeg",   label: "Ladybug" },
        { file: "background2.jpeg", label: "Mouse" },
        { file: "background3.jpeg", label: "Fox" },

    ],

    mystical: [
        { file: "background4.jpeg", label: "Dragon" },
        { file: "background18.jpeg", label: "Dragon 2" },
        { file: "background5.jpeg", label: "Castle"},
        { file: "background6.jpeg", label: "Winter Cave" },
        { file: "background7.jpeg", label: "Lanterns" },
    ],

    marble: [
        { file: "background8.jpeg", label: "Blue waves" },
        { file: "background9.jpeg", label: "Black"},
        
    ],

    stone: [
        { file: "background10.jpeg", label: "Blue Stones"},
        { file: "background11.jpeg", label: "Mossy Rock"},
        { file: "background12.jpeg", label: "Glowing Stones"},
    ],

    forest: [
        { file: "background16.jpeg", label: "Acorns" },
        
    ],

    ocean: [
        { file: "background13.jpeg",  label: "Ocean" },
        { file: "background14.jpeg", label: "Ocean 2" },
        { file: "background15.jpeg", label: "Ocean 3"},
    ],
};

const CATEGORY_LABELS = {
    animals:  "Animals",
    mystical: "Mystical",
    marble:    "Marble",
    stone:     "Stones",
    forest:   "Forest",
    ocean:    "Ocean & Sand",
};

const ALL_IMAGES = Object.values(BG_CATEGORIES).flat();

document.addEventListener("DOMContentLoaded", () => {
    const overlay       = document.getElementById("bgPickerOverlay");
    const allGrid       = document.getElementById("bgAllGrid");
    const catGrid       = document.getElementById("bgPickerGrid");
    const confirmBtn    = document.getElementById("bgPickerConfirm");
    const cancelBtn     = document.getElementById("bgPickerCancel");
    const openPickerBtn = document.getElementById("openBgPicker");

    let pendingBg = null;

    function makeThumb(imgData) {
        const value = `img/background/${imgData.file}`;
        const thumb = document.createElement("div");
        thumb.className = "bgThumb";
        thumb.dataset.value = value;
        thumb.dataset.theme = imgData.theme || "dark";  // ← ADD THIS LINE

        const img = document.createElement("img");
        img.src = value;
        img.alt = imgData.label;

        const label = document.createElement("span");
        label.textContent = imgData.label;

        thumb.appendChild(img);
        thumb.appendChild(label);

        thumb.addEventListener("click", () => {
            document.querySelectorAll(".bgThumb").forEach(t => t.classList.remove("selected"));
            thumb.classList.add("selected");
            pendingBg = value;
        });

        return thumb;
    }

    ALL_IMAGES.forEach(imgData => {
        allGrid.appendChild(makeThumb(imgData));
    });

    Object.entries(BG_CATEGORIES).forEach(([categoryKey, images]) => {
        const section = document.createElement("div");
        section.className = "bgCategorySection";

        const title = document.createElement("h4");
        title.className = "bgCategoryTitle";
        title.textContent = CATEGORY_LABELS[categoryKey];
        section.appendChild(title);

        const row = document.createElement("div");
        row.className = "bgCarouselRow";

        const prevBtn = document.createElement("button");
        prevBtn.className = "bgCarouselArrow bgCarouselPrev";
        prevBtn.innerHTML = "&#10094;";

        const track = document.createElement("div");
        track.className = "bgCarouselTrack";

        const nextBtn = document.createElement("button");
        nextBtn.className = "bgCarouselArrow bgCarouselNext";
        nextBtn.innerHTML = "&#10095;";

        images.forEach(imgData => {
            track.appendChild(makeThumb(imgData));
        });

        const scrollAmount = 220;
        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        row.appendChild(prevBtn);
        row.appendChild(track);
        row.appendChild(nextBtn);
        section.appendChild(row);
        catGrid.appendChild(section);
    });

    catGrid.style.display = "none";

    document.getElementById("showAll").addEventListener("click", () => {
        document.getElementById("showAll").classList.add("active");
        document.getElementById("showCategories").classList.remove("active");
        allGrid.style.display = "grid";
        catGrid.style.display = "none";
    });

    document.getElementById("showCategories").addEventListener("click", () => {
        document.getElementById("showCategories").classList.add("active");
        document.getElementById("showAll").classList.remove("active");
        allGrid.style.display = "none";
        catGrid.style.display = "flex";
    });

    openPickerBtn.addEventListener("click", () => {
        pendingBg = null;
        document.querySelectorAll(".bgThumb").forEach(t => t.classList.remove("selected"));
        document.getElementById("showAll").classList.add("active");
        document.getElementById("showCategories").classList.remove("active");
        allGrid.style.display = "grid";
        catGrid.style.display = "none";
        overlay.classList.add("open");
    });

    cancelBtn.addEventListener("click", () => {
        overlay.classList.remove("open");
    });

    confirmBtn.addEventListener("click", () => {
        if (pendingBg) {
            document.body.style.backgroundImage = `url('${pendingBg}')`;
            const selectedThumb = document.querySelector(".bgThumb.selected");  // ← ADD THIS LINE
            const theme = selectedThumb ? selectedThumb.dataset.theme : "dark";
            document.body.classList.remove("theme-dark", "theme-light");
            document.body.classList.add(`theme-${theme}`);
        }
        overlay.classList.remove("open");
        document.getElementById("sideDrawer").classList.add("collapsed");
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("open");
    });

    document.getElementById("bgUpload").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => { document.body.style.backgroundImage = `url('${e.target.result}')`; };
        reader.readAsDataURL(file);
    });

    createDeck();

    // =============================================================================
    // LAYOUT PICKER MODAL
    // =============================================================================

    document.getElementById("openLayoutPicker").addEventListener("click", () => {
        document.getElementById("layoutPickerOverlay").classList.add("open");
    });

    document.getElementById("layoutPickerCancel").addEventListener("click", () => {
        document.getElementById("layoutPickerOverlay").classList.remove("open");
    });

    document.getElementById("layoutPickerOverlay").addEventListener("click", (e) => {
        if (e.target === document.getElementById("layoutPickerOverlay")) {
            document.getElementById("layoutPickerOverlay").classList.remove("open");
        }
    });

    // =============================================================================
    // AUDIO LIBRARY MODAL
    // =============================================================================

    const audioOverlay = document.getElementById("audioLibraryOverlay");

    document.getElementById("openAudioLibrary").addEventListener("click", () => {
        audioOverlay.classList.add("open");
    });

    document.getElementById("audioLibraryCancel").addEventListener("click", () => {
        audioOverlay.classList.remove("open");
    });

    audioOverlay.addEventListener("click", (e) => {
        if (e.target === audioOverlay) audioOverlay.classList.remove("open");
    });

    // =============================================================================
    // CARD DESCRIPTIONS MODAL + CARD DETAIL POPUP
    // =============================================================================

    const cardDescOverlay = document.getElementById("cardDescriptionsOverlay");

    document.getElementById("openCardDescriptions").addEventListener("click", openCardDescriptions);
    document.getElementById("cardDescPickerClose").addEventListener("click", closeCardDescriptions);
    document.getElementById("cardDescBack").addEventListener("click", closeCardDescEditor);
    document.getElementById("cardDescCancel").addEventListener("click", closeCardDescEditor);
    document.getElementById("cardDescSave").addEventListener("click", saveCardDescriptions);

    cardDescOverlay.addEventListener("click", (e) => {
        if (e.target === cardDescOverlay) closeCardDescriptions();
    });

    const cardDetailOverlay = document.getElementById("cardDetailOverlay");

    document.getElementById("cardDetailClose").addEventListener("click", closeCardDetailPopup);

    cardDetailOverlay.addEventListener("click", (e) => {
        if (e.target === cardDetailOverlay) closeCardDetailPopup();
    });

}); // end DOMContentLoaded



// =============================================================================
// LAYOUT PICKER CLOSE HELPER
// =============================================================================

function closeLayoutPicker() {
    document.getElementById("layoutPickerOverlay").classList.remove("open");
    document.getElementById("sideDrawer").classList.add("collapsed");
}

// =============================================================================
// CUSTOM LAYOUT BUILDER
// =============================================================================

function saveCustomLayout(selectedCells) {
    const GRID_COLS = 6;
    const GRID_ROWS = 6;

    // Reset custom layout
    layouts.custom  = { cardSize: { width: '120px', height: '200px' } };
    drawOrders.custom = [];

    selectedCells.forEach((cell, i) => {
        const posNum = i + 1;
        const xPct   = Math.round(10 + (cell.c / (GRID_COLS - 1)) * 80);
        const yPct   = Math.round(10 + (cell.r / (GRID_ROWS - 1)) * 80);

        layouts.custom[posNum] = {
            x: `${xPct}%`,
            y: `${yPct}%`,
            rotate: cell.rotate || 0,   // ← ADD THIS LINE
        };
        drawOrders.custom.push(posNum);
    });

    setLayout('custom');
    document.getElementById('customLayoutOverlay').classList.remove('open');
    closeLayoutPicker();
}

function openCustomLayoutBuilder() {
    document.getElementById('layoutPickerOverlay').classList.remove('open');
    document.getElementById('customLayoutOverlay').classList.add('open');
}

// =============================================================================
// AUDIO PLAYBACK
// =============================================================================

const audioPlayer = document.getElementById("audioPlayer");
let activePlayBtn = null;

function playTrack(btn, src) {
    if (activePlayBtn === btn && !audioPlayer.paused) {
        audioPlayer.pause();
        btn.textContent = "▶ Play";
        btn.classList.remove("playing");
        activePlayBtn = null;
        return;
    }

    if (activePlayBtn) {
        activePlayBtn.textContent = "▶ Play";
        activePlayBtn.classList.remove("playing");
    }

    audioPlayer.src = src;
    audioPlayer.play();
    btn.textContent = "⏸ Pause";
    btn.classList.add("playing");
    activePlayBtn = btn;

    audioPlayer.onended = () => {
        btn.textContent = "▶ Play";
        btn.classList.remove("playing");
        activePlayBtn = null;
    };
}

// =============================================================================
// CUSTOM DECK BUILDER
// =============================================================================

let customDeckCards    = [];
let customDeckCoverUrl = null;
let customDeckTab      = 'qigong';
let editingDeckId      = null;
let activeDeckCarouselApi = null;

// Named uniquely (not "white-sage-...") so this app never again shares
// storage with a sibling site on the same origin — localStorage/IndexedDB
// partition by origin only, not by page or folder, so a reused generic name
// silently merges two unrelated apps' data together.
const CUSTOM_DECKS_STORAGE_KEY = 'qiGongWebCustomDecks';
const CUSTOM_DECKS_DB_NAME = 'qi-gong-web-custom-decks';
const CUSTOM_DECKS_DB_VERSION = 1;
const CUSTOM_DECKS_STORE_NAME = 'decks';

function requestToPromise(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('Storage request failed'));
    });
}

function openCustomDecksDb() {
    return new Promise((resolve, reject) => {
        if (!('indexedDB' in window)) {
            reject(new Error('IndexedDB is not available'));
            return;
        }

        const request = indexedDB.open(CUSTOM_DECKS_DB_NAME, CUSTOM_DECKS_DB_VERSION);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(CUSTOM_DECKS_STORE_NAME)) {
                db.createObjectStore(CUSTOM_DECKS_STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('Unable to open deck storage'));
    });
}

async function saveCustomDecksToStorage(decks) {
    if ('indexedDB' in window) {
        try {
            const db = await openCustomDecksDb();
            const tx = db.transaction(CUSTOM_DECKS_STORE_NAME, 'readwrite');
            const store = tx.objectStore(CUSTOM_DECKS_STORE_NAME);

            // put() only upserts the keys we pass it — it never removes a
            // record for a key that's missing from `decks`. Without this
            // reconciliation step, a deleted deck's row survives in
            // IndexedDB forever and comes back on every future load,
            // looking like a "random" deck nobody created.
            const keepIds = new Set(decks.map(deck => deck.id));
            const existingKeys = await requestToPromise(store.getAllKeys());
            existingKeys.forEach(key => {
                if (!keepIds.has(key)) store.delete(key);
            });

            decks.forEach(deck => store.put(deck));
            await new Promise((resolve, reject) => {
                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error || new Error('Unable to save deck storage'));
                tx.onabort = () => reject(tx.error || new Error('Deck storage save aborted'));
            });
            db.close();
            return;
        } catch (err) {
            console.warn('IndexedDB custom deck save failed, falling back to localStorage:', err);
        }
    }

    localStorage.setItem(CUSTOM_DECKS_STORAGE_KEY, JSON.stringify(decks));
}

async function getStoredCustomDecks() {
    if ('indexedDB' in window) {
        try {
            const db = await openCustomDecksDb();
            const tx = db.transaction(CUSTOM_DECKS_STORE_NAME, 'readonly');
            const store = tx.objectStore(CUSTOM_DECKS_STORE_NAME);
            const decks = await requestToPromise(store.getAll());
            db.close();
            return Array.isArray(decks) ? decks : [];
        } catch (err) {
            console.warn('Unable to load custom decks from IndexedDB:', err);
        }
    }

    return JSON.parse(localStorage.getItem(CUSTOM_DECKS_STORAGE_KEY) || '[]');
}

const LEGACY_DECK_TYPE_MAP = { tarot: 'qigong', oracle: 'taichi' };

// Decks saved before cards had stable ids only have {name, dataUrl}. Assign
// each an id in place so old decks stop relying on name-based identity —
// this is what causes duplicated/ghost cards, since a display name is
// user-editable and easy to collide (e.g. two cards renamed identically, or
// a new slot's auto-generated name matching an already-used one). Also
// remaps decks saved under the old Tarot/Oracle tabs onto Qi Gong/Tai Chi so
// they don't vanish from both tabs after the rename.
function migrateLegacyDeckCards(deckData) {
    let changed = false;
    deckData.cards = (deckData.cards || []).map(c => {
        if (c.id) return c;
        changed = true;
        return { id: generateCardId(), name: c.name, dataUrl: c.dataUrl };
    });
    if (LEGACY_DECK_TYPE_MAP[deckData.type]) {
        deckData.type = LEGACY_DECK_TYPE_MAP[deckData.type];
        changed = true;
    }
    return changed;
}

async function loadCustomDecksFromStorage() {
    const saved = await getStoredCustomDecks();
    if (Array.isArray(saved) && saved.length > 0) {
        const anyChanged = saved.map(migrateLegacyDeckCards).some(Boolean);
        if (anyChanged) {
            try { await saveCustomDecksToStorage(saved); }
            catch (err) { console.warn('Unable to persist card-id migration:', err); }
        }
        saved.forEach(deckData => registerCustomDeck(deckData));
        return;
    }

    const legacyDecks = JSON.parse(localStorage.getItem(CUSTOM_DECKS_STORAGE_KEY) || '[]');
    const anyChanged = legacyDecks.map(migrateLegacyDeckCards).some(Boolean);
    if (anyChanged) {
        try { await saveCustomDecksToStorage(legacyDecks); }
        catch (err) { console.warn('Unable to persist card-id migration:', err); }
    }
    legacyDecks.forEach(deckData => registerCustomDeck(deckData));
}

function resetCustomDeckForm() {
    customDeckCards    = [];
    customDeckCoverUrl = null;
    customDeckTab      = 'qigong';
    editingDeckId      = null;

    document.getElementById('customDeckName').value           = '';
    document.getElementById('customDeckCoverName').textContent = 'No file chosen';
    document.getElementById('customDeckCoverPreview').style.display = 'none';
    document.getElementById('customDeckSaveBtn').disabled      = true;
    document.getElementById('customDeckSaveBtn').textContent   = 'Create Deck';

    document.querySelectorAll('.customDeckTabBtn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === 'qigong');
    });

    activeDeckCarouselApi = createCarousel('createCarousel', [], (filledCards) => {
        customDeckCards = filledCards;
        checkCustomDeckReady();
    });
}

function openCustomDeckBuilder() {
    resetCustomDeckForm();
    switchDeckModalTab('create', document.querySelector('.customDeckTabSwitch[data-tab="create"]'));
    document.getElementById('customDeckOverlay').classList.add('open');
}

function startNewDeck() {
    resetCustomDeckForm();
    switchDeckModalTab('create', document.querySelector('.customDeckTabSwitch[data-tab="create"]'));
}

function closeCustomDeckBuilder() {
    document.getElementById('customDeckOverlay').classList.remove('open');
}

// =============================================================================
// DECK CARD CAROUSEL
// =============================================================================

const CAROUSEL_VISIBLE = 3;

function getAutoCardName(idx) {
    return `Card ${idx + 1}`;
}

// Cards are identified internally by this id, not by their (freely editable,
// collision-prone) display name — see generateCardId() usage below.
let cardIdCounter = 0;
function generateCardId() {
    cardIdCounter += 1;
    return `card_${Date.now()}_${cardIdCounter}_${Math.random().toString(36).slice(2, 8)}`;
}

function readFileAsDataUrl(file, options = {}) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const maxWidth = options.maxWidth || 900;
                const maxHeight = options.maxHeight || 1400;
                const scale = Math.min(1, maxWidth / img.naturalWidth, maxHeight / img.naturalHeight);
                const width = Math.max(1, Math.round(img.naturalWidth * scale));
                const height = Math.max(1, Math.round(img.naturalHeight * scale));

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                const mimeType = options.mimeType || 'image/png';
                const quality = options.quality;
                resolve(canvas.toDataURL(mimeType, quality));
            };
            img.onerror = () => reject(new Error('Unable to process image'));
            img.src = event.target.result;
        };
        reader.onerror = () => reject(new Error('Unable to read file'));
        reader.readAsDataURL(file);
    });
}

function makeEmptyCard(idx) {
    return { id: null, name: getAutoCardName(idx), dataUrl: null };
}

function createCarousel(containerId, initialCards, onUpdate) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let cards = initialCards.length > 0
        ? [
            ...initialCards.map(c => ({
                id: c.id || null,
                name: c.name,
                dataUrl: c.dataUrl || null,
            })),
            makeEmptyCard(initialCards.length),
        ]
        : [makeEmptyCard(0)];

    let offset       = 0;
    let pendingSlot  = null;

    const fileInput = document.createElement('input');
    fileInput.type    = 'file';
    fileInput.accept  = 'image/*';
    fileInput.style.display = 'none';
    container.appendChild(fileInput);

    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file || pendingSlot === null) return;
        try {
            const dataUrl = await readFileAsDataUrl(file, { maxWidth: 560, maxHeight: 900, mimeType: 'image/jpeg', quality: 0.8 });
            setCardField(pendingSlot, dataUrl);
        } catch (err) {
            console.error(err);
        }
        fileInput.value = '';
    });

    function getFilledCards() {
        return cards.filter(c => c.dataUrl !== null);
    }

    function ensureEmptySlot() {
        const filledCards = getFilledCards();
        cards = [...filledCards, makeEmptyCard(filledCards.length)];
    }

    function triggerUpload(idx) {
        pendingSlot  = idx;
        fileInput.click();
    }

    function setCardField(idx, dataUrl) {
        if (!cards[idx]) cards[idx] = makeEmptyCard(idx);
        cards[idx].dataUrl = dataUrl;
        cards[idx].id = cards[idx].id || generateCardId();
        ensureEmptySlot();
        render();
        onUpdate(getFilledCards());
        if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
    }

    function clearCardField(idx) {
        if (!cards[idx]) return;
        if (cards.length > 1) cards.splice(idx, 1);
        else { cards[idx].dataUrl = null; cards[idx].id = null; }
        offset = Math.min(offset, Math.max(0, cards.length - CAROUSEL_VISIBLE));
        ensureEmptySlot();
        render();
        onUpdate(getFilledCards());
        if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
    }

    // Merges a bulk-uploaded list of move images by index.
    function setMoveImages(dataUrls) {
        dataUrls.forEach((dataUrl, idx) => {
            if (!cards[idx]) cards[idx] = makeEmptyCard(idx);
            cards[idx].dataUrl = dataUrl;
            cards[idx].id = cards[idx].id || generateCardId();
        });
        offset = 0;
        ensureEmptySlot();
        render();
        onUpdate(getFilledCards());
        if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
    }

    const api = {
        replaceCards(nextCards) {
            cards = (nextCards.length > 0 ? nextCards : [makeEmptyCard(0)])
                .map((card, idx) => ({
                    id: card.dataUrl ? (card.id || generateCardId()) : null,
                    name: card.name || getAutoCardName(idx),
                    dataUrl: card.dataUrl || null,
                }));
            offset = 0;
            ensureEmptySlot();
            render();
            onUpdate(getFilledCards());
            if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
        },
        setMoveImages,
    };

    function deleteCard(idx) {
        const hasAny = cards[idx] && cards[idx].dataUrl;
        if (getFilledCards().length <= 1 && hasAny) {
            cards[idx].dataUrl = null;
            cards[idx].id = null;
        } else {
            cards.splice(idx, 1);
        }
        offset = Math.min(offset, Math.max(0, cards.length - CAROUSEL_VISIBLE));
        ensureEmptySlot();
        render();
        onUpdate(getFilledCards());
        if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
    }

    function slide(dir) {
        offset = Math.max(0, Math.min(offset + dir, cards.length - CAROUSEL_VISIBLE));
        render();
    }

    function buildImageSlot(realIdx) {
        const wrap = document.createElement('div');
        wrap.className = 'card-slot-wrap';

        const value = cards[realIdx].dataUrl;
        const slot = document.createElement('div');
        slot.className = 'card-slot' + (value ? ' filled' : '');

        if (value) {
            const img = document.createElement('img');
            img.src = value;
            slot.appendChild(img);

            const overlay = document.createElement('div');
            overlay.className = 'card-slot-overlay';

            const replBtn = document.createElement('button');
            replBtn.textContent = 'Replace';
            replBtn.onclick = () => triggerUpload(realIdx);

            const clearBtn = document.createElement('button');
            clearBtn.textContent = 'Clear';
            clearBtn.className   = 'del-btn';
            clearBtn.onclick     = () => clearCardField(realIdx);

            overlay.appendChild(replBtn);
            overlay.appendChild(clearBtn);
            slot.appendChild(overlay);
        } else {
            const ph = document.createElement('div');
            ph.className = 'card-slot-placeholder';
            ph.innerHTML = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 32V16M24 16L18 22M24 16L30 22" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 36a8 8 0 01-1.5-15.8A10 10 0 1132 28h2a6 6 0 000-12h-1A10 10 0 0012 28v8z" stroke="white" stroke-width="2" fill="none"/>
            </svg><span>Click or drop</span>`;
            slot.appendChild(ph);
            slot.onclick = () => triggerUpload(realIdx);

            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.style.borderColor = '#fff';
            });
            slot.addEventListener('dragleave', () => {
                slot.style.borderColor = '';
            });
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.style.borderColor = '';
                const file = e.dataTransfer.files[0];
                if (!file || !file.type.startsWith('image/')) return;
                const reader = new FileReader();
                reader.onload = (ev) => setCardField(realIdx, ev.target.result);
                reader.readAsDataURL(file);
            });
        }

        wrap.appendChild(slot);
        return wrap;
    }

    function render() {
        container.innerHTML = '';
        container.appendChild(fileInput);
        container.className = 'deckCarousel';

        const counter = document.createElement('div');
        counter.className = 'carousel-counter';
        const filled = getFilledCards().length;
        counter.textContent = `${filled} card${filled !== 1 ? 's' : ''} uploaded`;
        container.appendChild(counter);

        const row = document.createElement('div');
        row.className = 'carousel-row';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-arrow';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.disabled  = offset === 0;
        prevBtn.onclick   = () => slide(-1);

        const cardsEl = document.createElement('div');
        cardsEl.className = 'carousel-cards';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-arrow';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.disabled  = offset >= cards.length - CAROUSEL_VISIBLE;
        nextBtn.onclick   = () => slide(1);

        const visible = cards.slice(offset, offset + CAROUSEL_VISIBLE);
        while (visible.length < CAROUSEL_VISIBLE) visible.push(null);

        visible.forEach((card, vi) => {
            const realIdx = offset + vi;
            const col = document.createElement('div');
            col.className = 'carousel-card';

            if (!card) { cardsEl.appendChild(col); return; }

            col.appendChild(buildImageSlot(realIdx));

            const nameInput = document.createElement('input');
            nameInput.type        = 'text';
            nameInput.className   = 'card-name-input';
            nameInput.value       = card.name;
            nameInput.placeholder = `Card ${realIdx + 1}`;
            nameInput.oninput     = () => {
                cards[realIdx].name = nameInput.value;
                onUpdate(getFilledCards());
            };
            col.appendChild(nameInput);

            if (card.dataUrl) {
                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'carousel-card-remove';
                removeBtn.textContent = 'Remove card';
                removeBtn.onclick = () => deleteCard(realIdx);
                col.appendChild(removeBtn);
            }

            cardsEl.appendChild(col);
        });

        row.appendChild(prevBtn);
        row.appendChild(cardsEl);
        row.appendChild(nextBtn);
        container.appendChild(row);

        const dotsEl = document.createElement('div');
        dotsEl.className = 'carousel-dots';
        const totalPages = Math.max(1, cards.length - CAROUSEL_VISIBLE + 1);
        for (let i = 0; i < Math.min(totalPages, 8); i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === offset ? ' active' : '');
            dotsEl.appendChild(dot);
        }
        container.appendChild(dotsEl);
    }

    render();
    return api;
}

async function readFilesAsDataUrls(files) {
    const dataUrls = [];
    for (const file of files) {
        dataUrls.push(await readFileAsDataUrl(file, {
            maxWidth: 560,
            maxHeight: 900,
            mimeType: 'image/jpeg',
            quality: 0.8,
        }));
    }
    return dataUrls;
}

async function handleBulkCardUpload(event) {
    const files = Array.from(event.target.files || []).filter(file => file.type.startsWith('image/'));
    if (!files.length || !activeDeckCarouselApi) return;

    const dataUrls = await readFilesAsDataUrls(files);
    activeDeckCarouselApi.setMoveImages(dataUrls);
    event.target.value = '';
}

function switchDeckModalTab(tab, btn) {
    document.querySelectorAll('.customDeckTabSwitch').forEach(b => b.classList.remove('active'));
    (btn || document.querySelector(`.customDeckTabSwitch[data-tab="${tab}"]`))?.classList.add('active');

    document.getElementById('customDeckViewCreate').style.display   = tab === 'create' ? 'flex' : 'none';
    document.getElementById('customDeckViewMyDecks').style.display  = tab === 'manage' ? 'flex' : 'none';

    if (tab === 'manage') renderMyDecksList();
}

function setCustomDeckTab(btn) {
    customDeckTab = btn.dataset.tab;
    document.querySelectorAll('.customDeckTabBtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

async function handleCoverUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
        customDeckCoverUrl = await readFileAsDataUrl(file, {
            maxWidth: 480,
            maxHeight: 720,
            mimeType: 'image/jpeg',
            quality: 0.8,
        });
        document.getElementById('customDeckCoverName').textContent = file.name;
        const preview = document.getElementById('customDeckCoverPreview');
        preview.src = customDeckCoverUrl;
        preview.style.display = 'block';
        checkCustomDeckReady();
    } catch (err) {
        console.error(err);
    }
}

function checkCustomDeckReady() {
    const name  = document.getElementById('customDeckName').value.trim();
    const ready = name.length > 0 && customDeckCoverUrl && customDeckCards.length > 0;
    document.getElementById('customDeckSaveBtn').disabled = !ready;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('customDeckName').addEventListener('input', checkCustomDeckReady);
});

async function saveCustomDeck() {
    const name = document.getElementById('customDeckName').value.trim();
    const id   = editingDeckId || ('customdeck_' + Date.now());
    const isEdit = !!editingDeckId;

    const deckData = {
        id,
        name,
        type:  customDeckTab,
        cover: customDeckCoverUrl,
        cards: customDeckCards,
    };

    try {
        const existing = await getStoredCustomDecks();
        const idx = existing.findIndex(d => d.id === id);
        if (idx > -1) existing[idx] = deckData; else existing.push(deckData);
        await saveCustomDecksToStorage(existing);
    } catch (err) {
        console.error('Unable to save custom deck:', err);
        alert('Unable to save the custom deck. Please reduce image size, use fewer cards, or try again in a supported browser.');
        return;
    }

    if (isEdit) {
        updateRegisteredCustomDeck(deckData);
    } else {
        registerCustomDeck(deckData);
    }
    editingDeckId = null;
    closeCustomDeckBuilder();
}

// Cards are keyed by their stable id (not their editable name) so a renamed
// or accidentally-duplicated name can never make two cards collide into one
// slot, or leave a card's id in the draw list with no matching image.
function buildDeckConfigEntry(deckData) {
    const validCards = deckData.cards.filter(c => c.id && c.dataUrl);
    if (validCards.length !== deckData.cards.length) {
        console.warn(`Deck "${deckData.name}" has ${deckData.cards.length - validCards.length} card(s) with missing image data — skipping them.`);
    }

    return {
        cards:   validCards.map(c => c.id),
        cover:   deckData.cover,
        type:    deckData.type,
        custom:  true,
        cardMap:    Object.fromEntries(validCards.map(c => [c.id, c.dataUrl])),
        nameMap:    Object.fromEntries(validCards.map(c => [c.id, c.name])),
        descriptionMap: Object.fromEntries(validCards.filter(c => c.description).map(c => [c.id, c.description])),
    };
}

function registerCustomDeck(deckData) {
    if (deckConfig[deckData.id]) return;

    deckConfig[deckData.id] = buildDeckConfigEntry(deckData);

    addCustomDeckButton(deckData);
}

function updateRegisteredCustomDeck(deckData) {
    deckConfig[deckData.id] = buildDeckConfigEntry(deckData);

    const btn = deckSelector.querySelector(`.deckButton[data-custom-id="${deckData.id}"]`);
    if (btn) {
        btn.title = deckData.name;
        btn.dataset.type = deckData.type;
        btn.style.backgroundImage = `url('${deckData.cover}')`;
        btn.style.display = deckData.type === activeDeckType ? 'flex' : 'none';
    }

    if (currentDeckName === deckData.id) {
        currentDeck = [...deckConfig[deckData.id].cards];
        layoutIndex = 0;
        document.getElementById("table").innerHTML = "";
        createDeck();
    }
}

// =============================================================================
// MANAGE CUSTOM DECKS — "My Decks" tab
// =============================================================================

async function renderMyDecksList() {
    const grid  = document.getElementById('myDecksGrid');
    const empty = document.getElementById('myDecksEmpty');
    const count = document.getElementById('myDecksCount');
    if (!grid) return;

    const decks = await getStoredCustomDecks();
    grid.innerHTML = '';

    count.textContent = `${decks.length} deck${decks.length !== 1 ? 's' : ''}`;

    if (!decks.length) {
        empty.style.display = 'block';
        grid.style.display  = 'none';
        return;
    }
    empty.style.display = 'none';
    grid.style.display  = 'grid';

    decks.forEach(deckData => {
        const item = document.createElement('div');
        item.className = 'myDeckItem';

        const cover = document.createElement('div');
        cover.className = 'myDeckCover';
        if (deckData.cover) cover.style.backgroundImage = `url('${deckData.cover}')`;
        item.appendChild(cover);

        const info = document.createElement('div');
        info.className = 'myDeckInfo';

        const nameEl = document.createElement('div');
        nameEl.className = 'myDeckName';
        nameEl.textContent = deckData.name;

        const metaEl = document.createElement('div');
        metaEl.className = 'myDeckMeta';
        metaEl.textContent = `${deckData.type === 'taichi' ? 'Tai Chi' : 'Qi Gong'} tab · ${deckData.cards.length} card${deckData.cards.length !== 1 ? 's' : ''}`;

        info.appendChild(nameEl);
        info.appendChild(metaEl);
        item.appendChild(info);

        const actions = document.createElement('div');
        actions.className = 'myDeckActions';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => startEditDeck(deckData.id);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className   = 'myDeckDeleteBtn';
        delBtn.onclick = () => confirmDeleteCustomDeck(deckData.id);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
        item.appendChild(actions);

        grid.appendChild(item);
    });
}

async function startEditDeck(id) {
    const decks    = await getStoredCustomDecks();
    const deckData = decks.find(d => d.id === id);
    if (!deckData) return;

    editingDeckId       = id;
    customDeckTab       = deckData.type;
    customDeckCoverUrl  = deckData.cover;
    customDeckCards     = [...deckData.cards];

    document.getElementById('customDeckName').value = deckData.name;
    document.getElementById('customDeckCoverName').textContent = 'Current cover image';
    const preview = document.getElementById('customDeckCoverPreview');
    preview.src = deckData.cover;
    preview.style.display = 'block';

    document.querySelectorAll('.customDeckTabBtn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === customDeckTab);
    });

    activeDeckCarouselApi = createCarousel('createCarousel', deckData.cards, (filledCards) => {
        customDeckCards = filledCards;
        checkCustomDeckReady();
    });

    document.getElementById('customDeckSaveBtn').textContent = 'Save Changes';
    checkCustomDeckReady();

    switchDeckModalTab('create', document.querySelector('.customDeckTabSwitch[data-tab="create"]'));
}

async function confirmDeleteCustomDeck(id) {
    if (!confirm('Delete this custom deck? This cannot be undone.')) return;

    const btnEl = deckSelector.querySelector(`.deckButton[data-custom-id="${id}"]`);
    await deleteCustomDeck(id, btnEl);

    if (editingDeckId === id) {
        resetCustomDeckForm();
    }

    renderMyDecksList();
}

// =============================================================================
// CARD DETAIL POPUP — shown when a drawn card is clicked
// =============================================================================

function openCardDetailPopup(deckName, cardId) {
    const cfg = deckConfig[deckName];
    if (!cfg) return;

    document.getElementById('cardDetailName').textContent = cfg.nameMap?.[cardId] || 'Card';

    const image = document.getElementById('cardDetailImage');
    image.src = getCardImagePath(deckName, cardId) || '';

    const description = getCardDescription(deckName, cardId);
    const descEl = document.getElementById('cardDetailDescription');
    if (description) {
        descEl.textContent = description;
        descEl.classList.remove('cardDetailDescriptionEmpty');
    } else {
        descEl.textContent = 'No instructions yet — add one in Settings → Card Descriptions.';
        descEl.classList.add('cardDetailDescriptionEmpty');
    }

    document.getElementById('cardDetailOverlay').classList.add('open');
}

function closeCardDetailPopup() {
    document.getElementById('cardDetailOverlay').classList.remove('open');
}

// =============================================================================
// CARD DESCRIPTIONS EDITOR (Settings) — write per-card move instructions
// =============================================================================

let cardDescEditingDeckId = null;

async function openCardDescriptions() {
    cardDescEditingDeckId = null;
    document.getElementById('cardDescEditor').style.display = 'none';
    document.getElementById('cardDescDeckPicker').style.display = 'flex';
    await renderCardDescDecksGrid();
    document.getElementById('cardDescriptionsOverlay').classList.add('open');
}

function closeCardDescriptions() {
    document.getElementById('cardDescriptionsOverlay').classList.remove('open');
}

async function renderCardDescDecksGrid() {
    const grid  = document.getElementById('cardDescDecksGrid');
    const empty = document.getElementById('cardDescDecksEmpty');

    const decks = await getStoredCustomDecks();
    grid.innerHTML = '';

    if (!decks.length) {
        empty.style.display = 'block';
        grid.style.display  = 'none';
        return;
    }
    empty.style.display = 'none';
    grid.style.display  = 'grid';

    decks.forEach(deckData => {
        const item = document.createElement('div');
        item.className = 'myDeckItem';

        const cover = document.createElement('div');
        cover.className = 'myDeckCover';
        if (deckData.cover) cover.style.backgroundImage = `url('${deckData.cover}')`;
        item.appendChild(cover);

        const info = document.createElement('div');
        info.className = 'myDeckInfo';

        const nameEl = document.createElement('div');
        nameEl.className = 'myDeckName';
        nameEl.textContent = deckData.name;

        const metaEl = document.createElement('div');
        metaEl.className = 'myDeckMeta';
        metaEl.textContent = `${deckData.cards.length} card${deckData.cards.length !== 1 ? 's' : ''}`;

        info.appendChild(nameEl);
        info.appendChild(metaEl);
        item.appendChild(info);

        const actions = document.createElement('div');
        actions.className = 'myDeckActions';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit Descriptions';
        editBtn.onclick = () => openCardDescEditorForDeck(deckData.id);

        actions.appendChild(editBtn);
        item.appendChild(actions);

        grid.appendChild(item);
    });
}

async function openCardDescEditorForDeck(id) {
    const decks    = await getStoredCustomDecks();
    const deckData = decks.find(d => d.id === id);
    if (!deckData) return;

    cardDescEditingDeckId = id;
    document.getElementById('cardDescDeckName').textContent = deckData.name;

    const list = document.getElementById('cardDescList');
    list.innerHTML = '';

    deckData.cards.filter(c => c.id && c.dataUrl).forEach(card => {
        const row = document.createElement('div');
        row.className = 'cardDescRow';
        row.dataset.cardId = card.id;

        const thumb = document.createElement('img');
        thumb.className = 'cardDescThumb';
        thumb.src = card.dataUrl;
        row.appendChild(thumb);

        const fields = document.createElement('div');
        fields.className = 'cardDescFields';

        const nameEl = document.createElement('div');
        nameEl.className = 'cardDescName';
        nameEl.textContent = card.name;
        fields.appendChild(nameEl);

        const textarea = document.createElement('textarea');
        textarea.className = 'cardDescTextarea';
        textarea.placeholder = 'How do you do this move?';
        textarea.value = card.description || '';
        fields.appendChild(textarea);

        row.appendChild(fields);
        list.appendChild(row);
    });

    document.getElementById('cardDescDeckPicker').style.display = 'none';
    document.getElementById('cardDescEditor').style.display = 'flex';
}

function closeCardDescEditor() {
    cardDescEditingDeckId = null;
    document.getElementById('cardDescEditor').style.display = 'none';
    document.getElementById('cardDescDeckPicker').style.display = 'flex';
}

async function saveCardDescriptions() {
    if (!cardDescEditingDeckId) return;

    const descriptions = {};
    document.querySelectorAll('#cardDescList .cardDescRow').forEach(row => {
        const textarea = row.querySelector('.cardDescTextarea');
        descriptions[row.dataset.cardId] = textarea.value.trim();
    });

    const decks    = await getStoredCustomDecks();
    const deckData = decks.find(d => d.id === cardDescEditingDeckId);
    if (!deckData) return;

    deckData.cards.forEach(card => {
        if (card.id && Object.prototype.hasOwnProperty.call(descriptions, card.id)) {
            card.description = descriptions[card.id];
        }
    });

    await saveCustomDecksToStorage(decks);

    // Patch the live config in place rather than calling
    // updateRegisteredCustomDeck() — that would reset layoutIndex and clear
    // the table, wiping out any reading in progress just because someone
    // edited descriptions in Settings at the same time.
    if (deckConfig[cardDescEditingDeckId]) {
        deckConfig[cardDescEditingDeckId].descriptionMap =
            Object.fromEntries(deckData.cards.filter(c => c.id && c.description).map(c => [c.id, c.description]));
    }

    closeCardDescEditor();
}

function addCustomDeckButton(deckData) {
    const btn = document.createElement('div');
    btn.className        = 'deckButton';
    btn.title            = deckData.name;
    btn.dataset.type     = deckData.type;
    btn.dataset.customId = deckData.id;
    btn.style.backgroundImage = `url('${deckData.cover}')`;
    if (deckData.type !== activeDeckType) btn.style.display = 'none';
    btn.onclick = () => selectDeck(deckData.id);
    deckSelector.appendChild(btn);
}

async function deleteCustomDeck(id, btnEl) {
    try {
        const existing = await getStoredCustomDecks();
        const updated  = existing.filter(d => d.id !== id);
        await saveCustomDecksToStorage(updated);
    } catch (err) {
        console.error('Unable to delete custom deck:', err);
    }

    delete deckConfig[id];
    if (btnEl && btnEl.remove) btnEl.remove();
    if (currentDeckName === id) {
        currentDeckName = null;
        currentDeck = [];
        layoutIndex = 0;
        document.getElementById("table").innerHTML = "";
        createDeck();
    }
}

// =============================================================================
// DECK LOGIC
// =============================================================================

function selectDeck(deckName) {
    currentDeckName = deckName;
    currentDeck     = [...deckConfig[deckName].cards];
    // Deliberately does NOT reset layoutIndex or clear the table — switching
    // decks only swaps which deck's tray you're drawing from. Whatever's
    // already placed on the table stays put, so decks can be freely mixed
    // within one reading. The layout's position cap (drawOrder.length) still
    // holds because layoutIndex tracks cards placed across all decks
    // combined, not per-deck. Use Refresh Reading to start over.
    createDeck();
}

function shuffleDeck() {
    for (let i = currentDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
    }
    layoutIndex = 0;
    document.getElementById("table").innerHTML = "";
    createDeck();
}

function createDeck() {
    const deckArea = document.getElementById("deck");
    if (!deckArea) return;

    if (!currentDeckName || !deckConfig[currentDeckName]) {
        deckArea.innerHTML = "";
        return;
    }

    const deckConfigEntry = deckConfig[currentDeckName];
    const existingChildren = Array.from(deckArea.children);
    const fragment = document.createDocumentFragment();
    const totalCards = currentDeck.length;
    const maxWidth = Math.max(220, deckArea.offsetWidth - 220);
    const spacing = Math.min(22, maxWidth / Math.max(1, totalCards));
    const deckWidth = totalCards * spacing;

    currentDeck.forEach((card, index) => {
        let cardBack = existingChildren[index];
        if (!cardBack) {
            cardBack = document.createElement("div");
            fragment.appendChild(cardBack);
        }
        cardBack.onclick = () => drawCard(cardBack, card, currentDeckName);

        const isCircular = deckConfigEntry.circular;
        cardBack.className = "deckCard" + (isCircular ? " circular" : "");
        cardBack.style.backgroundImage = `url('${deckConfigEntry.cover}')`;
        cardBack.style.left = `calc(50% + ${index * spacing - deckWidth / 2}px)`;
        cardBack.style.zIndex = index;
        cardBack.dataset.cardId = card;
    });

    existingChildren.slice(totalCards).forEach(child => child.remove());

    if (fragment.childNodes.length) {
        deckArea.appendChild(fragment);
    }
}

// =============================================================================
// DRAW CARD
// =============================================================================

function buildCardFace({ imgSrc, fallbackText, isCircular, pos, size, rotate }) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card" + (isCircular ? " circular" : "");

    if (imgSrc) {
        const safePath = imgSrc.replace(/ /g, "%20");
        cardDiv.style.backgroundImage    = `url("${safePath}")`;
        cardDiv.style.backgroundSize     = isCircular ? "160%" : "cover";
        cardDiv.style.backgroundPosition = "center";
    } else {
        // Should not happen — buildDeckConfigEntry() filters out cards with
        // no move image before they ever reach the draw list. Kept as a safe
        // display-only fallback rather than letting a broken card vanish
        // silently mid-reading.
        cardDiv.classList.add("missingCardImage");
        cardDiv.innerText = fallbackText;
    }

    cardDiv.style.position  = "absolute";
    cardDiv.style.left      = pos.x;
    cardDiv.style.top       = pos.y;
    cardDiv.style.width     = size.width;
    cardDiv.style.height    = isCircular ? size.width : size.height;
    cardDiv.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;

    return cardDiv;
}

function drawCard(cardElement, cardId, deckName) {
    cardElement.remove();

    const index = currentDeck.indexOf(cardId);
    if (index > -1) currentDeck.splice(index, 1);

    if (layoutIndex >= drawOrder.length) {
        currentDeck.push(cardId);
        createDeck();
        return;
    }

    const isCircular = deckConfig[deckName].circular;
    const cardNum     = drawOrder[layoutIndex];
    const pos         = positions[cardNum];
    const size        = layouts[currentLayout].cardSize;
    const rotate      = pos.rotate || 0;
    layoutIndex++;

    const table = document.getElementById("table");

    const cardDiv = buildCardFace({
        imgSrc: getCardImagePath(deckName, cardId),
        fallbackText: deckConfig[deckName]?.nameMap?.[cardId] || "Unknown Card",
        isCircular,
        pos,
        size,
        rotate,
    });
    cardDiv.addEventListener("click", () => openCardDetailPopup(deckName, cardId));
    table.appendChild(cardDiv);
}

function refreshReading() {
    document.getElementById("table").innerHTML = "";
    currentDeck = [...deckConfig[currentDeckName].cards];
    layoutIndex = 0;
    createDeck();
}

// =============================================================================
// INIT
// =============================================================================

createDeck();
loadCustomDecksFromStorage();