let sourceDialect = 'cebuano';
let targetLang = 'english';

const dictionary = {
    cebuano: {
        english: {
            "maayong buntag": "good morning",
            "salamat kaayo": "thank you very much",
            "unsay imong ngalan": "what is your name",
            "gutom ko": "i'm hungry",
            "mahal ko ikaw": "i love you",
            "pag-amping": "take care"
        },
        tagalog: {
            "maayong buntag": "magandang umaga",
            "salamat kaayo": "maraming salamat",
            "unsay imong ngalan": "ano ang iyong pangalan",
            "gutom ko": "nagugutom ako",
            "mahal ko ikaw": "mahal kita",
            "pag-amping": "mag-ingat ka"
        }
    },
    ilocano: {
        english: {
            "naimbag a bigat": "good morning",
            "agyamanak": "thank you",
            "ania ti naganmo": "what is your name",
            "agbitbitinnak": "i'm hungry",
            "ay-ayatenka": "i love you",
            "agingkamom": "take care"
        },
        tagalog: {
            "naimbag a bigat": "magandang umaga",
            "agyamanak": "salamat",
            "ania ti naganmo": "ano ang iyong pangalan",
            "agbitbitinnak": "nagugutom ako",
            "ay-ayatenka": "mahal kita",
            "agingkamom": "mag-ingat"
        }
    }
};

// Build reverse dictionaries from the existing ones
// e.g. english -> cebuano, tagalog -> ilocano, etc.
function buildReverseDictionaries() {
    const reversed = {};
    for (const source in dictionary) {
        for (const target in dictionary[source]) {
            if (!reversed[target]) reversed[target] = {};
            if (!reversed[target][source]) reversed[target][source] = {};
            for (const phrase in dictionary[source][target]) {
                const translation = dictionary[source][target][phrase];
                // don't overwrite if already set — first one wins
                if (!reversed[target][source][translation]) {
                    reversed[target][source][translation] = phrase;
                }
            }
        }
    }
    return reversed;
}

const reverseDictionary = buildReverseDictionaries();

// All available source languages
const allSources = ['cebuano', 'ilocano', 'english', 'tagalog'];

// What targets are valid for a given source
function getValidTargets(source) {
    if (source === 'cebuano' || source === 'ilocano') return ['english', 'tagalog'];
    if (source === 'english') return ['cebuano', 'ilocano'];
    if (source === 'tagalog') return ['cebuano', 'ilocano'];
    return [];
}

function getDict(source, target) {
    // Built-in forward direction
    if (dictionary[source] && dictionary[source][target]) {
        return dictionary[source][target];
    }
    // Reverse direction
    if (reverseDictionary[source] && reverseDictionary[source][target]) {
        return reverseDictionary[source][target];
    }
    return {};
}

function getCustomDictionary(source, target) {
    const custom = JSON.parse(localStorage.getItem('customTranslations') || '[]');
    const merged = {};
    custom
        .filter(e => e.dialect === source && e.target === target)
        .forEach(e => { merged[e.source] = e.translation; });
    return merged;
}

const sourceLabels = {
    cebuano: 'Cebuano',
    ilocano: 'Ilocano',
    english: 'English',
    tagalog: 'Tagalog'
};

const placeholders = {
    cebuano: 'Isulat dinhi ang imong teksto…',
    ilocano: 'Isuratan ditoy ti teksto mo…',
    english: 'Type your text here…',
    tagalog: 'Isulat ang iyong teksto dito…'
};

const examples = {
    cebuano: [
        { text: "Maayong buntag!", hint: "Greeting" },
        { text: "Salamat kaayo", hint: "Gratitude" },
        { text: "Unsay imong ngalan?", hint: "Question" },
        { text: "Gutom ko", hint: "Expression" },
        { text: "Mahal ko ikaw", hint: "Emotion" },
        { text: "Pag-amping!", hint: "Farewell" },
    ],
    ilocano: [
        { text: "Naimbag a bigat!", hint: "Greeting" },
        { text: "Agyamanak", hint: "Gratitude" },
        { text: "Ania ti naganmo?", hint: "Question" },
        { text: "Agbitbitinnak", hint: "Expression" },
        { text: "Ay-ayatenka", hint: "Emotion" },
        { text: "Agingkamom!", hint: "Farewell" },
    ],
    english: [
        { text: "Good morning", hint: "Greeting" },
        { text: "Thank you very much", hint: "Gratitude" },
        { text: "What is your name?", hint: "Question" },
        { text: "I'm hungry", hint: "Expression" },
        { text: "I love you", hint: "Emotion" },
        { text: "Take care!", hint: "Farewell" },
    ],
    tagalog: [
        { text: "Magandang umaga!", hint: "Greeting" },
        { text: "Maraming salamat", hint: "Gratitude" },
        { text: "Ano ang iyong pangalan?", hint: "Question" },
        { text: "Nagugutom ako", hint: "Expression" },
        { text: "Mahal kita", hint: "Emotion" },
        { text: "Mag-ingat ka!", hint: "Farewell" },
    ]
};

