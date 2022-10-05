import { defineStore, acceptHMRUpdate } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: {} as any // TODO SEE THE RIGHT TYPE FOR THIS VAR
  }),
  getters: {},
  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventStore, import.meta.hot))
}
