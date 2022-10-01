<template>
  <div class="w-100">
    <b-card
      header="Próximos Eventos"
      header-tag="h1"
    >
       <b-tabs content-class="mt-3">
        <b-tab title="Patrocinados" active>
          <EventosCarrossel></EventosCarrossel>
        </b-tab>
        <b-tab title="Todos">
          <EventosCarrossel></EventosCarrossel>
        </b-tab>
      </b-tabs>
   
    </b-card>
  </div>
</template>

<script>
import EventosCarrossel from '@/components/EventosCarrossel'

export default {
  name: 'MinhasInscricoes',
  components: {
    EventosCarrossel
  },  
  data() {
    return {
      isBusy: false,
      fields: [
        {
          key: 'EVENTO',
          sortable: true
        },
        {
          key: 'ATLETA(S)',
          sortable: true
        },
        {
          key: 'STATUS',
          sortable: true
        }
      ]
    }
  },
  props: {
    eventos: Array
  }
}
</script>


<style scoped>
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}
</style>
