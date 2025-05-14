<template>
  <div class="flex gap-6 my-4 text-lg">
    <div><span class="font-semibold">CPM:</span> {{ wpm }}</div>
    <div><span class="font-semibold">Accuracy:</span> {{ accuracy }}%</div>
    <div><span class="font-semibold">Errors:</span> {{ errors }}</div>
    <div><span class="font-semibold">Level:</span> {{ level }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  wpm: Number,
  accuracy: Number,
  errors: Number,
  level: Number,
});
</script>
