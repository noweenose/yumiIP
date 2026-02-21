let sourceDialect = 'cebuano';
let targetLang = 'english';

// ── Translation Dictionary ─────────────────────────────────────────
const dictionary = {
    cebuano: {
    english: {
        // Greetings
        "maayong buntag": "good morning",
        "maayong hapon": "good afternoon",
        "maayong gabi": "good evening",
        "kumusta ka": "how are you",
        "kumusta": "how are you",
        "maayo man": "i am fine",
        "salamat": "thank you",
        "palihug": "please",
        "oo": "yes",
        "dili": "no",
        "wala": "none / nothing",
        // Common phrases
        "unsa imong ngalan": "what is your name",
        "ang akong ngalan": "my name is",
        "taga asa ka": "where are you from",
        "mahigma ko nimo": "i like you",
        "gusto nako": "i want",
        "dili ko gusto": "i don't want",
        "unsay buot nimong isulti": "what do you mean",
        "ayaw kalimti": "don't forget",
        "magkita ta": "let us meet",
        "palihug tabang": "please help",
        "ok lang": "it's okay",
        "pasensya na": "i'm sorry",
        "asa ka": "where are you",
        "naa ko diri": "i'm here",
        "sige": "okay / alright",
        "busog na ko": "i'm already full",
        "gutom ko": "i'm hungry",
        "uhaw ko": "i'm thirsty",
        "dugay na": "it's been a long time",
        "pila": "how much",
        "unsa": "what",
        "kinsa": "who",
        "kanus-a": "when",
        "ngano": "why",
        "giunsa": "how",
        "diin": "where",
        "mahal ko ikaw": "i love you",
        "ingon ana": "like that / that's how it is",
        "atong adto": "let us go",
        "dali na": "come on / hurry up",
        "pag-amping": "take care",
        "amping": "take care",
        "kaon ta": "let's eat",
        "kaon": "eat",
        "tulog na": "sleep now",
        "tulog": "sleep",
        "larga na": "let's go already",
        "unsa na": "what now",
        "bata": "child",
        "inahan": "mother",
        "amahan": "father",
        "igsoon": "sibling",
        "bayad": "payment",
        "tubig": "water",
        "pagkaon": "food",
        "balay": "house",
        "dako": "big",
        "gamay": "small",
        "puti": "white",
        "itom": "black",
        "pula": "red",
        "berde": "green",
        "asul": "blue",
        "bulag": "blind",
        "bunog": "deaf",
        "daghan": "many / a lot",
        "pila ka": "how many",
        "isip": "think",
        "bisita": "visit",
    },
    tagalog: {
        "maayong buntag": "magandang umaga",
        "maayong hapon": "magandang hapon",
        "maayong gabi": "magandang gabi",
        "kumusta ka": "kumusta ka",
        "kumusta": "kumusta",
        "maayo man": "mabuti naman",
        "salamat": "salamat",
        "palihug": "pakiusap",
        "oo": "oo",
        "dili": "hindi",
        "wala": "wala",
        "unsa imong ngalan": "ano ang iyong pangalan",
        "ang akong ngalan": "ang aking pangalan ay",
        "taga asa ka": "taga saan ka",
        "mahigma ko nimo": "gusto kita",
        "gusto nako": "gusto ko",
        "dili ko gusto": "ayaw ko",
        "unsay buot nimong isulti": "ano ang ibig mong sabihin",
        "ayaw kalimti": "huwag kalimutan",
        "magkita ta": "magkita tayo",
        "palihug tabang": "pakiusap tulungan mo ako",
        "ok lang": "ok lang",
        "pasensya na": "patawad",
        "asa ka": "nasaan ka",
        "naa ko diri": "nandito ako",
        "sige": "sige",
        "busog na ko": "busog na ako",
        "gutom ko": "nagugutom ako",
        "uhaw ko": "nauuhaw ako",
        "dugay na": "matagal na",
        "pila": "magkano",
        "unsa": "ano",
        "kinsa": "sino",
        "kanus-a": "kailan",
        "ngano": "bakit",
        "giunsa": "paano",
        "diin": "saan",
        "mahal ko ikaw": "mahal kita",
        "ingon ana": "ganyan",
        "atong adto": "tayo na",
        "dali na": "halika na",
        "pag-amping": "mag-ingat ka",
        "amping": "mag-ingat",
        "kaon ta": "kumain tayo",
        "kaon": "kumain",
        "tulog na": "matulog na",
        "tulog": "matulog",
        "larga na": "sige na",
        "bata": "bata",
        "inahan": "nanay",
        "amahan": "tatay",
        "igsoon": "kapatid",
        "bayad": "bayad",
        "tubig": "tubig",
        "pagkaon": "pagkain",
        "balay": "bahay",
        "dako": "malaki",
        "gamay": "maliit",
        "puti": "puti",
        "itom": "itim",
        "pula": "pula",
        "berde": "berde",
        "asul": "asul",
        "daghan": "marami",
    }
    },
    ilocano: {
    english: {
        "naimbag a bigat": "good morning",
        "naimbag a malem": "good afternoon",
        "naimbag a rabii": "good evening",
        "kumusta ka": "how are you",
        "kumusta": "how are you",
        "naimbag met laeng": "i am fine",
        "agyamanak": "thank you",
        "pangngaasim": "please",
        "wen": "yes",
        "saan": "no",
        "awan": "none / nothing",
        "ania ti naganmo": "what is your name",
        "ti naganko": "my name is",
        "tagakano": "where are you from",
        "kayatko ka": "i like you",
        "kayatko": "i want",
        "saan ko kayat": "i don't want",
        "ania ti kayatmo a sawen": "what do you mean",
        "saan mo lipatenen": "don't forget",
        "agkitata": "let us meet",
        "tulong": "help",
        "maymaysa laeng": "it's okay",
        "dispensarem": "i'm sorry",
        "sadino ka": "where are you",
        "adda ak ditoy": "i'm here",
        "sige": "okay / alright",
        "nabusog ak": "i'm already full",
        "agbitbitinnak": "i'm hungry",
        "mauyongak": "i'm thirsty",
        "nasurok": "it's been a long time",
        "mano": "how much",
        "ania": "what",
        "sino": "who",
        "kaano": "when",
        "apay": "why",
        "kasano": "how",
        "sadino": "where",
        "ay-ayatenka": "i love you",
        "kasta": "like that / that's how it is",
        "mapanta": "let us go",
        "madaras": "hurry up",
        "agingkamom": "take care",
        "manganta": "let's eat",
        "mangan": "eat",
        "matmaturogka": "sleep now",
        "matulog": "sleep",
        "ubing": "child",
        "nanang": "mother",
        "tatang": "father",
        "kabsat": "sibling",
        "bayad": "payment",
        "danum": "water",
        "taraon": "food",
        "balay": "house",
        "dakkel": "big",
        "bassit": "small",
        "puraw": "white",
        "nangisit": "black",
        "nalabbaga": "red",
        "nalungtian": "green",
        "naribok": "blue",
        "adu": "many / a lot",
        "mano nga": "how many",
    },
    tagalog: {
        "naimbag a bigat": "magandang umaga",
        "naimbag a malem": "magandang hapon",
        "naimbag a rabii": "magandang gabi",
        "kumusta ka": "kumusta ka",
        "kumusta": "kumusta",
        "naimbag met laeng": "mabuti naman",
        "agyamanak": "salamat",
        "pangngaasim": "pakiusap",
        "wen": "oo",
        "saan": "hindi",
        "awan": "wala",
        "ania ti naganmo": "ano ang iyong pangalan",
        "ti naganko": "ang aking pangalan ay",
        "tagakano": "taga saan ka",
        "kayatko ka": "gusto kita",
        "kayatko": "gusto ko",
        "saan ko kayat": "ayaw ko",
        "ania ti kayatmo a sawen": "ano ang ibig mong sabihin",
        "saan mo lipatenen": "huwag kalimutan",
        "agkitata": "magkita tayo",
        "tulong": "tulong",
        "maymaysa laeng": "ok lang",
        "dispensarem": "patawad",
        "sadino ka": "nasaan ka",
        "adda ak ditoy": "nandito ako",
        "sige": "sige",
        "nabusog ak": "busog na ako",
        "agbitbitinnak": "nagugutom ako",
        "mauyongak": "nauuhaw ako",
        "nasurok": "matagal na",
        "mano": "magkano",
        "ania": "ano",
        "sino": "sino",
        "kaano": "kailan",
        "apay": "bakit",
        "kasano": "paano",
        "sadino": "saan",
        "ay-ayatenka": "mahal kita",
        "kasta": "ganyan",
        "mapanta": "tayo na",
        "madaras": "halika na",
        "agingkamom": "mag-ingat",
        "manganta": "kumain tayo",
        "mangan": "kumain",
        "matmaturogka": "matulog na",
        "matulog": "matulog",
        "ubing": "bata",
        "nanang": "nanay",
        "tatang": "tatay",
        "kabsat": "kapatid",
        "bayad": "bayad",
        "danum": "tubig",
        "taraon": "pagkain",
        "balay": "bahay",
        "dakkel": "malaki",
        "bassit": "maliit",
        "puraw": "puti",
        "nangisit": "itim",
        "nalabbaga": "pula",
        "nalungtian": "berde",
        "naribok": "asul",
        "adu": "marami",
    }
    }
};

// ── Load custom entries from localStorage and merge into dictionary ──
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
    // Merge built-in dictionary with user's custom entries
    const builtIn = dictionary[sourceDialect][targetLang];
    const custom = getCustomDictionary(sourceDialect, targetLang);
    // Custom entries take priority over built-in
    const dict = Object.assign({}, builtIn, custom);

    let result = input;
    let translated = false;

    // Try full phrase match first
    if (dict[input]) {
    result = capitalize(dict[input]);
    translated = true;
    } else {
    // Word-by-word + phrase replacement
    let working = input;
    // Sort keys by length descending to match longer phrases first
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

    if (result) {
    return result;
    }

    // Not found
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