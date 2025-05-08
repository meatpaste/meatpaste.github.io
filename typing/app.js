// --- PHP Syntax Typing Tutor Core ---

let currentSnippet = '';
let currentIndex = 0;
let startTime = null;
let errors = 0;
let totalTyped = 0;
let correctTyped = 0;
let difficulty = 1;
let lastInputError = false;

const maxDifficulty = Object.keys(snippetsByDifficulty).length;

const metricsDiv = document.getElementById('metrics');
const snippetPre = document.getElementById('snippet');
const userInputPre = document.getElementById('user-input');
const keyboardDiv = document.getElementById('keyboard');
const hiddenInput = document.getElementById('hidden-input');

function getSnippetsForDifficulty(level) {
    let pool = [];
    for (let i = 1; i <= level; i++) {
        if (snippetsByDifficulty[i]) pool = pool.concat(snippetsByDifficulty[i]);
    }
    return pool;
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
    last: { cpm: 0, accuracy: 100, errors: 0, level: 1 },
    average: { cpm: 0, accuracy: 100, errors: 0, level: 1 },
    count: 0,
    totalCorrect: 0,
    totalTyped: 0
};
// Load stats from localStorage immediately for persistence
loadStats();

function loadStats() {
    const s = localStorage.getItem('php_typing_stats');
    if (s) {
        const loaded = JSON.parse(s);
        // Defensive merge for backward compatibility
        stats = Object.assign({
            last: { cpm: 0, accuracy: 100, errors: 0, level: 1 },
            average: { cpm: 0, accuracy: 100, errors: 0, level: 1 },
            count: 0,
            totalCorrect: 0,
            totalTyped: 0
        }, loaded);
    }
}
function saveStats() {
    localStorage.setItem('php_typing_stats', JSON.stringify(stats));
}
function resetStats() {
    stats = { last: { cpm: 0, accuracy: 100, errors: 0, level: 1 }, average: { cpm: 0, accuracy: 100, errors: 0, level: 1 }, count: 0, totalCorrect: 0, totalTyped: 0 };
    saveStats();
    updateMetrics();
}

