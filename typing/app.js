// --- PHP Syntax Typing Tutor Core ---

const phpSnippets = [
    // Difficulty 1: Variables
    "$foo = 42;",
    "$bar = 'hello';",
    "$num = $foo + 7;",
    // Difficulty 2: Functions
    "function greet($name) {\n    echo 'Hello, ' . $name;\n}",
    "function add($a, $b) {\n    return $a + $b;\n}",
    // Difficulty 3: Control structures
    "if ($foo > 10) {\n    echo 'Big';\n} else {\n    echo 'Small';\n}",
    "for ($i = 0; $i < 5; $i++) {\n    echo $i;\n}",
    // Difficulty 4: Classes
    "class Person {\n    public $name;\n    function __construct($name) {\n        $this->name = $name;\n    }\n}",
    // Difficulty 5: Advanced
    "$arr = [1, 2, 3];\nforeach ($arr as $item) {\n    echo $item;\n}",
];

let currentSnippet = '';
let currentIndex = 0;
let startTime = null;
let errors = 0;
let totalTyped = 0;
let correctTyped = 0;
let difficulty = 1;
let lastInputError = false;

const metricsDiv = document.getElementById('metrics');
const snippetPre = document.getElementById('snippet');
const userInputPre = document.getElementById('user-input');
const keyboardDiv = document.getElementById('keyboard');
const hiddenInput = document.getElementById('hidden-input');

function getSnippetsForDifficulty(level) {
    if (level === 1) return phpSnippets.slice(0, 3);
    if (level === 2) return phpSnippets.slice(0, 5);
    if (level === 3) return phpSnippets.slice(0, 7);
    if (level === 4) return phpSnippets.slice(0, 8);
    return phpSnippets;
}

function pickSnippet() {
    const pool = getSnippetsForDifficulty(difficulty);
    return pool[Math.floor(Math.random() * pool.length)];
}

