<template>
  <div class="w-100">
    <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="3">
        <b-card-img src="https://c.pxhere.com/photos/22/96/bike_race_bike_racers_racing_cyclists_bikers_race_event_bike_cyclist-930671.jpg!d" width="10px" alt="Image" class="rounded-0">    </b-card-img>
      </b-col>
      <b-col md="9">
        <b-card-body :title="title">
          <b-table label-sort-asc="" label-sort-desc="" label-sort-clear="" :busy="isBusy" striped hover :items="eventos" :fields="fields">
            <template #cell(DETALHES)="row">
              <!-- <p> {{row}} </p> -->
              <b-button @click="details(row)">{{ row.isActive ? 'ESCONDER' : 'MOSTRAR'}} DETALHES</b-button>
            </template>
             <template #table-busy>
              <div class="text-center text-dark my-2">
                <b-spinner class="mx-4 align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
          </b-table>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  </div>
</template>

<script>


export default {
  name: 'MinhasInscricoes',
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
        },
        {
          key: "DETALHES"
        }
      ]
    }
  },
  props: {
    eventos: Array,
    title: String
  },
  methods: {
    details(row) {
      if((this.$route.name === "inscricoesoueventosdetalhes" || this.$route.name === 'cadastrarEvento')&& this.$route.params.eventId !== row.item.id.toString() ) {
        this.$router.push({ name: 'inscricoesoueventosdetalhes', params: { eventId: row.item.id.toString() } })
      }
    }
  }
}
</script>


<style scoped>
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}

</style>
