// =============================================================================
// CARD DEFINITIONS
// Defined once. All decks reference these shared lists.
// =============================================================================

const MAJOR_ARCANA = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
    "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
    "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Divine Timing",
    "Judgement", "The World"
];

const CUPS = [
    "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups",
    "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups",
    "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups"
];

const PENTACLES = [
    "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles",
    "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles",
    "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
];

const SWORDS = [
    "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
    "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
    "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords"
];

const WANDS = [
    "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands",
    "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands",
    "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands"
];

const STANDARD_78 = [...MAJOR_ARCANA, ...CUPS, ...PENTACLES, ...SWORDS, ...WANDS];

// deck7 major arcana omits The Chariot, Strength, The Hermit
const MAJOR_ARCANA_DECK7 = MAJOR_ARCANA.filter(c =>
    !["The Chariot", "Strength", "The Hermit"].includes(c)
);

// =============================================================================
// ORACLE CARD LISTS
// =============================================================================

const ORACLE_CARD_LISTS = {
    deck8: [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", "The Devil"
    ],
    deck11: [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", "The Devil"
    ],
    deck12: [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", "The Devil"
    ],
    deck13: [
        "The Chariot", "Strength", "The Hermit", "Wheel of Fortune", "Justice",
        "The Hanged Man", "Death", "The Devil", "The Tower", "The Star",
        "The Moon", "The Sun", "Divine Timing", "Judgement", "The World", "Ace of Cups"
    ],
    deck14: [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice"
    ],
    deck15: [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", "The Devil"
    ],
    deck16: [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", "The Devil"
    ],
    deck17: [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", "The Devil"
    ],
    deck18: [
        "Card One", "Card Two", "Card Three", "Card Four", "Card Five", "Card Six", "Card Seven", "Card Eight", 
        "Card Nine", "Card Ten", "Card Eleven", "Card Twelve", "Card Thirteen", "Card Fourteen", "Card Fifteen", 
        "Card Sixteen", "Card Seventeen", "Card Eighteen", "Card Nineteen", "Card Twenty", "Card Twenty-One", 
        "Card Twenty-Two", "Card Twenty-Three", "Card Twenty-Four", "Card Twenty-Five", "Card Twenty-Six",
        "Card Twenty-Seven", "Card Twenty-Eight", "Card Twenty-Nine", "Card Thirty", "Card Thirty-One",
        "Card Thirty-Two", "Card Thirty-Three", "Card Thirty-Four", "Card Thirty-Five", "Card Thirty-Six",
        "Card Thirty-Seven", "Card Thirty-Eight",  
    ],
    deck19: [
        "Card One", "Card Two", "Card Three", "Card Four", "Card Five", "Card Six", "Card Seven", "Card Eight", 
        "Card Nine", "Card Ten", "Card Eleven", "Card Twelve", "Card Thirteen", "Card Fourteen", "Card Fifteen", 
        "Card Sixteen", "Card Seventeen", "Card Eighteen", "Card Nineteen", "Card Twenty", "Card Twenty-One", 
        "Card Twenty-Two", "Card Twenty-Three", "Card Twenty-Four", "Card Twenty-Five",
    ],
    deck22: [
        "Card One", "Card Two", "Card Three", "Card Four", "Card Five", "Card Six", "Card Seven", "Card Eight", 
        "Card Nine", "Card Ten", "Card Eleven", "Card Twelve", "Card Thirteen", "Card Fourteen", "Card Fifteen", 
        "Card Sixteen", "Card Seventeen", "Card Eighteen", "Card Nineteen", "Card Twenty", "Card Twenty-One", 
        "Card Twenty-Two", "Card Twenty-Three", "Card Twenty-Four", "Card Twenty-Five", "Card Twenty-Six",
        "Card Twenty-Seven", "Card Twenty-Eight", "Card Twenty-Nine", "Card Thirty", "Card Thirty-One",
        "Card Thirty-Two", "Card Thirty-Three", "Card Thirty-Four", "Card Thirty-Five", "Card Thirty-Six",
        "Card Thirty-Seven", "Card Thirty-Eight", "Card Thirty-Nine", "Card Fourty", "Card Fourty-One", "Card Fourty-Two",
        "Card Fourty-Three", "Card Fourty-Four", "Card Fourty-Five",
    ],
    deck24: [
        "Card One", "Card Two", "Card Three", "Card Four", "Card Five", "Card Six", "Card Seven", "Card Eight", 
        "Card Nine", "Card Ten", "Card Eleven", "Card Twelve", "Card Thirteen",
    ],
    deck25: [
        "Card One", "Card Two", "Card Three", "Card Four", "Card Five", "Card Six", "Card Seven", "Card Eight", 
        "Card Nine", "Card Ten", "Card Eleven", "Card Twelve", "Card Thirteen", "Card Fourteen", "Card Fifteen", 
        "Card Sixteen", "Card Seventeen", "Card Eighteen", "Card Nineteen", "Card Twenty", "Card Twenty-One", 
        "Card Twenty-Two", "Card Twenty-Three", "Card Twenty-Four", "Card Twenty-Five", "Card Twenty-Six", "Card Twenty-Seven", 
    ],
    deck26: [
        "Card One", "Card Two", "Card Three", "Card Four", "Card Five", "Card Six", "Card Seven",
    ],
    deck27: [
        "Card One", "Card Two", "Card Three", "Card Four", "Card Five", "Card Six", "Card Seven", "Card Eight", 
        "Card Nine", "Card Ten", "Card Eleven", "Card Twelve", "Card Thirteen", "Card Fourteen", "Card Fifteen", 
        "Card Sixteen", "Card Seventeen", "Card Eighteen", "Card Nineteen", "Card Twenty", "Card Twenty-One", 
        "Card Twenty-Two", "Card Twenty-Three", "Card Twenty-Four", "Card Twenty-Five", "Card Twenty-Six", "Card Twenty-Seven", 
        "Card Twenty-Eight", "Card Twenty-Nine", "Card Thirty", "Card Thirty-One",
        "Card Thirty-Two", "Card Thirty-Three", "Card Thirty-Four", "Card Thirty-Five",
    ],
};

