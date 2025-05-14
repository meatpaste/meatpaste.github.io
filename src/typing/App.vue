<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-blue-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">PHP Syntax Typing Tutor</h1>
      <button @click="showHelp = true" class="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">Help</button>
    </header>
    <main class="flex-1 flex flex-col items-center justify-center p-4">
      <ProgressBars :level="level" :streak="streak" :maxLevel="maxLevel" :streakGoal="level" />

      <Metrics :wpm="cpm" :accuracy="accuracy" :errors="errorsForMetrics" :level="level" />
      <div class="flex w-full max-w-4xl mt-6 gap-6 flex-col md:flex-row">
        <TypingPane
          :userInput="userInput"
          :snippet="currentSnippet"
          :errorIndexes="errorIndexes"
          :currentIndex="currentIndex"
          :showCursor="showCursor"
          @input="handleInput"
          @reset="resetInput"
          @error="incrementTotalErrors"
          @keyevent="handleKeyEvent"
        />
        <SnippetPane :snippet="currentSnippet" />
      </div>
      <OnScreenKeyboard :keyStats="keyStats" />
      <button class="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" @click="resetStats">Reset Progress</button>
    </main>
    <HelpModal v-if="showHelp" @close="showHelp = false" />
    <canvas ref="confettiRef" class="pointer-events-none fixed inset-0 z-50" style="display:none"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import ProgressBars from './components/ProgressBars.vue';
import Metrics from './components/Metrics.vue';
import TypingPane from './components/TypingPane.vue';
import SnippetPane from './components/SnippetPane.vue';
import OnScreenKeyboard from './components/OnScreenKeyboard.vue';
import HelpModal from './components/HelpModal.vue';
import { snippetsByDifficulty } from './snippets.js';

let localStorageKey = 'php-typing-tutor-vue';
const showHelp = ref(false);
const level = ref(1);
const streak = ref(0);
const maxLevel = 50;
const cpm = ref(0);
const accuracy = ref(100);
const errors = ref(0); // Deprecated: was per-input error count
const totalErrorCount = ref(0); // New: running total of errors
const errorsForMetrics = computed(() => totalErrorCount.value);
function incrementTotalErrors() {
  totalErrorCount.value++;
}
const keyStats = ref({});
let snippetTotal = 0;
let snippetErrors = 0;

function handleKeyEvent({ expected, actual }) {
  if (!expected) return; // ignore events with no expected char (e.g. after end of snippet)
  const key = encodeURIComponent(expected);
  if (!keyStats.value[key]) keyStats.value[key] = { total: 0, errors: 0, accuracy: 100 };
  keyStats.value[key].total++;
  snippetTotal++;
  if (actual !== expected) {
    keyStats.value[key].errors++;
    snippetErrors++;
  }
  keyStats.value[key].accuracy = Math.round(100 * (1 - keyStats.value[key].errors / keyStats.value[key].total));
  // Update snippet accuracy for metrics
  let snippetAccuracy = snippetTotal > 0 ? Math.round(100 * (1 - snippetErrors / snippetTotal)) : 100;
  accuracy.value = snippetAccuracy;
  saveStats();
}
const userInput = ref('');
const currentSnippet = ref('');
const errorIndexes = ref([]);
const currentIndex = ref(0);
const showCursor = ref(true);
const confettiRef = ref(null);
let lastSnippet = '';
let startTime = null;
let charsTyped = 0;

function pickSnippet() {
  let pool = [];
  for (let i = 1; i <= level.value; i++) {
    if (snippetsByDifficulty[i]) pool = pool.concat(snippetsByDifficulty[i]);
  }
  let candidates = pool.filter(s => s !== lastSnippet);
  if (candidates.length === 0) candidates = pool;
  let snippet = candidates[Math.floor(Math.random() * candidates.length)];
  lastSnippet = snippet;
  currentSnippet.value = snippet;
  userInput.value = '';
  errorIndexes.value = [];
  currentIndex.value = 0;
  showCursor.value = true;
  startTime = null;
  charsTyped = 0;
  prevInputLength.value = 0;
  snippetTotal = 0;
  snippetErrors = 0;
}

const prevInputLength = ref(0);
function handleInput(input) {
  if (!startTime) startTime = Date.now();
  userInput.value = input;
  charsTyped = input.length;
  // errorIndexes and currentIndex for UI feedback
  let errorsArr = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== currentSnippet.value[i]) errorsArr.push(i);
  }
  errorIndexes.value = errorsArr;
  currentIndex.value = input.length;
  // Metrics
  let elapsed = (Date.now() - startTime) / 60000;
  cpm.value = Math.round(charsTyped / (elapsed || 1));
  // Completion logic
  if (input === currentSnippet.value) {
    // On completion, use snippet accuracy for streak logic
    let snippetAccuracy = snippetTotal > 0 ? Math.round(100 * (1 - snippetErrors / snippetTotal)) : 100;
    showConfetti();
    if (snippetAccuracy >= 90) {
      streak.value++;
      if (streak.value >= level.value) {
        level.value++;
        streak.value = 0;
      }
    } else {
      streak.value = 0;
    }
    pickSnippet();
  }
}

function resetInput() {
  userInput.value = '';
  errorIndexes.value = [];
  currentIndex.value = 0;
  prevInputLength.value = 0;
  snippetTotal = 0;
  snippetErrors = 0;
}

function resetStats() {
  level.value = 1;
  streak.value = 0;
  cpm.value = 0;
  accuracy.value = 100;
  errors.value = 0;
  keyStats.value = {};
  totalErrorCount.value = 0;
  saveStats();
  pickSnippet();
}

function saveStats() {
  localStorage.setItem(localStorageKey, JSON.stringify({
    level: level.value,
    streak: streak.value,
    keyStats: keyStats.value,
    totalErrorCount: totalErrorCount.value,
  }));
}

function loadStats() {
  let data = localStorage.getItem(localStorageKey);
  if (data) {
    try {
      let parsed = JSON.parse(data);
      level.value = parsed.level || 1;
      streak.value = parsed.streak || 0;
      keyStats.value = parsed.keyStats || {};
      totalErrorCount.value = parsed.totalErrorCount || 0;
    } catch {}
  }
}

function showConfetti() {
  import('canvas-confetti').then(confetti => {
    confetti.default({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  });
}

onMounted(() => {
  loadStats();
  pickSnippet();
});
</script>

<style scoped>
</style>
