<template>
  <div>
    <h1> Cadastre seu evento </h1>

    <createEvent></createEvent>
  </div>
</template>

<script>
import CreateEvent from '@/components/forms/CreateEvent.vue'

export default {
  name: 'InscricoesOuEventosDetalhes',
  props: {
    eventId: String
  },
  components: {
    CreateEvent
  }
}
</script>


<style scoped>
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}
</style>