// =============================================================================
// DECK REGISTRY
// =============================================================================

const deckConfig = {};

// =============================================================================
// IMAGE PATH RESOLVER
// =============================================================================

function getCardImagePath(deckName, cardName) {
    if (deckConfig[deckName] && deckConfig[deckName].custom) {
        return deckConfig[deckName].cardMap[cardName] || null;
    }
    return null;
}

function getSuitSlug(cardName, suitSlugs) {
    if (MAJOR_ARCANA.includes(cardName)) return suitSlugs.major;
    if (CUPS.includes(cardName))         return suitSlugs.cups;
    if (PENTACLES.includes(cardName))    return suitSlugs.pentacles;
    if (SWORDS.includes(cardName))       return suitSlugs.swords;
    if (WANDS.includes(cardName))        return suitSlugs.wands;
    return null;
}

const deckThemes = {
    deck1:  { theme: "sheep",    suitSlugs: { major: "major", cups: "water",     pentacles: "coins",     swords: "swords", wands: "wands" } },
    deck2:  { theme: "mouse",    suitSlugs: { major: "major", cups: "cups",      pentacles: "pentacles", swords: "swords", wands: "wands" } },
    deck3:  { theme: "pirate",   suitSlugs: { major: "major", cups: "cups",      pentacles: "pentacles", swords: "swords", wands: "wands" } },
    deck4:  { theme: "medieval", suitSlugs: { major: "major", cups: "cups",     pentacles: "pentacles",      swords: "swords", wands: "wands" } },
    deck5:  { theme: "writers",  suitSlugs: { major: "major", cups: "cups",      pentacles: "coins",     swords: "swords", wands: "wands" } },
    deck6:  { theme: "romance",  suitSlugs: { major: "major", cups: "cups",      pentacles: "coins",     swords: "swords", wands: "wands" } },
    deck7:  { theme: "mermaid",  suitSlugs: { major: "major", cups: "cups",      pentacles: "pentacles", swords: "swords", wands: "wands" } },
    deck9:  { theme: "indie",    suitSlugs: { major: "major", cups: "cups",     pentacles: "coins",     swords: "swords", wands: "wands" } },
    deck10: { theme: "lion",     suitSlugs: { major: "major", cups: "water",     pentacles: "coins",     swords: "swords", wands: "wands" } },
    deck21: { theme: "spirit",   suitSlugs: { major: "major", cups: "water",     pentacles: "coins",     swords: "swords", wands: "wands" } },
    deck23: { theme: "mushroom", suitSlugs: { major: "major", cups: "cups",     pentacles: "pentacles", swords: "swords", wands: "wands" } },
};

function standardImagePath(deckName, cardName) {
    const cfg = deckThemes[deckName];
    if (!cfg) return null;
    const index = CARD_INDEX[cardName];
    const suit  = getSuitSlug(cardName, cfg.suitSlugs);
    if (index === undefined || !suit) return null;
    return `img/${deckName}/${index}${cfg.theme}-${suit}.png`;
}

