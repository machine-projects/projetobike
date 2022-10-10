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
    <label :for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
      {{ name }}
    </label>
    <select v-model="selected" :id="name" @change="$emit('@selecionado', selected)"
      class="block p-2 w-full text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
      <option value="null" disabled>Escolha um {{ name }}</option>
      <option v-for="option in options" :key="option.id" :value="option"> {{ option.nome }}
      </option>
    </select>
  </div>
</template>