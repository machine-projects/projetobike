import type { EventsResponse } from '@/types/EventTypes'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: {
      data: [],
      count: 0,
      currentPage: 0,
      nextPage: null,
      prevPage: null,
      lastPage: 0
    } as EventsResponse // TODO SEE THE RIGHT TYPE FOR THIS VAR
  }),
  getters: {},
  actions: {
    changeEvent(data: EventsResponse) {
      this.events = data
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventStore, import.meta.hot))
}
