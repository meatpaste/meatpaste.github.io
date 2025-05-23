<template>
  <div class="w-full max-w-2xl mt-8">
    <div v-for="(row, rowIndex) in keyRows" :key="rowIndex" class="flex gap-2 mb-2 justify-center">
      <span
        v-for="key in row"
        :key="key.main + (key.shift || '')"
        :style="{ background: keyBg(key.main, key.shift), minWidth: key.main === 'Space' ? '16ch' : '3.5ch' }"
        class="rounded px-4 py-3 text-lg font-mono flex flex-col items-center justify-center border border-gray-300 shadow-sm select-none relative min-h-[3.5em]"
      >
        <span v-if="key.shift" class="text-xs text-gray-500 absolute top-1 left-1 w-full text-left">{{ key.shift }}</span>
        <span v-if="key.main === 'Space'">␣</span>
        <span v-else class="mt-2">{{ key.main }}</span>
      </span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ keyStats: Object });

// Helper to get lowest accuracy for all symbols on a key
function getKeyAccuracy(main, shift) {
  let min = 100;
  const symbols = [];
  if (main && main !== 'Tab' && main !== 'Space' && main !== '<=') symbols.push(main);
  if (shift) symbols.push(shift);
  for (const sym of symbols) {
    const key = encodeURIComponent(sym);
    if (props.keyStats && props.keyStats[key] && typeof props.keyStats[key].accuracy === 'number') {
      min = Math.min(min, props.keyStats[key].accuracy);
    }
  }
  return min;
}

// Helper to get color from accuracy
function keyBg(main, shift) {
  const accuracy = getKeyAccuracy(main, shift);
  const hue = Math.round((accuracy / 100) * 120);
  return `hsl(${hue}, 100%, 45%)`;
}

// Apple Magic Keyboard (UK) layout rows with shifted symbols
const keyRows = [
  // Row 1 (top, left to right)
  [
    { main: '`', shift: '~' }, { main: '¬', shift: '|' }, { main: '1', shift: '!' }, { main: '2', shift: '"' },
    { main: '3', shift: '£' }, { main: '4', shift: '$' }, { main: '5', shift: '%' }, { main: '6', shift: '^' },
    { main: '7', shift: '&' }, { main: '8', shift: '*' }, { main: '9', shift: '(' }, { main: '0', shift: ')' },
    { main: '-', shift: '_' }, { main: '=', shift: '+' }, { main: '<=' }
  ],
  // Row 2
  [
    { main: 'Tab' }, { main: 'Q' }, { main: 'W' }, { main: 'E' }, { main: 'R' }, { main: 'T' }, { main: 'Y' },
    { main: 'U' }, { main: 'I' }, { main: 'O' }, { main: 'P' }, { main: '[', shift: '{' }, { main: ']', shift: '}' }, { main: '#', shift: '~' }
  ],
  // Row 3
  [
    { main: 'Caps' }, { main: 'A' }, { main: 'S' }, { main: 'D' }, { main: 'F' }, { main: 'G' }, { main: 'H' },
    { main: 'J' }, { main: 'K' }, { main: 'L' }, { main: ';', shift: ':' }, { main: ' 27', shift: '@' }, { main: 'Enter' }
  ],
  // Row 4
  [
    { main: 'Shift' }, { main: '\\', shift: '|' }, { main: 'Z' }, { main: 'X' }, { main: 'C' }, { main: 'V' },
    { main: 'B' }, { main: 'N' }, { main: 'M' }, { main: ',', shift: '<' }, { main: '.', shift: '>' }, { main: '/', shift: '?' }, { main: 'Shift' }
  ],
  // Row 5 (space row)
  [ { main: 'Space' } ]
];

</script>
