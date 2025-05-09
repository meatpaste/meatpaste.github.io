# Specification: PHP Syntax Typing Tutor (Reverse-Engineered)

## Overview
This document describes the actual behavior and features of the PHP Syntax Typing Tutor. The game is a browser-based typing tutor focused on PHP code snippets, offering level-based progression, accuracy tracking, and persistent statistics.

---

## 1. File Structure
The game should be entirely contained in ./typing-vue
The game will be hosted on Github Pages, only use code and techniques compatible with this platform.
---

## 2. User Interface (UI)
- **Main Layout**: 
  - Title: "PHP Syntax Typing Tutor"
  - Help button (shows instructions modal)
  - Progress bars:
    - Level Progress (overall progress through levels)
    - Level Up Progress (streak of high-accuracy completions at current level)
  - Metrics display (WPM, accuracy, errors, etc.)
  - Two main panes:
    - "Your Typing" (shows user input, with blinking cursor)
    - "PHP Snippet" (shows target PHP code to type)
  - On-screen keyboard (shows per-key stats/accuracy)
  - Instructions modal (how to play, rules)

- **Styling**:
  - Uses Tailwind CSS for layout and styling.
  - Custom styles for blinking cursor, error flashes, and highlighting.
  - Responsive design for desktop and mobile.

---

## 3. Game Flow & Logic

### 3.1. Levels & Progression
- The game is divided into difficulty levels (1–50+), each with a pool of PHP snippets.
- The user starts at level 1. Each level unlocks more complex snippets.
- To level up:
  - User must achieve at least 90% accuracy for a number of snippets equal to their current level (e.g., 3 high-accuracy completions for level 3).
  - Making a mistake resets the current level-up streak for that level.
- Progress bars show both overall and current streak progress.

### 3.2. Typing & Input
- The current PHP snippet is displayed in the right pane.
- The user types in the left pane ("Your Typing").
- Real-time feedback:
  - Correctly typed characters are highlighted (class `typed-correct`).
  - Errors are highlighted (class `typed-error`).
  - The current character is marked (class `current`).
  - A blinking cursor is shown at the current input position.
- Input is handled through a hidden textarea to ensure focus and correct event handling.
- Error flashes (red border/flash) on input mistakes.

### 3.3. Snippet Selection
- Snippets are grouped by difficulty in `snippets.js` (object `snippetsByDifficulty`).
- On each round, a random snippet from all levels up to the current one is selected, avoiding immediate repeats.

### 3.4. Metrics & Stats
- Metrics shown:
  - Characters per minute (CPM)
  - Accuracy (%)
  - Error count
  - Level
- Stats are calculated per session and averaged across sessions.
- Per-key accuracy is tracked and visualized on the on-screen keyboard (colored from red to green by accuracy).
- All stats and progress are saved to `localStorage` for persistence across sessions.
- User can reset stats to start over.

### 3.5. Instructions & Help
- Modal dialog explains the rules:
  - Type the displayed PHP snippet as accurately as possible.
  - Each key is tracked for accuracy, and keys are colored accordingly.
  - Level up by achieving 90%+ accuracy for a streak of snippets.
  - Mistakes reset the streak.
  - Progress and key stats are saved automatically.

---

## 4. Data: Snippets
- `snippets.js` defines `snippetsByDifficulty`, an object mapping level numbers to arrays of PHP code strings.
- Levels increase in complexity:
  - Level 1: Single characters, variables, numbers.
  - Level 2: Simple assignments, short identifiers.
  - Level 3–5: Basic statements, operators, short functions.
  - Level 6+: Longer statements, full function/class definitions, advanced PHP syntax.
  - Up to level 50, with increasing complexity and real-world PHP idioms.

---

## 5. Technical Details
- **Frontend only:** All logic is client-side JavaScript.
- **Persistence:** Uses `localStorage` for stats and progress.
- **Input Handling:**
  - Listens to input events on a hidden textarea.
  - Handles special keys (Enter, Tab).
  - Ignores extra characters after snippet end.
- **Accessibility:**
  - All interactive elements are keyboard-accessible.
  - High color contrast for feedback.
- **No backend or user accounts.**

---

## 6. Notable Implementation Details
- Avoids showing the same snippet twice in a row.
- Tracks per-key accuracy for personalized feedback.
- Uses confetti animation on level up (via external library).
- Modal and UI events are managed with DOM event listeners.

---

## 7. Limitations & Known Behaviors
- Only PHP snippets are supported (no custom user input).
- No multiplayer, leaderboard, or online score sharing.
- No explicit timer per snippet (metrics are session-based).
- All progress is local to the user's browser.

---

## 8. How to Play (as shown in instructions modal)
- Type the displayed PHP code snippet as accurately as possible.
- Each key you type is tracked for accuracy, and keys will be colored from red (low accuracy) to green (high accuracy).
- To progress to the next level, you must achieve at least 90% accuracy for a number of snippets equal to your current level.
- If you make a mistake, your level-up streak resets for the current level.
- Your progress and key accuracy are saved automatically between sessions.
- Use the progress bars above to track your level and your current level-up streak.

---

## 9. References
- Main files: `index.html`, `app.js`, `snippets.js`
- External libraries: Tailwind CSS, canvas-confetti

---

This specification reflects the current implementation and actual behavior of the PHP Syntax Typing Tutor as found in the `/typing` directory.
