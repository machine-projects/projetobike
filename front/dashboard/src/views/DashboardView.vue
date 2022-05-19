<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col
          md="8"
          cols="12"
          class="p-0"
        >

        <v-card>
          <div
            style="background-color: #E0E0E0"
          >
            <v-card-title>
              <v-icon
                class="mr-1"
              >mdi-format-list-bulleted</v-icon>
              Suas Inscrições
            </v-card-title>
            <v-card-subtitle>
              Veja o histórico e status das suas inscrições nos eventos.
            </v-card-subtitle>
          </div>
            <v-text-field
              class="w-75"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-data-table
              :search="search"
              :headers="headers"
              :items="eventos"
              :items-per-page="5"
              flat
            ></v-data-table>

        </v-card>

          <v-card>
          <div
            style="background-color: #E0E0E0"
          >
            <v-card-title>
              <v-icon
                class="mr-1"
              >mdi-format-list-bulleted</v-icon>
              Suas Inscrições
            </v-card-title>
            <v-card-subtitle>
              Veja o histórico e status das suas inscrições nos eventos.
            </v-card-subtitle>
          </div>

        </v-card>

        </v-col>
        <v-col
          md="4"
          cols="12"
          class="p-0"
        >

         <div
          style="background: green"
          class="my-1"
        >
          b
        </div>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'EVENTOS',
          align: 'center',
          value: 'evento',
        },
        { text: 'ATLETAS',
          filterable: false,
          align: 'center',
          value: 'atletas' },
        { text: 'STATUS',
          filterable: false,
          align: 'center',
          value: 'status',
          type: Boolean,
        },
      ],
      eventos: [
        {
          evento: 'São Silvestre',
          atletas: 'Voce mesmo',
          status: 'Finalizado'
        },
      ]
    }
  }
}
</script>


<style lang="css" scoped>
  .p-0 {
    padding: 0;
  }

  .my-1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .mr-1 {
    margin-right: 1rem;
  }

  .w-75 {
    width: 75%;
    margin: auto;
  }
</style>
