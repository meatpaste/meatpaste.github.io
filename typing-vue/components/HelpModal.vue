<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-lg w-full relative">
      <h2 class="text-xl font-bold mb-2">How to Play</h2>
      <ul class="list-disc pl-5 mb-4 text-gray-700">
        <li>Type the displayed PHP code snippet as accurately as possible.</li>
        <li>Each key you type is tracked for accuracy, and keys will be colored from red (low accuracy) to green (high accuracy).</li>
        <li>To progress to the next level, you must achieve at least 90% accuracy for a number of snippets equal to your current level.</li>
        <li>If you make a mistake, your level-up streak resets for the current level.</li>
        <li>Your progress and key accuracy are saved automatically between sessions.</li>
        <li>Use the progress bars above to track your level and your current level-up streak.</li>
      </ul>
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-black">✕</button>
    </div>
  </div>
</template>
<script setup>
</script>
