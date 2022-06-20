<template>
  <div>
  <NavBar/>
  <div id="atleta-page" class="d-flex flex-column justify-content-center">
        <SignRegisterForm 
          @loginFields="loginData = $event"
          @registerFields="registerData = $event  "
        />
  </div>
  </div>
</template>

<script>
 import axios from 'axios'
 import SignRegisterForm from '@/components/forms/SignRegisterForm.vue'
 import NavBar from '@/components/NavBar.vue'
 import store from '@/store.js';
 import router from '@/router/index'
import jwt_decode from 'jwt-decode'

  export default {
    name: 'LoginAtleta',
    components: {
      SignRegisterForm,
      NavBar
    },
    data() {
      return {
        loginData: "",
        registerData: "",
      }
    },
    watch: {
      loginData() {
          this.doLogin() 
      }
    },
    methods: {
      async doLogin() {
          await axios.post('http://localhost:3000/api/v1/auth/login', this.loginData, {
              'Content-Type': 'application/json'
            }
          )
          .then(function (response) {
            var token = JSON.stringify(response.data.token)
            var decodedToken = jwt_decode(token)
            localStorage.setItem('access_token', response.data.token);
            localStorage.setItem('userId', decodedToken.sub)
          })
          .then(function () {
            store.commit('logIn')
            router.push('/dashboard')
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
    padding: 15px 0px;
    min-height: calc(100vh - 58px);
  }
</style>