function renderSnippet() {
    let html = '';
    const userVal = userTyped;
    for (let i = 0; i < currentSnippet.length; i++) {
        let cls = '';
        if (i < userVal.length) {
            if (userVal[i] === currentSnippet[i]) {
                cls = 'typed-correct';
            } else {
                cls = 'typed-error';
            }
        } else if (i === userVal.length) {
            cls = 'current';
        }
        if (currentSnippet[i] === '\n') {
            html += '<br>';
        } else {
            html += `<span class="${cls}">${currentSnippet[i].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
        }
    }
    snippetPre.innerHTML = html;
} 

let isTypingActive = true;

function renderUserInput() {
    let html = '';
    for (let i = 0; i < userTyped.length; i++) {
        if (userTyped[i] === '\n') {
            html += '<br>';
        } else {
            html += userTyped[i].replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    }
    if (isTypingActive) {
        html += '<span class="typing-cursor">&#8203;</span>';
    }
    userInputPre.innerHTML = html;
} 

// Stats storage
let stats = {
    last: { cpm: 0, accuracy: 100 },
    average: { cpm: 0, accuracy: 100 },
    count: 0
};

function loadStats() {
    const s = localStorage.getItem('php_typing_stats');
    if (s) stats = JSON.parse(s);
}
function saveStats() {
    localStorage.setItem('php_typing_stats', JSON.stringify(stats));
}
function resetStats() {
    stats = { last: { cpm: 0, accuracy: 100 }, average: { cpm: 0, accuracy: 100 }, count: 0 };
    saveStats();
    updateMetrics();
}

function updateMetrics() {
    const elapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
    const cpm = elapsed > 0 ? ((correctTyped) / (elapsed / 60)).toFixed(1) : '0.0';
    const accuracy = totalTyped > 0 ? ((correctTyped / totalTyped) * 100).toFixed(1) : '100.0';
    metricsDiv.innerHTML = `
        <div>CPM: <strong>${cpm}</strong></div>
        <div>Accuracy: <strong>${accuracy}%</strong></div>
        <div>Errors: <strong>${errors}</strong></div>
        <div>Level: <strong>${difficulty}</strong></div>
        <hr style="margin:8px 0;">
        <div>Last Test CPM: <strong>${stats.last.cpm}</strong></div>
        <div>Last Test Accuracy: <strong>${stats.last.accuracy}%</strong></div>
        <div>Average CPM: <strong>${stats.average.cpm}</strong></div>
        <div>Average Accuracy: <strong>${stats.average.accuracy}%</strong></div>
    `;
}

function resetSession() {
    currentSnippet = pickSnippet();
    currentIndex = 0;
    errors = 0;
    totalTyped = 0;
    correctTyped = 0;
    lastInputError = false;
    userTyped = '';
    startTime = null;
    renderSnippet();
    renderUserInput();
    updateMetrics();
    highlightKeyboard();
    hiddenInput.value = '';
    hiddenInput.focus();
} 

let userTyped = '';

function handleInput(e) {
    if (!startTime) startTime = Date.now();
    const val = e.target.value;
    const userPane = document.getElementById('user-pane');
    // Detect backspace or edit
    if (val.length < userTyped.length) {
        userTyped = val;
        currentIndex = val.length;
        lastInputError = false;
    } else if (val.length > userTyped.length) {
        const newChar = val[val.length - 1];
        totalTyped++;
        if (newChar === currentSnippet[currentIndex]) {
            userTyped += newChar;
            correctTyped++;
            currentIndex++;
            lastInputError = false;
        } else {
            // Incorrect input: flash red, ignore input
            errors++;
            lastInputError = true;
            if (userPane) {
                userPane.classList.remove('flash-error'); // reset if already flashing
                void userPane.offsetWidth; // force reflow for retrigger
                userPane.classList.add('flash-error');
                setTimeout(() => userPane.classList.remove('flash-error'), 150);
            }
            // Reset input value to previous correct input
            hiddenInput.value = userTyped;
            return; // Skip rest of handler
        }
    }
    // If same length, do nothing (shouldn't happen)
    updateMetrics();
    renderUserInput();
    renderSnippet();
    highlightKeyboard();
    hiddenInput.value = userTyped; // keep input in sync
    if (currentIndex === currentSnippet.length) {
        // Compute stats for this test
        const elapsed = (Date.now() - startTime) / 1000;
        const cpm = elapsed > 0 ? ((correctTyped) / (elapsed / 60)) : 0;
        const accuracy = totalTyped > 0 ? ((correctTyped / totalTyped) * 100) : 100;
        // Update stats
        stats.last = { cpm: Math.round(cpm), accuracy: Math.round(accuracy) };
        if (stats.count === 0) {
            stats.average = { cpm: Math.round(cpm), accuracy: Math.round(accuracy) };
        } else {
            stats.average.cpm = Math.round((stats.average.cpm * stats.count + cpm) / (stats.count + 1));
            stats.average.accuracy = Math.round((stats.average.accuracy * stats.count + accuracy) / (stats.count + 1));
        }
        stats.count++;
        saveStats();
        updateMetrics();
        // Level up if accuracy is high
        if (difficulty < 5 && (correctTyped / totalTyped) > 0.96) difficulty++;
        setTimeout(resetSession, 900);
    }
} 

// --- Visual Keyboard ---
const keyboardLayout = [
    ['`', '1','2','3','4','5','6','7','8','9','0','-','=', 'Backspace'],
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    ['CapsLock','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
    ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
    [' ']
];

function renderKeyboard() {
    keyboardDiv.innerHTML = '';
    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'key-row';
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = 'key';
            keyDiv.textContent = key === ' ' ? 'Space' : key;
            keyDiv.dataset.key = key;
            rowDiv.appendChild(keyDiv);
        });
        keyboardDiv.appendChild(rowDiv);
    });
}

function highlightKeyboard() {
    document.querySelectorAll('.key').forEach(k => k.classList.remove('active', 'next', 'error'));
    const nextChar = currentSnippet[currentIndex] || '';
    let key = nextChar;
    if (key === '\n') key = 'Enter';
    if (key === ' ') key = ' ';
    const keyDiv = Array.from(document.querySelectorAll('.key')).find(k => k.dataset.key === key);
    if (keyDiv) keyDiv.classList.add('next');
}

