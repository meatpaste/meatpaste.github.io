<template>
  <div class="w-full max-w-2xl my-4">
    <div class="mb-2">
      <span class="font-semibold">Level Progress</span>
      <div class="w-full bg-gray-300 rounded h-4">
        <div class="bg-blue-600 h-4 rounded" :style="{ width: (level / maxLevel * 100) + '%' }"></div>
      </div>
    </div>
    <div>
      <span class="font-semibold">Level-Up Streak</span>
      <div class="w-full bg-gray-300 rounded h-4">
        <div class="bg-green-500 h-4 rounded" :style="{ width: (streak / streakGoal * 100) + '%' }"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  level: Number,
  streak: Number,
  maxLevel: Number,
  streakGoal: Number,
});
</script>