function setSource(source) {
    sourceDialect = source;

    // update pill states
    allSources.forEach(s => {
        const el = document.getElementById(`pill-${s}`);
        if (el) el.classList.toggle('active', s === source);
    });

    document.getElementById('source-label').textContent = sourceLabels[source];
    document.getElementById('input-text').placeholder = placeholders[source];

    // update target pills to only show valid options
    const validTargets = getValidTargets(source);
    validTargets.forEach((t, i) => {
        const el = document.getElementById(`tpill-${i}`);
        if (el) {
            el.textContent = sourceLabels[t];
            el.dataset.lang = t;
        }
    });

    // default to first valid target
    setTarget(validTargets[0]);
    renderExamples();
    clearOutput();
}

function setTarget(lang) {
    targetLang = lang;

    const validTargets = getValidTargets(sourceDialect);
    validTargets.forEach((t, i) => {
        const el = document.getElementById(`tpill-${i}`);
        if (el) el.classList.toggle('active', t === lang);
    });

    document.getElementById('target-label').textContent = sourceLabels[lang];
    clearOutput();
}

function clearOutput() {
    document.getElementById('output-area').innerHTML = '<span class="placeholder-text">Translation will appear here…</span>';
}

function updateCharCount() {
    const len = document.getElementById('input-text').value.length;
    document.getElementById('char-count').textContent = len;
}

function swapLanguages() {
    const validTargets = getValidTargets(sourceDialect);
    // swap source to current target if it's a valid source
    if (allSources.includes(targetLang)) {
        const oldSource = sourceDialect;
        setSource(targetLang);
        // try to set target back to old source if valid
        const newValidTargets = getValidTargets(targetLang);
        if (newValidTargets.includes(oldSource)) {
            setTarget(oldSource);
        }
    }
}

function runTranslation() {
    const input = document.getElementById('input-text').value.trim().toLowerCase();
    if (!input) { showToast('Please enter some text first!'); return; }

    const outputArea = document.getElementById('output-area');
    outputArea.innerHTML = '<div class="loading-dots"><span>·</span><span>·</span><span>·</span></div>';

    setTimeout(() => {
        const result = performTranslation(input);
        outputArea.innerHTML = `<div class="result-text">${result}</div>`;
    }, 700);
}

function performTranslation(input) {
    const builtIn = getDict(sourceDialect, targetLang);
    const custom = getCustomDictionary(sourceDialect, targetLang);
    const dict = Object.assign({}, builtIn, custom);

    let result = input;
    let translated = false;

    if (dict[input]) {
        result = capitalize(dict[input]);
        translated = true;
    } else {
        let working = input;
        const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
        for (const key of keys) {
            const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp('(?<![\\w\u00C0-\u024F])' + escaped + '(?![\\w\u00C0-\u024F])', 'gi');
            if (regex.test(working)) {
                working = working.replace(regex, dict[key]);
                translated = true;
            }
        }
        result = translated ? capitalize(working) : null;
    }

    if (result) return result;

    const notFoundMsg = {
        english: "Translation not found. Try a simpler phrase or check the example phrases below.",
        tagalog: "Hindi mahanap ang salin. Subukan ang mas simpleng parirala.",
        cebuano: "Wala makit-an ang hubad. Sulayi ang mas simple nga pulong.",
        ilocano: "Saannak a nabirukan ti patarus. Suruken ti aniaman a simple a balikas."
    };
    return `<span style="color:rgba(255,251,243,0.4); font-style:italic;">${notFoundMsg[targetLang]}</span>`;
}

function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function copyResult() {
    const area = document.getElementById('output-area');
    const text = area.querySelector('.result-text')?.textContent;
    if (!text) { showToast('Nothing to copy yet!'); return; }
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
}

function renderExamples() {
    const grid = document.getElementById('examples-grid');
    const list = examples[sourceDialect] || [];
    grid.innerHTML = list.map(e => `
        <div class="example-card" onclick="useExample('${e.text}')">
            <div class="example-source">${e.text}</div>
            <div class="example-meta">${sourceLabels[sourceDialect]} · ${e.hint}</div>
        </div>
    `).join('');
}

function useExample(text) {
    document.getElementById('input-text').value = text;
    updateCharCount();
    runTranslation();
}

// Init
renderExamples();