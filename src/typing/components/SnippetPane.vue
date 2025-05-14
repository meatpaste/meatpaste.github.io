<template>
  <div class="flex-1 bg-gray-50 rounded shadow p-4 min-h-[180px]">
    <pre class="text-blue-900 text-lg whitespace-pre-wrap">{{ snippet }}</pre>
  </div>
</template>
<script setup>
defineProps({ snippet: String });
</script>
