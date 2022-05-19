<template>
    <div>
    <b-form-group
        :label=label
    
    >
        <b-input-group 
        size="sm" 
        class="mb-2"
        >
          <b-input-group-prepend is-text>
            <mdicon size="19" :name=iconName />
          </b-input-group-prepend>
          <b-form-select
           v-model="selectedState"
           @change="selectState"
          >
           <b-form-select-option 
            disabled
            value="null"
           >
           Escolha o Estado
           </b-form-select-option> 
           <b-form-select-option 
            v-for="state in states.data" 
            :key="state.id"
            :value="state"
           >
           {{ state.nome }}
           </b-form-select-option> 
          </b-form-select>
        </b-input-group>
    </b-form-group>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      states: [],
      selectedState: null
    }
  },
  name: "StateInput",
  props: {
      iconName: String,
      label: String
  },
   mounted () {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => (this.states = response))
  },
  methods: {
    selectState: function (event) {
      console.log(event)
      this.$emit('selectedStateObject', this.selectedState)
    }
  }
};
</script>


<style scoped>
</style>