function oracleNumericPath(deckName, cardName) {
    const cards = ORACLE_CARD_LISTS[deckName];
    if (!cards) return null;
    const slot = cards.indexOf(cardName) + 1;
    if (slot === 0) return null;
    return `img/${deckName}/${slot}.png`;
}

function getCardImagePath(deckName, cardName) {
    // Custom deck — use stored base64 image
    if (deckConfig[deckName] && deckConfig[deckName].custom) {
        return deckConfig[deckName].cardMap[cardName] || null;
    }
    if (ORACLE_CARD_LISTS[deckName]) return oracleNumericPath(deckName, cardName);
    return standardImagePath(deckName, cardName);
}




// =============================================================================
// LAYOUTS
// Add new layouts here — positions and draw order only.
// =============================================================================

const layouts = {
    tarot: {
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
    dragon: {
        cardSize: { width: '80px', height: '130px' },
        1:  { x: '45%', y: '10%' },
        2:  { x: '45%', y: '40%' },
        3:  { x: '55%', y: '15%' },
        4:  { x: '35%', y: '15%' },
        5:  { x: '45%', y: '60%' },
        6:  { x: '25%', y: '40%' },
        7:  { x: '15%', y: '30%' },
        8:  { x: '65%', y: '40%' },
        9:  { x: '75%', y: '30%' },
        10: { x: '45%', y: '85%' },
    },
    circle: {
        cardSize: { width: '80px', height: '130px' },
        1: { x: '50%', y: '15%' },
        2: { x: '83%', y: '31%' },
        3: { x: '71%', y: '68%' },
        4: { x: '29%', y: '68%' },
        5: { x: '17%', y: '31%' },
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

    celtic: {
        cardSize: { width: '120px', height: '200px' },
        1:  { x: '35%', y: '40%' },
        2:  { x: '35%', y: '40%', rotate: 90 },
        3:  { x: '35%', y: '20%' },
        4:  { x: '35%', y: '60%' },
        5:  { x: '15%', y: '40%' },
        6:  { x: '55%', y: '40%' },
        7:  { x: '75%', y: '70%' },
        8:  { x: '75%', y: '55%' },
        9:  { x: '75%', y: '40%' },
        10: { x: '75%', y: '25%' },
},

};

const drawOrders = {
    tarot:  [1, 2, 3, 4, 5, 6, 7, 8],
    dragon: [4, 1, 3, 6, 2, 8, 7, 9, 5, 10],
    circle: [1, 2, 3, 4, 5],
    slant: [1, 2, 3, 4],
    celtic: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    vformation: [1, 7, 2, 6, 3, 5, 4],
    // ADD THIS:
    custom: [],
};

// =============================================================================
// RUNTIME STATE
// =============================================================================

let currentDeckName = null;
let currentDeck     = [];
let activeDeckType  = "tarot";
let layoutIndex     = 0;
let currentLayout = 'tarot';
let positions       = layouts.tarot;      // default layout
let drawOrder       = drawOrders.tarot;   // default draw order

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

document.getElementById("toggleDeckBar").onclick = function () {
    deckSelector.classList.toggle("collapsed");
    const collapsed = deckSelector.classList.contains("collapsed");
    this.classList.toggle("collapsed", collapsed);
};

document.addEventListener("DOMContentLoaded", () => {
    const settingsBar = document.getElementById("settingsBar");
    const toggleBtn   = document.getElementById("toggleSettingsBar");
    settingsBar.classList.add("collapsed");
    toggleBtn.onclick = () => settingsBar.classList.toggle("collapsed");
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
        document.getElementById("settingsBar").classList.add("collapsed");
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

}); // end DOMContentLoaded



// =============================================================================
// LAYOUT PICKER CLOSE HELPER
// =============================================================================

function closeLayoutPicker() {
    document.getElementById("layoutPickerOverlay").classList.remove("open");
    document.getElementById("settingsBar").classList.add("collapsed");
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
let customDeckType     = 'tarot';
let customDeckTab      = 'tarot';
let editingDeckId      = null;
let activeDeckCarouselApi = null;

const CUSTOM_DECKS_STORAGE_KEY = 'customDecks';
const CUSTOM_DECKS_DB_NAME = 'white-sage-custom-decks';
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

async function loadCustomDecksFromStorage() {
    const saved = await getStoredCustomDecks();
    if (Array.isArray(saved) && saved.length > 0) {
        saved.forEach(deckData => registerCustomDeck(deckData));
        return;
    }

    const legacyDecks = JSON.parse(localStorage.getItem(CUSTOM_DECKS_STORAGE_KEY) || '[]');
    legacyDecks.forEach(deckData => registerCustomDeck(deckData));
}

function openCustomDeckBuilder() {
    customDeckCards    = [];
    customDeckCoverUrl = null;
    customDeckType     = 'tarot';
    customDeckTab      = 'tarot';

    document.getElementById('customDeckName').value           = '';
    document.getElementById('customDeckCoverName').textContent = 'No file chosen';
    document.getElementById('customDeckCoverPreview').style.display = 'none';
    document.getElementById('customDeckSaveBtn').disabled      = true;

    document.querySelectorAll('.customDeckTypeBtn').forEach(b => {
        b.classList.toggle('active', b.dataset.type === 'tarot');
    });
    document.querySelectorAll('.customDeckTabBtn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === 'tarot');
    });

    activeDeckCarouselApi = createCarousel('createCarousel', [], customDeckType, (filledCards) => {
        customDeckCards = filledCards;
        checkCustomDeckReady();
    });

    switchDeckModalTab('create', document.querySelector('.customDeckTabSwitch'));
    document.getElementById('customDeckOverlay').classList.add('open');
}

function closeCustomDeckBuilder() {
    document.getElementById('customDeckOverlay').classList.remove('open');
}

// =============================================================================
// DECK CARD CAROUSEL
// =============================================================================

const CAROUSEL_VISIBLE = 3;

function getAutoCardName(idx, type) {
    if (type === 'tarot' && STANDARD_78[idx]) return STANDARD_78[idx];
    return `Card ${idx + 1}`;
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

function createCarousel(containerId, initialCards, deckType, onUpdate) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let cards = initialCards.length > 0
        ? [...initialCards, { name: getAutoCardName(initialCards.length, deckType), dataUrl: null }]
        : [{ name: getAutoCardName(0, deckType), dataUrl: null }];

    let offset      = 0;
    let pendingSlot = null;

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
            cards[pendingSlot].dataUrl = dataUrl;
            ensureEmptySlot();
            render();
            onUpdate(getFilledCards());
            if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
        } catch (err) {
            console.error(err);
        }
        fileInput.value = '';
    });

    function getFilledCards() {
        return cards.filter(c => c.dataUrl !== null);
    }

    function ensureEmptySlot() {
        const filledCards = cards.filter(c => c.dataUrl !== null);
        cards = [...filledCards, { name: getAutoCardName(filledCards.length, deckType), dataUrl: null }];
    }

    function triggerUpload(idx) {
        pendingSlot = idx;
        fileInput.click();
    }

    const api = {
        replaceCards(nextCards) {
            cards = (nextCards.length > 0 ? nextCards : [{ name: getAutoCardName(0, deckType), dataUrl: null }])
                .map((card, idx) => ({
                    name: card.name || getAutoCardName(idx, deckType),
                    dataUrl: card.dataUrl || null,
                }));
            offset = 0;
            ensureEmptySlot();
            render();
            onUpdate(getFilledCards());
            if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
        }
    };

    function deleteCard(idx) {
        if (cards.filter(c => c.dataUrl).length <= 1 && cards[idx].dataUrl) {
            cards[idx].dataUrl = null;
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

    function render() {
        container.innerHTML = '';
        container.appendChild(fileInput);
        container.className = 'deckCarousel';

        const counter = document.createElement('div');
        counter.className = 'carousel-counter';
        const filled = cards.filter(c => c.dataUrl).length;
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

            const slot = document.createElement('div');
            slot.className = 'card-slot' + (card.dataUrl ? ' filled' : '');

            if (card.dataUrl) {
                const img = document.createElement('img');
                img.src = card.dataUrl;
                slot.appendChild(img);

                const overlay = document.createElement('div');
                overlay.className = 'card-slot-overlay';

                const replBtn = document.createElement('button');
                replBtn.textContent = 'Replace';
                replBtn.onclick = () => triggerUpload(realIdx);

                const delBtn = document.createElement('button');
                delBtn.textContent = 'Remove';
                delBtn.className   = 'del-btn';
                delBtn.onclick     = () => deleteCard(realIdx);

                overlay.appendChild(replBtn);
                overlay.appendChild(delBtn);
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
                    reader.onload = (ev) => {
                        cards[realIdx].dataUrl = ev.target.result;
                        ensureEmptySlot();
                        render();
                        onUpdate(getFilledCards());
                    };
                    reader.readAsDataURL(file);
                });
            }

            const nameInput = document.createElement('input');
            nameInput.type        = 'text';
            nameInput.className   = 'card-name-input';
            nameInput.value       = card.name;
            nameInput.placeholder = `Card ${realIdx + 1}`;
            nameInput.oninput     = () => {
                cards[realIdx].name = nameInput.value;
                onUpdate(getFilledCards());
            };

            col.appendChild(slot);
            col.appendChild(nameInput);
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

async function handleBulkCardUpload(event) {
    const files = Array.from(event.target.files || []).filter(file => file.type.startsWith('image/'));
    if (!files.length || !activeDeckCarouselApi) return;

    const preparedCards = [];
    for (const [idx, file] of files.entries()) {
        const dataUrl = await readFileAsDataUrl(file, {
            maxWidth: 560,
            maxHeight: 900,
            mimeType: 'image/jpeg',
            quality: 0.8,
        });
        preparedCards.push({
            name: getAutoCardName(idx, customDeckType),
            dataUrl,
        });
    }

    activeDeckCarouselApi.replaceCards(preparedCards);
    if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
    event.target.value = '';
}

function switchDeckModalTab(tab, btn) {
    if (btn) {
        document.querySelectorAll('.customDeckTabSwitch').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

function setCustomDeckType(btn) {
    customDeckType = btn.dataset.type;
    document.querySelectorAll('.customDeckTypeBtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
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
    const id   = 'customdeck_' + Date.now();

    const deckData = {
        id,
        name,
        type:     customDeckTab,
        deckType: customDeckType,
        cover:    customDeckCoverUrl,
        cards:    customDeckCards,
    };

    try {
        const existing = await getStoredCustomDecks();
        existing.push(deckData);
        await saveCustomDecksToStorage(existing);
    } catch (err) {
        console.error('Unable to save custom deck:', err);
        alert('Unable to save the custom deck. Please reduce image size, use fewer cards, or try again in a supported browser.');
        return;
    }

    registerCustomDeck(deckData);
    closeCustomDeckBuilder();
}

function registerCustomDeck(deckData) {
    if (deckConfig[deckData.id]) return;

    deckConfig[deckData.id] = {
        cards:   deckData.cards.map(c => c.name),
        cover:   deckData.cover,
        type:    deckData.type,
        custom:  true,
        cardMap: Object.fromEntries(deckData.cards.map(c => [c.name, c.dataUrl])),
    };

    addCustomDeckButton(deckData);
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
        createDeck();
    }
}

// =============================================================================
// DECK LOGIC
// =============================================================================

function selectDeck(deckName) {
    currentDeckName = deckName;
    currentDeck     = [...deckConfig[deckName].cards];
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
            cardBack.onclick = () => drawCard(cardBack, card, currentDeckName);
            fragment.appendChild(cardBack);
        }

        const isCircular = deckConfigEntry.circular;
        cardBack.className = "deckCard" + (isCircular ? " circular" : "");
        cardBack.style.backgroundImage = `url('${deckConfigEntry.cover}')`;
        cardBack.style.left = `calc(50% + ${index * spacing - deckWidth / 2}px)`;
        cardBack.style.zIndex = index;
        cardBack.dataset.cardName = card;
    });

    existingChildren.slice(totalCards).forEach(child => child.remove());

    if (fragment.childNodes.length) {
        deckArea.appendChild(fragment);
    }
}

