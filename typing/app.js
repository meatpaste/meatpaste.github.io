// --- PHP Syntax Typing Tutor Core ---

let currentSnippet = '';
let currentIndex = 0;
let startTime = null;
let errors = 0;
let totalTyped = 0;
let correctTyped = 0;
let difficulty = 1;
let levelUpProgress = 0; // Number of consecutive 100% passes at current level
let lastInputError = false;

function getMaxDifficulty() {
    // Find the largest numeric key in snippetsByDifficulty
    return Math.max(...Object.keys(snippetsByDifficulty).map(Number));
}
let maxDifficulty = getMaxDifficulty();

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

let previousSnippet = '';

function pickSnippet() {
    const pool = getSnippetsForDifficulty(difficulty);
    let filtered = pool;
    if (pool.length > 1 && previousSnippet) {
        filtered = pool.filter(snippet => snippet !== previousSnippet);
        if (filtered.length === 0) filtered = pool; // fallback if all are same
    }
    const chosen = filtered[Math.floor(Math.random() * filtered.length)];
    previousSnippet = chosen;
    return chosen;
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

// Per-key stats: { [key]: { correct: 0, total: 0 } }
let keyStats = {};

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
    const ks = localStorage.getItem('php_typing_key_stats');
    if (ks) {
        try {
            keyStats = JSON.parse(ks);
        } catch(e) {
            keyStats = {};
        }
    }
    const diff = localStorage.getItem('php_typing_difficulty');
    if (diff) {
        difficulty = parseInt(diff, 10) || 1;
    }
    const lup = localStorage.getItem('php_typing_levelup_progress');
    if (lup) {
        levelUpProgress = parseInt(lup, 10) || 0;
    }
}

function normalizeKey(char) {
    // For shifted symbols, always use base key
    for (const [base, shifted] of Object.entries(shiftedSymbols)) {
        if (char === shifted) return base;
    }
    // For space, tab, enter, etc.
    if (char === '\n') return 'Enter';
    if (char === '\t') return 'Tab';
    if (char === ' ') return ' ';
    return char;
}

function updateKeyStats(char, correct) {
    const key = normalizeKey(char);
    if (!keyStats[key]) keyStats[key] = { correct: 0, total: 0 };
    keyStats[key].total++;
    if (correct) keyStats[key].correct++;
}

function getKeyAccuracies() {
    const result = {};
    for (const key in keyStats) {
        const { correct, total } = keyStats[key];
        result[key] = total === 0 ? 0 : (correct / total) * 100;
    }
    return result;
}

function updateKeyboardTooltips() {
    // Show accuracy as tooltip on each key and color keys by accuracy
    const accs = getKeyAccuracies();
    document.querySelectorAll('#keyboard [data-key]').forEach(div => {
        const key = div.dataset.key;
        let bg = '';
        if (accs.hasOwnProperty(key)) {
            const acc = accs[key];
            div.title = `Accuracy: ${acc.toFixed(1)}%`;
            // Interpolate from red (#ff4d4d) to green (#4dff4d)
            const r = Math.round(0xff * (1 - acc / 100) + 0x4d * (acc / 100));
            const g = Math.round(0x4d * (1 - acc / 100) + 0xff * (acc / 100));
            const b = Math.round(0x4d * (1 - acc / 100) + 0x4d * (acc / 100));
            bg = `rgb(${r},${g},${b})`;
        } else {
            div.title = 'Accuracy: N/A';
            bg = '#f3f4f6'; // Tailwind gray-100
        }
        // Remove any previous inline background
        div.style.background = bg;
    });
}

function saveStats() {
    localStorage.setItem('php_typing_stats', JSON.stringify(stats));
    localStorage.setItem('php_typing_key_stats', JSON.stringify(keyStats));
    localStorage.setItem('php_typing_difficulty', difficulty.toString());
    localStorage.setItem('php_typing_levelup_progress', levelUpProgress.toString());
}
function resetStats() {
    stats = { last: { cpm: 0, accuracy: 100, errors: 0, level: 1 }, average: { cpm: 0, accuracy: 100, errors: 0, level: 1 }, count: 0, totalCorrect: 0, totalTyped: 0 };
    keyStats = {};
    difficulty = 1;
    levelUpProgress = 0;
    saveStats();
    updateMetrics();
}

