<script setup lang="ts">
import type { Option } from '@/types/CityTypes'
import { getStates, getCities } from '@/services/CityService'
import { useCityStore } from '@/stores/cityStore'

const emit = defineEmits<{
  (e: '@stateChanged', data: string): void
}>()

const cityStore = useCityStore()
const selected = ref<Option | null>(null)
const states = reactive<Option[]>([])

const updateStateData = () => {
  cityStore.selectedState = selected.value
  getCities(selected.value as Option).then((res) => {
    cityStore.cities = res.data
  })
  emit('@stateChanged', selected.value?.sigla ?? '')
}

onMounted(() => {
  getStates().then(res => {
    const temp = res.data.map(({ id, nome, sigla }: Option) => {
      return { id, nome, sigla: sigla?.toLowerCase() }
    })
    states.push(...temp)
  })
})
</script>


<template>
  <div class="flex flex-col w-full">
    <label for="state" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
      Estado
    </label>
    <select v-model="selected" id="state" @change="updateStateData"
      class="block p-2 w-full text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
      <option value="null" disabled>Escolha um Estado</option>
      <option v-for="state in states" :key="state.id" :value="state"> {{ state.nome }}
      </option>
    </select>
  </div>
</template>