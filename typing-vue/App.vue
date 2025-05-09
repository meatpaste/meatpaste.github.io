<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-blue-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">PHP Syntax Typing Tutor</h1>
      <button @click="showHelp = true" class="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">Help</button>
    </header>
    <main class="flex-1 flex flex-col items-center justify-center p-4">
      <ProgressBars :level="level" :streak="streak" :maxLevel="maxLevel" :streakGoal="level" />
      <Metrics :wpm="cpm" :accuracy="accuracy" :errors="errors" :level="level" />
      <div class="flex w-full max-w-4xl mt-6 gap-6 flex-col md:flex-row">
        <TypingPane
          :userInput="userInput"
          :snippet="currentSnippet"
          :errorIndexes="errorIndexes"
          :currentIndex="currentIndex"
          :showCursor="showCursor"
          @input="handleInput"
          @reset="resetInput"
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
import { ref, watch, onMounted } from 'vue';
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
const errors = ref(0);
const keyStats = ref({});
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
}

function handleInput(input) {
  if (!startTime) startTime = Date.now();
  userInput.value = input;
  charsTyped = input.length;
  let errorsArr = [];
  let correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== currentSnippet.value[i]) errorsArr.push(i);
    else correctChars++;
  }
  errorIndexes.value = errorsArr;
  currentIndex.value = input.length;
  errors.value = errorsArr.length;
  // Metrics
  let elapsed = (Date.now() - startTime) / 60000;
  cpm.value = Math.round(charsTyped / (elapsed || 1));
  accuracy.value = input.length ? Math.round((correctChars / input.length) * 100) : 100;
  // Per-key stats
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (!keyStats.value[char]) keyStats.value[char] = { correct: 0, total: 0, accuracy: 100 };
    keyStats.value[char].total++;
    if (input[i] === currentSnippet.value[i]) keyStats.value[char].correct++;
    keyStats.value[char].accuracy = Math.round((keyStats.value[char].correct / keyStats.value[char].total) * 100);
  }
  saveStats();
  // Check for completion
  if (input === currentSnippet.value) {
    if (accuracy.value >= 90) {
      streak.value++;
      if (streak.value >= level.value) {
        level.value++;
        streak.value = 0;
        showConfetti();
      }
    } else {
      streak.value = 0;
    }
    pickSnippet();
  }
  // If any error, reset streak
  if (errorsArr.length > 0) streak.value = 0;
  saveStats();
}

function resetInput() {
  userInput.value = '';
  errorIndexes.value = [];
  currentIndex.value = 0;
}

function resetStats() {
  level.value = 1;
  streak.value = 0;
  cpm.value = 0;
  accuracy.value = 100;
  errors.value = 0;
  keyStats.value = {};
  saveStats();
  pickSnippet();
}

function saveStats() {
  localStorage.setItem(localStorageKey, JSON.stringify({
    level: level.value,
    streak: streak.value,
    keyStats: keyStats.value,
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