function updateMetrics() {
    const elapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
    const cpm = elapsed > 0 ? ((correctTyped) / (elapsed / 60)).toFixed(1) : '0.0';
    const accuracy = totalTyped > 0 ? ((correctTyped / totalTyped) * 100).toFixed(1) : '100.0';
    const avgAccuracy = stats.totalTyped > 0 ? ((stats.totalCorrect / stats.totalTyped) * 100).toFixed(1) : '100.0';
    metricsDiv.innerHTML = `
      <div class="overflow-x-auto mb-4">
        <table class="table-auto w-full text-left border border-gray-300">
          <thead>
            <tr>
              <th class="px-2 border-b border-gray-300"></th>
              <th class="px-2 border-b border-gray-300">CPM</th>
              <th class="px-2 border-b border-gray-300">Accuracy</th>
              <th class="px-2 border-b border-gray-300">Errors</th>
              <th class="px-2 border-b border-gray-300">Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="font-medium px-2 border-t border-gray-300">Last</th>
              <td class="px-2 border-t border-gray-300">${stats.last.cpm}</td>
              <td class="px-2 border-t border-gray-300">${stats.last.accuracy}%</td>
              <td class="px-2 border-t border-gray-300">${stats.last.errors}</td>
              <td class="px-2 border-t border-gray-300">${stats.last.level}</td>
            </tr>
            <tr>
              <th class="font-medium px-2 border-t border-gray-300">Average (${stats.count})</th>
              <td class="px-2 border-t border-gray-300">${stats.average.cpm}</td>
              <td class="px-2 border-t border-gray-300">${avgAccuracy}%</td>
              <td class="px-2 border-t border-gray-300">${(stats.average.errors ?? 0).toFixed(1)}</td>
              <td class="px-2 border-t border-gray-300">${(stats.average.level ?? 1).toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
        stats.last = { cpm: Math.round(cpm), accuracy: Math.round(accuracy), errors: errors, level: difficulty };
        if (stats.count === 0) {
            stats.average = { cpm: Math.round(cpm), accuracy: Math.round(accuracy), errors: errors, level: difficulty };
        } else {
            stats.average.cpm = Math.round((stats.average.cpm * stats.count + cpm) / (stats.count + 1));
            stats.average.errors = (stats.average.errors * stats.count + errors) / (stats.count + 1);
            stats.average.level = (stats.average.level * stats.count + difficulty) / (stats.count + 1);
        }
        // Update cumulative totals for mathematically correct average accuracy
        stats.totalCorrect += correctTyped;
        stats.totalTyped += totalTyped;
        stats.count++;
        saveStats();
        updateMetrics();
        // Emit confetti at cursor on completion
        (function(){
          const cursorEl = document.querySelector('#user-input .typing-cursor');
          if (cursorEl) {
            const rect = cursorEl.getBoundingClientRect();
            confetti({
              particleCount: 100,
              spread: 60,
              startVelocity: 20,
              origin: { x: ((rect.left + rect.right) / 2) / window.innerWidth, y: rect.bottom / window.innerHeight }
            });
          }
        })();
        if (difficulty < maxDifficulty && (correctTyped / totalTyped) > 0.96) difficulty++;
        setTimeout(resetSession, 900);
    }
} 

// --- Visual Keyboard ---
const keyRowClasses = 'flex justify-center mb-1';
const keyBaseClasses = 'bg-gray-200 border border-gray-300 rounded m-1 px-4 py-2 min-w-[32px] text-center text-base transition-colors';
const keyboardLayout = [
    ['`', '1','2','3','4','5','6','7','8','9','0','-','=', '<='],
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    ['⇪','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
    ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
    [' ']
];

function renderKeyboard() {
    keyboardDiv.innerHTML = '';
    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = keyRowClasses;
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = keyBaseClasses;
            keyDiv.textContent = key === ' ' ? 'Space' : key;
            keyDiv.dataset.key = key;
            rowDiv.appendChild(keyDiv);
        });
        keyboardDiv.appendChild(rowDiv);
    });
}

function highlightKeyboard() {
    document.querySelectorAll('[data-key]').forEach(k => k.className = keyBaseClasses);
    const nextChar = currentSnippet[currentIndex] || '';
    let key = nextChar;
    if (key === '\n') key = 'Enter';
    if (key === ' ') key = ' ';
    const keyDiv = Array.from(document.querySelectorAll('[data-key]')).find(k => k.dataset.key === key);
    if (keyDiv) keyDiv.classList.add('bg-yellow-300', 'border-yellow-400');
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
                totalTyped += 4;
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
            stats.last = { cpm: Math.round(cpm), accuracy: Math.round(accuracy), errors: errors, level: difficulty };
            if (stats.count === 0) {
                stats.average = { cpm: Math.round(cpm), accuracy: Math.round(accuracy), errors: errors, level: difficulty };
            } else {
                stats.average.cpm = Math.round((stats.average.cpm * stats.count + cpm) / (stats.count + 1));
                stats.average.accuracy = Math.round((stats.average.accuracy * stats.count + accuracy) / (stats.count + 1));
                stats.average.errors = (stats.average.errors * stats.count + errors) / (stats.count + 1);
                stats.average.level = (stats.average.level * stats.count + difficulty) / (stats.count + 1);
            }
            stats.count++;
            saveStats();
            updateMetrics();
            // Emit confetti at cursor on completion
            (function(){
              const cursorEl = document.querySelector('#user-input .typing-cursor');
              if (cursorEl) {
                const rect = cursorEl.getBoundingClientRect();
                confetti({
                  particleCount: 100,
                  spread: 60,
                  startVelocity: 20,
                  origin: { x: ((rect.left + rect.right) / 2) / window.innerWidth, y: rect.bottom / window.innerHeight }
                });
              }
            })();
            if (difficulty < maxDifficulty && (correctTyped / totalTyped) > 0.96) difficulty++;
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
