let sourceDialect = 'cebuano';
let targetLang = 'english';

// Translation Dictionary
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

// Load custom entries from localStorage and merge into dictionary 
function getCustomDictionary(dialect, target) {
    const custom = JSON.parse(localStorage.getItem('customTranslations') || '[]');
    const merged = {};
    custom
        .filter(e => e.dialect === dialect && e.target === target)
        .forEach(e => { merged[e.source] = e.translation; });
    return merged;
}

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
    ]
};

function setSource(dialect) {
    sourceDialect = dialect;
    document.getElementById('pill-cebuano').classList.toggle('active', dialect === 'cebuano');
    document.getElementById('pill-ilocano').classList.toggle('active', dialect === 'ilocano');
    document.getElementById('source-label').textContent = dialect === 'cebuano' ? 'Cebuano' : 'Ilocano';

    const placeholders = {
        cebuano: 'Isulat dinhi ang imong teksto…',
        ilocano: 'Isuratan ditoy ti teksto mo…'
    };
    document.getElementById('input-text').placeholder = placeholders[dialect];
    renderExamples();
    clearOutput();
}

function setTarget(lang) {
    targetLang = lang;
    document.getElementById('tpill-english').classList.toggle('active', lang === 'english');
    document.getElementById('tpill-tagalog').classList.toggle('active', lang === 'tagalog');
    document.getElementById('target-label').textContent = lang === 'english' ? 'English' : 'Tagalog';
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
    setSource(sourceDialect === 'cebuano' ? 'ilocano' : 'cebuano');
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
    const builtIn = dictionary[sourceDialect][targetLang];
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
        cebuano: { english: "Translation not found. Try a simpler phrase or check the example phrases below.", tagalog: "Hindi mahanap ang salin. Subukan ang mas simpleng parirala." },
        ilocano: { english: "Translation not found. Try a simpler phrase or check the example phrases below.", tagalog: "Hindi mahanap ang salin. Subukan ang mas simpleng parirala." }
    };
    return `<span style="color:rgba(255,251,243,0.4); font-style:italic;">${notFoundMsg[sourceDialect][targetLang]}</span>`;
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
    const list = examples[sourceDialect];
    grid.innerHTML = list.map(e => `
        <div class="example-card" onclick="useExample('${e.text}')">
            <div class="example-source">${e.text}</div>
            <div class="example-meta">${sourceDialect === 'cebuano' ? 'Cebuano' : 'Ilocano'} · ${e.hint}</div>
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