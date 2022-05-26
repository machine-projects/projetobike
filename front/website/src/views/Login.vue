<template>
  <div>
  <NavBar/>
  <div id="atleta-page" class="d-flex flex-column justify-content-center">
        <SignRegisterForm 
          @loginFields="loginData = $event"
        />
  </div>
  </div>
</template>

<script>
 import axios from 'axios'
 import SignRegisterForm from '@/components/forms/SignRegisterForm.vue'
 import NavBar from '@/components/NavBar.vue'

  export default {
    name: 'LoginAtleta',
    components: {
      SignRegisterForm,
      NavBar
    },
    data() {
      return {
        loginData: "",
      }
    },
    watch: {
      loginData() {
          this.doLogin() 
      }
    },
    methods: {
      async doLogin() {
          await axios.post('http://localhost:3000/api/v1/auth/login', JSON.stringify(this.loginData), {
              'Content-Type': 'application/json'
            }
          )
          .then(function (response) {
            alert(JSON.parse(response));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  #atleta-page {
    height: calc(100vh - 58px);
  }
</style>
