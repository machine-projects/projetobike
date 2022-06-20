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
            v-model="selectedCity"
              @change="selectCity"
              class="pl-2 w-75 rounded"
              style="border: 1px solid #ced4da"
            >
            <b-form-select-option 
              disabled
              value="undefined"
            >
            Escolha a Cidade
            </b-form-select-option> 
              <b-form-select-option 
              v-for="city in cities.data" 
              :key="city.id"
              :value="city"
            >
            {{ city.nome }}
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
      cities: [],
      selectedCity: undefined
    }
  },
  name: "CityInput",
  props: {
    iconName: String,
    label: String,
    stateObject: Object
  },
  watch: {
    stateObject() {
      axios
      .get(this.refreshAxiosLink)
      .then(response => (this.cities = response))
    }
  },
  computed: {
    refreshAxiosLink() {
      return `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ this.stateObject.id }/municipios`
    }
  },
  methods: {
    selectCity: function (event) {
      console.log(event)
      this.$emit('selectedCity', this.selectedCity)
    }
  }
}
</script>


<style scoped>
</style>



{"data":[{"id":11,"sigla":"RO","nome":"Rondônia","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":12,"sigla":"AC","nome":"Acre","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":13,"sigla":"AM","nome":"Amazonas","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":14,"sigla":"RR","nome":"Roraima","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":15,"sigla":"PA","nome":"Pará","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":16,"sigla":"AP","nome":"Amapá","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":17,"sigla":"TO","nome":"Tocantins","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":21,"sigla":"MA","nome":"Maranhão","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":22,"sigla":"PI","nome":"Piauí","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":23,"sigla":"CE","nome":"Ceará","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":24,"sigla":"RN","nome":"Rio Grande do Norte","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":25,"sigla":"PB","nome":"Paraíba","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":26,"sigla":"PE","nome":"Pernambuco","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":27,"sigla":"AL","nome":"Alagoas","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":28,"sigla":"SE","nome":"Sergipe","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":29,"sigla":"BA","nome":"Bahia","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":31,"sigla":"MG","nome":"Minas Gerais","regiao":{"id":3,"sigla":"SE","nome":"Sudeste"}},{"id":32,"sigla":"ES","nome":"Espírito Santo","regiao":{"id":3,"sigla":"SE","nome":"Sudeste"}},{"id":33,"sigla":"RJ","nome":"Rio de Janeiro","regiao":{"id":3,"sigla":"SE","nome":"Sudeste"}},{"id":35,"sigla":"SP","nome":"São Paulo","regiao":{"id":3,"sigla":"SE","nome":"Sudeste"}},{"id":41,"sigla":"PR","nome":"Paraná","regiao":{"id":4,"sigla":"S","nome":"Sul"}},{"id":42,"sigla":"SC","nome":"Santa Catarina","regiao":{"id":4,"sigla":"S","nome":"Sul"}},{"id":43,"sigla":"RS","nome":"Rio Grande do Sul","regiao":{"id":4,"sigla":"S","nome":"Sul"}},{"id":50,"sigla":"MS","nome":"Mato Grosso do Sul","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}},{"id":51,"sigla":"MT","nome":"Mato Grosso","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}},{"id":52,"sigla":"GO","nome":"Goiás","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}},{"id":53,"sigla":"DF","nome":"Distrito Federal","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}}],"status":200,"statusText":"OK","headers":{"cache-control":"max-age=2592000","content-length":"491","content-type":"application/json; charset=utf-8","expires":"Wed, 18 May 2022 03:04:58 GMT"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"adapter":{"_custom":{"type":"function","display":"<span>f</span> xhrAdapter(confi)","_reviveId":108}},"transformRequest":[{"_custom":{"type":"function","display":"<span>f</span> transformRequest(data, header)","_reviveId":109}}],"transformResponse":[{"_custom":{"type":"function","display":"<span>f</span> transformResponse(dat)","_reviveId":110}}],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"validateStatus":{"_custom":{"type":"function","display":"<span>f</span> validateStatus(statu)","_reviveId":111}},"headers":{"Accept":"application/json, text/plain, */*"},"method":"get","url":"https://servicodados.ibge.gov.br/api/v1/localidades/estados","data":"__vue_devtool_undefined__"},"request":"[object XMLHttpRequest]"}