<script setup lang="ts">
import { getEvents } from '@/services/EventService';
import { onMounted } from 'vue';

onMounted(() => {
  setTimeout(() => {
    getEvents()
  }, 2000)
})
</script>
  
<template>
  <div class="eventos">
    <Events />
  </div>
</template>
  