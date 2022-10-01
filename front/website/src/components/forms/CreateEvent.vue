<template>
  <div class="create-event">
    <b-form id="form" @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group
        id="eventTitle-group"
        label="Nome do Evento:"
        label-for="eventTitle"
      >
        <b-form-input
          id="eventTitle"
          v-model="form.title"
          type="text"
          placeholder="Insira o nome do evento..."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="description-group" label="Descrição do evento:" label-for="description">
        <b-form-textarea
        id="description"
          v-model="form.description"
          placeholder="Insira a descrição do seu evento"
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="photos-group" label="Escolha as fotos:" label-for="photos" description="Máximo de 8 fotos">
        <b-form-file
          id="photos"
          v-model="form.photos"
          plain
          multiple
          accept="image/*"
        ></b-form-file>
        <br/>
      </b-form-group>

      <b-form-group id="imageHeader-group" label="Escolha o banner:" label-for="imageHeader" description="O banner será exibido como foto principal de seu evento">
        <b-form-file
          id="imageHeader"
          v-model="form.imageHeader"
          plain
          accept="image/*"
        ></b-form-file>
        <br/>
      </b-form-group>
      
      <b-form-group id="featured-group" label="Deseja promover seu evento?" label-for="featured">
        <b-form-checkbox
          id="featured"
          v-model="form.isFeatured"
          name="checkbox-1"
        >
          Promover evento
        </b-form-checkbox>
      </b-form-group>
      
      <b-form-group id="startDate-group" label="Informe a data de inicio" label-for="startDate">
        <b-form-datepicker
          id="startDate"
          v-model="form.startDate"
          name="datepicker-1"
        >
        </b-form-datepicker>
      </b-form-group>
   
      <b-form-group id="stopDate-group" label="Informe a data do termino" label-for="stopDate">
        <b-form-datepicker
          id="stopDate"
          v-model="form.stopDate"
          name="datepicker-2"
        >
        </b-form-datepicker>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        form: {
          title: '',
          description: '',
          photos: [],
          imageHeader: null,
          isFeatured: false,
          startDate: undefined,
          stopDate: undefined,
          city: 'Campo Grande',
          state: 'MS',
          hour: "13:00",
          eventType: "mountain bike"
        },

        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      }
    },
    methods: {
      onSubmit() {
        alert(JSON.stringify(this.form))

        const formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('description', this.form.description)
        formData.append('photos', this.form.photos)
        formData.append('imageHeader', this.form.imageHeader)
        formData.append('isFeatured', this.form.isFeatured)
        formData.append('startDate', this.form.startDate)
        formData.append('stopDate', this.form.stopDate)
        formData.append('city', this.form.city)
        formData.append('state', this.form.state)
        formData.append('hour', this.form.hour)
        formData.append('eventType', this.form.eventType)
        
        axios({
          method: "post",
          url: "http://localhost:3000/api/v1/event",
          data: formData,
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + this.$store.state.accessToken
          },
          authentication: { }
        })
          .then(function (response) {
            //handle success
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>


<style scoped>

</style>
