import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfxfkFldcQAw45qYFQQ_SIBaIfWAsQToo",
    authDomain: "filipino-converter.firebaseapp.com",
    projectId: "filipino-converter",
    storageBucket: "filipino-converter.firebasestorage.app",
    messagingSenderId: "955763378837",
    appId: "1:955763378837:web:196ca6e1e522ff3b20e99c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const builtInDictionary = {
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
    },
    english: {
        cebuano: {
            "good morning": "maayong buntag",
            "thank you very much": "salamat kaayo",
            "what is your name": "unsay imong ngalan",
            "i'm hungry": "gutom ko",
            "i love you": "mahal ko ikaw",
            "take care": "pag-amping"
        },
        ilocano: {
            "good morning": "naimbag a bigat",
            "thank you": "agyamanak",
            "what is your name": "ania ti naganmo",
            "i'm hungry": "agbitbitinnak",
            "i love you": "ay-ayatenka",
            "take care": "agingkamom"
        }
    },
    tagalog: {
        cebuano: {
            "magandang umaga": "maayong buntag",
            "maraming salamat": "salamat kaayo",
            "ano ang iyong pangalan": "unsay imong ngalan",
            "nagugutom ako": "gutom ko",
            "mahal kita": "mahal ko ikaw",
            "mag-ingat ka": "pag-amping"
        },
        ilocano: {
            "magandang umaga": "naimbag a bigat",
            "salamat": "agyamanak",
            "ano ang iyong pangalan": "ania ti naganmo",
            "nagugutom ako": "agbitbitinnak",
            "mahal kita": "ay-ayatenka",
            "mag-ingat": "agingkamom"
        }
    }
};

const validTargets = {
    cebuano: ['english', 'tagalog'],
    ilocano: ['english', 'tagalog'],
    english: ['cebuano', 'ilocano'],
    tagalog: ['cebuano', 'ilocano']
};

const sourceLabels = {
    cebuano: 'Cebuano',
    ilocano: 'Ilocano',
    english: 'English',
    tagalog: 'Tagalog'
};

let customEntries = [];

async function loadEntries() {
    try {
        const snapshot = await getDocs(collection(db, 'translations'));
        customEntries = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        renderEntries();
    } catch (err) {
        console.error('Failed to load entries:', err);
        showToast('Could not load translations.', true);
    }
}

function onSourceChange() {
    const dialect = document.getElementById('entry-dialect').value;
    const targetSelect = document.getElementById('entry-target');
    const targets = validTargets[dialect];

    targetSelect.innerHTML = targets
        .map(t => `<option value="${t}">${sourceLabels[t]}</option>`)
        .join('');
}

async function addEntry() {
    const dialect = document.getElementById('entry-dialect').value;
    const target = document.getElementById('entry-target').value;
    const sourcePhrase = document.getElementById('entry-source').value.trim().toLowerCase();
    const translation = document.getElementById('entry-translation').value.trim().toLowerCase();

    if (!sourcePhrase || !translation) {
        showToast('Please fill in both fields!', true);
        return;
    }

    // check for duplicate in existing entries
    const duplicate = customEntries.find(e =>
        e.dialect === dialect && e.target === target && e.source === sourcePhrase
    );
    if (duplicate) {
        showToast('Already in the dictionary!', true);
        return;
    }

    // check against built-in dictionary
    const builtInMatch = builtInDictionary[dialect]?.[target]?.[sourcePhrase];
    if (builtInMatch) {
        const override = confirm(`"${sourcePhrase}" is already built-in as "${builtInMatch}".\n\nSave your version to override it?`);
        if (!override) return;
    }

    try {
        // save the main entry
        const mainRef = await addDoc(collection(db, 'translations'), {
            dialect, target, source: sourcePhrase, translation
        });
        customEntries.unshift({ id: mainRef.id, dialect, target, source: sourcePhrase, translation });

        // auto-save the reverse entry if it doesn't exist
        const reverseExists = customEntries.find(e =>
            e.dialect === target && e.target === dialect && e.source === translation
        );
        if (!reverseExists) {
            const reverseRef = await addDoc(collection(db, 'translations'), {
                dialect: target, target: dialect, source: translation, translation: sourcePhrase
            });
            customEntries.unshift({ id: reverseRef.id, dialect: target, target: dialect, source: translation, translation: sourcePhrase });
        }

        document.getElementById('entry-source').value = '';
        document.getElementById('entry-translation').value = '';

        renderEntries();
        showToast('Translation added — reverse saved too!');
    } catch (err) {
        console.error('Failed to add entry:', err);
        showToast('Could not save translation.', true);
    }
}

async function deleteEntry(id) {
    try {
        await deleteDoc(doc(db, 'translations', id));
        customEntries = customEntries.filter(e => e.id !== id);
        renderEntries();
        showToast('Entry removed.');
    } catch (err) {
        console.error('Failed to delete entry:', err);
        showToast('Could not remove entry.', true);
    }
}

function renderEntries() {
    const list = document.getElementById('entries-list');
    const count = document.getElementById('entry-count');
    count.textContent = `${customEntries.length} ${customEntries.length === 1 ? 'entry' : 'entries'}`;

    if (customEntries.length === 0) {
        list.innerHTML = '<div class="empty-state">No custom translations yet. Add your first one above!</div>';
        return;
    }

    list.innerHTML = customEntries.map(e => `
        <div class="entry-row" id="entry-${e.id}">
            <span class="entry-dialect">${sourceLabels[e.dialect] || e.dialect}</span>
            <span class="entry-phrase">${e.source}</span>
            <span class="entry-arrow">→</span>
            <span class="entry-translation">${e.translation}</span>
            <span class="entry-target">${sourceLabels[e.target] || e.target}</span>
            <button class="delete-btn" data-id="${e.id}" title="Remove entry">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `).join('');

    // use event delegation for delete buttons since they're dynamically rendered
    list.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteEntry(btn.dataset.id));
    });
}

function showToast(msg, isError = false) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.toggle('error', isError);
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
}

document.getElementById('entry-translation').addEventListener('keydown', e => {
    if (e.key === 'Enter') addEntry();
});

document.getElementById('entry-dialect').addEventListener('change', onSourceChange);
document.getElementById('add-btn').addEventListener('click', addEntry);

onSourceChange();
loadEntries();