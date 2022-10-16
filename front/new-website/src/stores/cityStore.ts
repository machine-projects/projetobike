import { getCities } from '@/services/CityService'
import type { Option } from '@/types/CityTypes'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCityStore = defineStore('city', {
  state: () => ({
    selectedState: {} as Option | null,
    cities: {} as Option[]
  }),
  getters: {},
  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCityStore, import.meta.hot))
}
