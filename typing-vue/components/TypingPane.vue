<template>
  <div class="flex-1 bg-white rounded shadow p-4 min-h-[180px] relative" @click="focusInput">
    <div class="text-gray-700 text-lg whitespace-pre-wrap min-h-[100px]">
      <span v-for="(char, i) in displayChars" :key="i" :class="char.class">
        {{ char.char }}
      </span>
      <span v-if="showCursor && currentIndex === userInput.length" class="blinking-cursor">|</span>
    </div>
    <textarea
      ref="inputRef"
      v-model="inputValue"
      class="absolute opacity-0 w-0 h-0"
      @input="emitInput"
      @keydown="onKeydown"
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
const emit = defineEmits(['input', 'reset']);
const inputRef = ref(null);
const inputValue = ref(props.userInput);

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
  } else if (e.key === 'Tab') {
    e.preventDefault();
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
  }
}

function focusInput() {
  inputRef.value && inputRef.value.focus();
}

const displayChars = computed(() => {
  const arr = [];
  const user = props.userInput || '';
  const target = props.snippet || '';
  for (let i = 0; i < target.length; i++) {
    let char = user[i] || '';
    let className = '';
    if (i < user.length) {
      if (char === target[i]) className = 'typed-correct';
      else className = 'typed-error';
    }
    if (i === props.currentIndex) className += ' current';
    arr.push({ char: char || ' ', class: className.trim() });
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
.current { text-decoration: underline; }
</style>
