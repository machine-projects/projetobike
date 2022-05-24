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
              @selectedStateObject="selectedStateReceive = $event"
              />
            </div>
            <div class="col-sm-3">
              <CityInput 
                label="Cidade:"
                @selectedCity="selectedCityReceive = $event"
                :stateObject="this.selectedStateReceive"
                iconName="city-variant-outline" 
                placeholder="Selecione o Estado"
              />
            </div>
            <div class="col-sm-3">
              <TextInput 
              label="Nome do evento:"
              iconName="run-fast" 
              placeholder="Escreva o nome do evento"
              type="search"
              />
            </div>
            <div class="col-sm-3 d-flex justify-content-center">
              <b-button href="#" variant="primary">Buscar</b-button>
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

export default {
  data() {
    return {
      selectedStateReceive: undefined,
      selectedCityReceive: undefined
    }
  },
  name: "BuscarCorridas",
  components: {
    TextInput,
    StateInput,
    CityInput
  },
};
</script>


<style scoped>
  a {
    margin: auto auto;
    height: fit-content;
  }
</style>
