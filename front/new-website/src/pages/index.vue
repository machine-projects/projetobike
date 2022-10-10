<script setup lang="ts">
import { getEvents } from '@/services/EventService';
import { onMounted } from 'vue';

onMounted(() => {
  getEvents()
})
</script>
  
<template>
  <div class="eventos">
    <Events />
  </div>
</template>
  