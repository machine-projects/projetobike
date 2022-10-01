<template>
  <p> {{ eventId }} </p>
</template>

<script>


export default {
  name: 'InscricoesOuEventosDetalhes',
  props: {
    eventId: String
  }
}
</script>


<style scoped>
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}
</style>