// =============================================================================
// DRAW CARD
// =============================================================================

function drawCard(cardElement, cardName, deckName) {
    cardElement.remove();

    const index = currentDeck.indexOf(cardName);
    if (index > -1) currentDeck.splice(index, 1);

    if (layoutIndex >= drawOrder.length) {
        currentDeck.push(cardName);
        createDeck();
        return;
    }

    const cardDiv = document.createElement("div");
    const isCircular = deckConfig[deckName].circular;
    cardDiv.className = "card" + (isCircular ? " circular" : "");

    const imgSrc = getCardImagePath(deckName, cardName);

    if (imgSrc) {
        const safePath = imgSrc.replace(/ /g, "%20");
        cardDiv.style.backgroundImage    = `url("${safePath}")`;
        cardDiv.style.backgroundSize     = isCircular ? "160%" : "cover";
        cardDiv.style.backgroundPosition = "center";
    } else {
        cardDiv.innerText = `${cardName} (${deckName})`;
    }

    cardDiv.style.position = "absolute";

    const cardNum = drawOrder[layoutIndex];
    const pos     = positions[cardNum];
    const size    = layouts[currentLayout].cardSize;
    cardDiv.style.left      = pos.x;
    cardDiv.style.top       = pos.y;
    cardDiv.style.width     = size.width;
    cardDiv.style.height    = isCircular ? size.width : size.height;
    const rotate = pos.rotate || 0;
    cardDiv.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
    layoutIndex++;

    document.getElementById("table").appendChild(cardDiv);
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