function updateMetrics() {
    // Update level progress bar
    const fill = document.getElementById('level-progress-fill');
    const label = document.getElementById('level-progress-label');
    if (fill && label) {
        // Progress bar begins at 1, not zero
        const percent = Math.max(0, Math.min(100, ((difficulty - 1) / (maxDifficulty - 1)) * 100));
        fill.style.width = (maxDifficulty === 1 ? 100 : percent) + '%';
        label.textContent = `Level ${difficulty} of ${maxDifficulty}`;
    }
    // Update level-up progress bar
    const lupFill = document.getElementById('levelup-progress-fill');
    const lupLabel = document.getElementById('levelup-progress-label');
    if (lupFill && lupLabel) {
        const lupPercent = Math.max(0, Math.min(100, (levelUpProgress / difficulty) * 100));
        lupFill.style.width = lupPercent + '%';
        lupLabel.textContent = `${levelUpProgress} / ${difficulty} 100% passes`;
    }
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
              <th class="font-medium px-2 border-t border-gray-300">Average (${stats.count}) <button id="reset-avg" title="Reset average" style="background:none;border:none;padding:0;margin-left:0.3em;vertical-align:middle;cursor:pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button></th>
              <td class="px-2 border-t border-gray-300">${stats.average.cpm}</td>
              <td class="px-2 border-t border-gray-300">${avgAccuracy}%</td>
              <td class="px-2 border-t border-gray-300">${(stats.average.errors ?? 0).toFixed(1)}</td>
              <td class="px-2 border-t border-gray-300">${(stats.average.level ?? 1).toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    // Attach event listener to the new trash icon button
    const resetBtn = document.getElementById('reset-avg');
    if (resetBtn) {
      resetBtn.onclick = resetStats;
    }
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
        const expectedChar = currentSnippet[currentIndex];
        if (newChar === expectedChar) {
            userTyped += newChar;
            correctTyped++;
            updateKeyStats(expectedChar, true);
            currentIndex++;
            lastInputError = false;
        } else {
            // Incorrect input: flash red, ignore input
            errors++;
            updateKeyStats(expectedChar, false);
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
    updateKeyboardTooltips();
    hiddenInput.value = userTyped; // keep input in sync
    if (currentIndex === currentSnippet.length) {
        // Compute stats for this test and handle level-up logic
        updateSessionStats();
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
        setTimeout(resetSession, 900);
    }
} 

// --- Level Up & Stats Logic ---
function updateSessionStats() {
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

    // Level up logic: require N consecutive 100% passes (N = difficulty)
    if (accuracy === 100) {
        levelUpProgress++;
        if (levelUpProgress >= difficulty && difficulty < maxDifficulty) {
            difficulty++;
            levelUpProgress = 0;
        }
    } else {
        levelUpProgress = 0;
    }
    saveStats();
    updateMetrics();
}

// --- Instructions Modal Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const helpBtn = document.getElementById('help-btn');
  const modal = document.getElementById('instructions-modal');
  const closeBtn = document.getElementById('close-instructions');

  function openModal() {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-modal', 'true');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.removeAttribute('aria-modal');
    helpBtn.focus();
    document.body.style.overflow = '';
  }

  if (helpBtn && modal && closeBtn) {
    helpBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (!modal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeModal();
        // Trap focus
        if (e.key === 'Tab') {
          const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    });
  }
});

// --- Visual Keyboard ---
const keyRowClasses = 'flex justify-center mb-1';
const keyBaseClasses = 'bg-white border border-gray-300 rounded m-1 px-4 py-2 min-w-[32px] text-center text-base transition-colors';
const keyboardLayout = [
    ['`', '1','2','3','4','5','6','7','8','9','0','-','=', '<='],
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    ['⇪','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
    ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
    [' ']
];

// Map of key to shifted symbol (US Standard)
const shiftedSymbols = {
    '`': '~',
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    '\\': '|',
    ';': ':',
    "'": '"',
    ',': '<',
    '.': '>',
    '/': '?',
};


function renderKeyboard() {
    keyboardDiv.innerHTML = '';
    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = keyRowClasses;
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = keyBaseClasses;
            if (key === ' ') {
                keyDiv.textContent = 'Space';
            } else if (shiftedSymbols[key]) {
                keyDiv.innerHTML = `<div><span class='block text-xs text-gray-500'>${shiftedSymbols[key]}</span><span>${key}</span></div>`;
            } else {
                keyDiv.textContent = key;
            }
            keyDiv.dataset.key = key;
            rowDiv.appendChild(keyDiv);
        });
        keyboardDiv.appendChild(rowDiv);
    });
    updateKeyboardTooltips();
}

function updateKeyboardTooltips() {
    // Show accuracy as tooltip on each key and color keys by accuracy
    const accs = getKeyAccuracies();
    document.querySelectorAll('#keyboard [data-key]').forEach(div => {
        const key = div.dataset.key;
        let bg = '';
        if (accs.hasOwnProperty(key)) {
            const acc = accs[key];
            div.title = `Accuracy: ${acc.toFixed(1)}%`;
            // Interpolate from red (#ff4d4d) to green (#4dff4d)
            const r = Math.round(0xff * (1 - acc / 100) + 0x4d * (acc / 100));
            const g = Math.round(0x4d * (1 - acc / 100) + 0xff * (acc / 100));
            const b = Math.round(0x4d * (1 - acc / 100) + 0x4d * (acc / 100));
            bg = `rgb(${r},${g},${b})`;
        } else {
            div.title = 'Accuracy: N/A';
            bg = '#f3f4f6'; // Tailwind gray-100
        }
        // Remove any previous inline background
        div.style.background = bg;
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
            updateKeyStats(char, true);
            currentIndex++;
            lastInputError = false;
        } else {
            // Incorrect input: flash red, ignore input
            errors++;
            updateKeyStats(char, false);
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
        updateKeyboardTooltips();
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
