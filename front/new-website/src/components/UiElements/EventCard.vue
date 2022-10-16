<script setup lang="ts">

import type { Events } from '@/types/EventTypes';

const props = defineProps<{
  event: Events
}>()

const formatDate = (rawDate: string) => {
  const [date, hour] = rawDate.split('T')
  return date.split('-').reverse().join('/')
}
</script>

<template>
  <div class="bg-white drop-shadow-2xl  rounded-3xl p-4 m-4">
    <div class="flex-none sm:flex">
      <div class="flex-auto justify-evenly">
        <div class="flex items-center justify-between">
          <div class="flex items-center  my-1">
            <h2 class="font-medium">{{event.title}}</h2>
          </div>
        </div>
        <div class="border-dashed border-b-2 my-5"></div>
        <div class="flex flex-col items-center">
          <div class="flex flex-col mx-auto">
            <img :src="`http://localhost:3000/api/v1/event/file/${event.images.header.filename}`" class="w-full p-1">
          </div>
          <div v-if="event.isFeatured" class="ml-auto text-blue-800">Evento Patrocinado</div>
          <div v-else="event.isFeatured" class="ml-auto text-transparent">Featured</div>
        </div>
        <div class="border-dashed border-b-2 pt-5"></div>

        <div class="flex flex-col items-center mb-5 p-5 text-sm">
          <div class="flex flex-col w-full items-center">
            <span class="text-sm font-bold">Datas</span>
            <div class="flex w-full">
              <span class="flex grow items-center flex-col">
                <p class="font-semibold">Inicio</p>
                <p> {{ formatDate(event.startDate) }} </p>
              </span>
              <span class="flex grow items-center flex-col">
                <p class="font-semibold">Fim</p>
                <p> {{ formatDate(event.stopDate)}} </p>
              </span>
            </div>
            <span class="font-bold mt-5">Local</span>
            <p> {{ event.city }} / {{ event.state }}</p>
            <span class="font-bold mt-5 flex">Descriçao</span>
            <p v-if="event.description.length > 120" class="description-container ellipsis"> {{ event.description }}</p>
            <p v-else class="description-container"> {{ event.description }}</p>
          </div>
        </div>

        <div class="border-dashed border-b-2 pt-2 mb-4"></div>

        <button
          class="rounded-full border border-indigo-500 bg-indigo-500 text-white px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline w-full">
          Inscrever-se</button>
      </div>
    </div>
  </div>
</template>

<style>
.description-container {
  min-height: 100px;
  max-height: 100px;
  overflow: hidden;
  position: relative;
}

.ellipsis::after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>