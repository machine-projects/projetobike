<template>
  <div>
    <b-card-group deck>
      <b-card
       header="Buscar Evento" 
       header-tag="header" 
       align="left"
      >
        <div class="container">
          <div class="row">
            <div class="col-sm-3">
              <StateInput 
               label="Estado:"
              iconName="city-variant-outline" 
              placeholder="Selecione o Estado"
              @selectedStateObject="selectStateMethod"
              />
            </div>
            <div class="col-sm-3">
              <CityInput 
                label="Cidade:"
                @selectedCity="selectedCityReceive = $event"
                @eraseSelectedCity="selectedCityReceive = $event;"
                :stateObject="this.selectedStateReceive"
                iconName="city-variant-outline" 
                placeholder="Selecione o Estado"
              />
            </div>
            <div class="col-sm-3">
              <TextInput 
              @selectedEvent="selectedEvent = $event"
              label="Nome do evento:"
              iconName="run-fast" 
              placeholder="Escreva o nome do evento"
              type="search"
              />
            </div>
            <div class="col-sm-3 d-flex justify-content-center">
              <b-button
               href="#"
               variant="primary text-white"
               @click="searchEvents"
              >
                Buscar
              </b-button>
            </div>
          </div>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import TextInput from "./inputs/TextInput.vue";
import StateInput from "./inputs/StateInput.vue";
import CityInput from "./inputs/CityInput.vue";
import router from '@/router/index'

export default {
  data() {
    return {
      selectedStateReceive: undefined,
      selectedCityReceive: undefined,
      selectedEvent: undefined,
    }
  },
  name: "BuscarCorridas",
  components: {
    TextInput,
    StateInput,
    CityInput
  },
  methods: {
    selectStateMethod($event) {
      this.selectedStateReceive = $event
      this.selectedCityReceive = undefined
      
    },
    eraseSelectedCity() {
      this.selectedCityReceive = ""
    },
    searchEvents() {
      if (this.selectedStateReceive !== undefined && this.selectedCityReceive == undefined && this.selectedEvent == undefined) {
        router.replace({ query: {state: this.selectedStateReceive.nome.toLowerCase()}})
      }
      else if (this.selectedStateReceive !== undefined && this.selectedCityReceive !== undefined && this.selectedEvent == undefined) {
        router.replace({ query: {state: this.selectedStateReceive.nome.toLowerCase(), city: this.selectedCityReceive.nome.toLowerCase()}})
      }
      else if (this.selectedStateReceive !== undefined && this.selectedCityReceive !== undefined && this.selectedEvent !== undefined) {
        router.replace({ query: {state: this.selectedStateReceive.nome.toLowerCase(), city: this.selectedCityReceive.nome.toLowerCase(), event: this.selectedEvent.toLowerCase()}})
      }
      else if (this.selectedStateReceive == undefined && this.selectedCityReceive !== undefined && this.selectedEvent == undefined) {
        router.replace({ query: {city: this.selectedCityReceive.nome.toLowerCase()}})
      }
      else if (this.selectedStateReceive == undefined && this.selectedCityReceive !== undefined && this.selectedEvent !== undefined) {
        router.replace({ query: {city: this.selectedCityReceive.nome.toLowerCase(), event: this.selectedEvent.toLowerCase()}})
      }
      else if (this.selectedStateReceive == undefined && this.selectedCityReceive == undefined && this.selectedEvent !== undefined) {
        router.replace({ query: {event: this.selectedEvent}})
      }
      else return
    }
  }
};
</script>


<style scoped>
  a {
    margin: auto auto;
    height: fit-content;
  }
</style>
