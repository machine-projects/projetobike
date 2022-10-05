<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'
import { getCities, getStates } from '@/services/CityService'
import { ref, reactive } from 'vue'
import type { Option } from '@/types/CityTypes'

const selectedCity = ref<string>('')
const selectedState = ref<Option | undefined>(undefined)
const states = reactive<Option[]>([])
const cities = reactive<Option[]>([])

// ========== WATCH SELECTED STATE PROP TO FETCH STATE CITIES ==========
watch(selectedState, (newSelectedState, oldSelectedState) => {
  console.log(newSelectedState)
  if (newSelectedState) {
    getCities(newSelectedState).then(res => {
      Object.assign(cities, [...res.data])
    })
  }

})

// ========================= FETCH STATES ===============================
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
  <div class="lg:flex lg:items-center lg:justify-between">
    <div class="min-w-0 flex-1">

      <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Procurar eventos
        </h2>
        <div class="mt-2 grow flex items-center text-sm text-gray-500">
          <SelectInput @@selecionado="selectedState = $event" name="Estado" :options="states" />
        </div>
        <div class="mt-2 grow flex items-center text-sm text-gray-500">
          <SelectInput @@selecionado="selectedCity = $event" name="Cidade" :options="cities" />
        </div>
        <div class="mt-7 grow flex items-center text-sm text-gray-500">
          <TextInput placeholder="Nome do evento" />
        </div>
      </div>
    </div>


    <span class="sm:ml-3 mt-7">
      <button type="button"
        class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <CheckIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Procurar
      </button>
    </span>
  </div>
</template>
