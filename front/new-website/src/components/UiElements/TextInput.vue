<script setup lang="ts">

const emit = defineEmits<{
  (e: '@eventNameChanged', data: string): void
}>()

const props = defineProps<{
  placeholder: string
}>()

const eventName = ref('')
</script>


<template>
  <div class="relative flex w-full flex-wrap items-stretch">
    <input v-model="eventName" @input="emit('@eventNameChanged', eventName)" type="text" :placeholder="placeholder"
      class="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
  </div>
</template>