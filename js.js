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

// shared translations loaded from Firestore on page load
let firestoreEntries = [];

async function loadFirestoreEntries() {
    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js");
        const { getFirestore, getDocs, collection } = await import("https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js");

        const firebaseConfig = {
            apiKey: "AIzaSyDfxfkFldcQAw45qYFQQ_SIBaIfWAsQToo",
            authDomain: "filipino-converter.firebaseapp.com",
            projectId: "filipino-converter",
            storageBucket: "filipino-converter.firebasestorage.app",
            messagingSenderId: "955763378837",
            appId: "1:955763378837:web:196ca6e1e522ff3b20e99c"
        };

        const app = initializeApp(firebaseConfig, 'js-app');
        const db = getFirestore(app);
        const snapshot = await getDocs(collection(db, 'translations'));
        firestoreEntries = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
        console.error('Could not load shared translations:', err);
    }
}

function getCustomDictionary(source, target) {
    const merged = {};
    firestoreEntries
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
    cebuano: 'Type your text here…',
    ilocano: 'Type your text here…',
    english: 'Type your text here…',
    tagalog: 'Type your text here…'
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
        tagalog: "Translation not found. Try a simpler phrase or check the example phrases below.",
        cebuano: "Translation not found. Try a simpler phrase or check the example phrases below.",
        ilocano: "Translation not found. Try a simpler phrase or check the example phrases below."
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
        <div class="example-card" data-text="${e.text}">
            <div class="example-source">${e.text}</div>
            <div class="example-meta">${sourceLabels[sourceDialect]} · ${e.hint}</div>
        </div>
    `).join('');

    // event delegation since cards are dynamically rendered
    grid.querySelectorAll('.example-card').forEach(card => {
        card.addEventListener('click', () => useExample(card.dataset.text));
    });
}

function useExample(text) {
    document.getElementById('input-text').value = text;
    updateCharCount();
    runTranslation();
}

// attach event listeners instead of using onclick attributes in HTML
document.getElementById('pill-cebuano').addEventListener('click', () => setSource('cebuano'));
document.getElementById('pill-ilocano').addEventListener('click', () => setSource('ilocano'));
document.getElementById('pill-english').addEventListener('click', () => setSource('english'));
document.getElementById('pill-tagalog').addEventListener('click', () => setSource('tagalog'));
document.getElementById('swap-btn').addEventListener('click', swapLanguages);
document.getElementById('translate-btn').addEventListener('click', runTranslation);
document.getElementById('copy-btn').addEventListener('click', copyResult);
document.getElementById('input-text').addEventListener('input', updateCharCount);

document.getElementById('tpill-0').addEventListener('click', function() { setTarget(this.dataset.lang); });
document.getElementById('tpill-1').addEventListener('click', function() { setTarget(this.dataset.lang); });

// Init
setSource('cebuano');
loadFirestoreEntries();