<script lang="ts">
import { defineComponent } from 'vue';
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

export default defineComponent({
  data() {
    return {

    }
  },
  components: {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    MapPinIcon
  }
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
          <SelectInput name="Estado" />
        </div>
        <div class="mt-2 grow flex items-center text-sm text-gray-500">
          <SelectInput name="Cidade" />
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
