<template>
  <div class="w-full max-w-2xl mt-8">
    <div class="flex flex-wrap gap-1">
      <span v-for="key in keys" :key="key" :style="{ background: keyBg(key) }" class="rounded px-2 py-1 text-sm font-mono">
        {{ key }}
      </span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ keyStats: Object });
const keys = [
  'Q','W','E','R','T','Y','U','I','O','P',
  'A','S','D','F','G','H','J','K','L',
  'Z','X','C','V','B','N','M',
  '1','2','3','4','5','6','7','8','9','0',
  ';',':','"','\'','[',']','{','}','(',')','$','=','+','-','*','/','<','>','?','.',',','_','|','&','%','!','@','#','^','~','`','\\'
];
function keyBg(key) {
  if (!props.keyStats || !props.keyStats[key]) return '#e5e7eb';
  const acc = props.keyStats[key].accuracy || 0;
  // red to green
  const g = Math.floor(255 * acc / 100);
  const r = 255 - g;
  return `rgb(${r},${g},100)`;
}
</script>