document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    renderKeyboard();
    resetSession();
    hiddenInput.addEventListener('input', handleInput);
    hiddenInput.addEventListener('keydown', function(e) {
        // Support Enter (newline)
        if (e.key === 'Enter') {
            e.preventDefault();
            validateAndApplyInput('\n');
            return;
        }
        // Support Tab (tab character)
        if (e.key === 'Tab') {
            e.preventDefault();
            // Check if the next 4 characters in the snippet are all spaces
            const nextFour = currentSnippet.slice(currentIndex, currentIndex + 4);
            if (nextFour === '    ') {
                validateAndApplyInput('    ');
            } else {
                // Flash red and do not insert
                const userPane = document.getElementById('user-pane');
                totalTyped++;
                errors++;
                lastInputError = true;
                if (userPane) {
                    userPane.classList.remove('flash-error');
                    void userPane.offsetWidth;
                    userPane.classList.add('flash-error');
                    setTimeout(() => userPane.classList.remove('flash-error'), 150);
                }
                hiddenInput.value = userTyped;
            }
            return;
        }
    });

    // Helper to validate and apply special input (Enter/Tab)
    function validateAndApplyInput(char) {
        const userPane = document.getElementById('user-pane');
        totalTyped++;
        if (char.length === 4 && char === '    ') {
            // Handle 4 spaces (Tab)
            if (currentSnippet.slice(currentIndex, currentIndex + 4) === '    ') {
                userTyped += '    ';
                correctTyped += 4;
                currentIndex += 4;
                lastInputError = false;
            } else {
                // Incorrect input: flash red, ignore input
                errors++;
                lastInputError = true;
                if (userPane) {
                    userPane.classList.remove('flash-error');
                    void userPane.offsetWidth;
                    userPane.classList.add('flash-error');
                    setTimeout(() => userPane.classList.remove('flash-error'), 150);
                }
                hiddenInput.value = userTyped;
                return;
            }
        } else if (char === currentSnippet[currentIndex]) {
            userTyped += char;
            correctTyped++;
            currentIndex++;
            lastInputError = false;
        } else {
            // Incorrect input: flash red, ignore input
            errors++;
            lastInputError = true;
            if (userPane) {
                userPane.classList.remove('flash-error');
                void userPane.offsetWidth;
                userPane.classList.add('flash-error');
                setTimeout(() => userPane.classList.remove('flash-error'), 150);
            }
            // Keep input value in sync
            hiddenInput.value = userTyped;
            return;
        }
        updateMetrics();
        renderUserInput();
        renderSnippet();
        highlightKeyboard();
        hiddenInput.value = userTyped;
        if (currentIndex === currentSnippet.length) {
            // Compute stats for this test
            const elapsed = (Date.now() - startTime) / 1000;
            const cpm = elapsed > 0 ? ((correctTyped) / (elapsed / 60)) : 0;
            const accuracy = totalTyped > 0 ? ((correctTyped / totalTyped) * 100) : 100;
            // Update stats
            stats.last = { cpm: Math.round(cpm), accuracy: Math.round(accuracy) };
            if (stats.count === 0) {
                stats.average = { cpm: Math.round(cpm), accuracy: Math.round(accuracy) };
            } else {
                stats.average.cpm = Math.round((stats.average.cpm * stats.count + cpm) / (stats.count + 1));
                stats.average.accuracy = Math.round((stats.average.accuracy * stats.count + accuracy) / (stats.count + 1));
            }
            stats.count++;
            saveStats();
            updateMetrics();
            if (difficulty < 5 && (correctTyped / totalTyped) > 0.96) difficulty++;
            setTimeout(resetSession, 900);
        }
    }
    hiddenInput.addEventListener('focus', () => { isTypingActive = true; renderUserInput(); });
    hiddenInput.addEventListener('blur', () => { isTypingActive = false; renderUserInput(); });
    // Focus input on click anywhere in user pane
    document.getElementById('user-pane').addEventListener('click', () => {
        hiddenInput.focus();
        isTypingActive = true;
        renderUserInput();
    });
    document.getElementById('reset-avg').addEventListener('click', resetStats);
});
