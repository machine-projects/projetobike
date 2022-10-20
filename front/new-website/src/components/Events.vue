<script setup lang="ts">
import { useEventStore } from '@/stores/eventStore';
import type { EventsResponse } from '@/types/EventTypes';
import { computed } from 'vue'
import { getEvents } from "@/services/EventService";

const eventStore = useEventStore();
const events = computed<EventsResponse>(() => eventStore.events)

const pageChange = (event: any) => {
  window.scrollTo(0, 0)
  getEvents(12, event).then((res) => {
    eventStore.changeEvent(res)
  })
}

</script>

<template>

  <body class="overflow-y-hidden">
    <div class="2xl:container 2xl:mx-auto">
      <div class="bg-gray-50 text-center lg:py-10 md:py-8 py-6">
        <p
          class="w-10/12 mx-auto md:w-full font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">
          Eventos</p>
      </div>
      <div class="py-6 lg:px-20 md:px-6 px-4">
        <BuscarCorridas />

        <hr class="w-full bg-gray-200 my-6" />

        <div class="flex justify-between items-center">
          <!-- <div class="flex space-x-3 justify-center items-center">
            <svg class="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75 7.5H20.25" stroke="#1F2937" stroke-miterlimit="10" stroke-linecap="round" />
              <path d="M3.75 12H20.25" stroke="#1F2937" stroke-miterlimit="10" stroke-linecap="round" />
              <path d="M3.75 16.5H20.25" stroke="#1F2937" stroke-miterlimit="10" stroke-linecap="round" />
            </svg>
            <p class="font-normal text-base leading-4 text-gray-800">Filtrar</p>
          </div> -->
          <p class="cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">Mostrando
            {{ events.count }} eventos</p>
        </div>

        <div class="grid lg:grid-cols-4 grid-cols-1 lg:gap-y-6 lg:gap-x-1 sm:gap-y-5 gap-y-3 lg:mt-12 mt-10">
          <EventCard v-for="event in events.data" :key="event.id" :event="event" />
        </div>

        <div class="flex justify-center items-center">
          <Pagination :totalItems="events.count" :currentPage="events.currentPage" :perPage="12"
            @@page-changed="pageChange" :goButton="false" styled="centered" />
        </div>
      </div>
    </div>
  </body>
</template>