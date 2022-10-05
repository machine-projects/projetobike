<script setup lang="ts">
import { defineProps } from 'vue';
import type { Option } from '@/types/CityTypes'

const selected = ref<string | null>(null)

const props = defineProps<{
  name: string,
  options?: Option[]
}>()
</script>


<template>
  <div class="flex flex-col w-full">
    <label for="small"
      class="font-bold text-gray-900 sm:truncate sm:tracking-tight block mb-2 text-sm dark:text-gray-400 uppercase">
      {{ name }}
    </label>
    <select v-model="selected" id="small" @change="$emit('@selecionado', selected)"
      class="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value="null" disabled>Escolha um {{ name }}</option>
      <option v-for="option in options" :key="option.id" :value="option"> {{ option.nome }}
      </option>
    </select>
  </div>
</template>