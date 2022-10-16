<script setup lang="ts">
import { useCityStore } from '@/stores/cityStore'

const emit = defineEmits<{
  (e: '@cityChanged', data: string): void
}>()

const cityStore = useCityStore()

const selected = ref<string | null>(null)

const updateCityData = () => {
  emit('@cityChanged', selected.value ?? '')
}
</script>


<template>
  <div class="flex flex-col w-full">
    <label for="city" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
      Cidade
    </label>
    <select v-model="selected" id="city" @change="updateCityData"
      class="block p-2 w-full text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
      <option value="null" disabled>Escolha uma Cidade</option>
      <option v-for="city in cityStore.cities" :key="city.id" :value="city.nome"> {{ city.nome }}
      </option>
    </select>
  </div>
</template>