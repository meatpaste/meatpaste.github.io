<template>
  <div class="flex-1 bg-white rounded shadow p-4 min-h-[180px] relative" :class="{ 'flash-error': flashError }" @click="focusInput">
    <div class="text-gray-700 text-lg whitespace-pre-wrap min-h-[100px]">
      <span v-for="(item, i) in displayChars" :key="i">
        <span v-if="item.isCursor && isFocused" class="blinking-cursor">|</span>
        <span v-else :class="item.class">{{ item.char }}</span>
      </span>
    </div>
    <textarea
      ref="inputRef"
      v-model="inputValue"
      class="absolute opacity-0 w-0 h-0"
      @input="emitInput"
      @keydown="onKeydown"
      @focus="isFocused = true"
      @blur="isFocused = false"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, nextTick } from 'vue';
const props = defineProps({
  userInput: String,
  snippet: String,
  errorIndexes: Array,
  currentIndex: Number,
  showCursor: Boolean
});
const emit = defineEmits(['input', 'reset', 'error']);
const inputRef = ref(null);
const inputValue = ref(props.userInput);
const isFocused = ref(true);

watch(() => props.userInput, (val) => {
  inputValue.value = val;
});

function emitInput() {
  emit('input', inputValue.value);
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    emit('reset');
    setTimeout(() => inputRef.value && inputRef.value.focus(), 0);
    return;
  } else if (e.key === 'Tab') {
    e.preventDefault();
    // Only allow if next 4 snippet chars are all spaces
    const expected = (props.snippet || '').substr(props.currentIndex, 4);
    if (expected === '    ') {
      const textarea = inputRef.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      inputValue.value =
        inputValue.value.substring(0, start) +
        '    ' +
        inputValue.value.substring(end);
      // Move caret after inserted spaces
      nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      });
      emit('input', inputValue.value);
    } else {
      flashErrorNow();
      emit('error');
    }
    return;
  }

  // Allow navigation and editing keys
  const allowed = [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    'Home', 'End', 'Control', 'Meta', 'Alt', 'Shift', 'CapsLock', 'Enter'
  ];
  if (allowed.includes(e.key)) return;

  // If Enter is expected
  if (e.key === 'Enter') {
    if ((props.snippet[props.currentIndex] || '') === '\n') return;
    e.preventDefault();
    flashErrorNow();
    emit('error');
    return;
  }

  // Check if the key matches the next snippet character
  const expectedChar = props.snippet[props.currentIndex] || '';
  let pressedChar = e.key;
  // Always emit keyevent for stats tracking
  emit('keyevent', { expected: expectedChar, actual: pressedChar });
  // Handle space
  if (pressedChar === ' ') pressedChar = ' ';
  // Handle special printable characters
  if (pressedChar.length === 1 && pressedChar === expectedChar) {
    // Allow
    return;
  } else {
    e.preventDefault();
    flashErrorNow();
    emit('error');
  }
}

const flashError = ref(false);
function flashErrorNow() {
  flashError.value = true;
  setTimeout(() => { flashError.value = false; }, 150);
}

function focusInput() {
  inputRef.value && inputRef.value.focus();
}

const displayChars = computed(() => {
  const arr = [];
  const user = props.userInput || '';
  const target = props.snippet || '';
  const len = Math.max(user.length, target.length);
  for (let i = 0; i < len; i++) {
    // Insert cursor at caret position
    if (i === props.currentIndex) {
      arr.push({ isCursor: true });
    }
    let char = user[i] || '';
    let className = '';
    if (i < user.length && i < target.length) {
      if (char === target[i]) className = 'typed-correct';
      else className = 'typed-error';
    }
    arr.push({ char: char || (i < target.length ? ' ' : ''), class: className });
  }
  // If caret is at the end, show cursor at the end
  if (props.currentIndex === len) {
    arr.push({ isCursor: true });
  }
  return arr;
});

onMounted(() => {
  focusInput();
});
</script>

<style scoped>
.blinking-cursor {
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.typed-correct { color: #059669; }
.typed-error { color: #dc2626; background: #fee2e2; }
.flash-error {
  animation: flash-bg 0.15s;
  box-shadow: 0 0 0 2px #dc2626, 0 2px 8px #fecaca;
}
@keyframes flash-bg {
  0% { background: #fee2e2; }
  100% { background: white; }
}

</style>
