<template>
  <div>
  <NavBar/>
  <div id="atleta-page" class="d-flex flex-column justify-content-center">
        <SignRegisterForm 
          @loginFields="loginData = $event"
        />

        <button @click="logOut"> deslogar </button>
  </div>
  </div>
</template>

<script>
 import axios from 'axios'
 import SignRegisterForm from '@/components/forms/SignRegisterForm.vue'
 import NavBar from '@/components/NavBar.vue'
 import store from '@/store.js';
 import router from '@/router/index'

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
          await axios.post('http://localhost:3000/api/v1/auth/login', this.loginData, {
              'Content-Type': 'application/json'
            }
          )
          .then(function (response) {
            localStorage.setItem('access_token', response.data.token);
          })
          .then(function () {
            store.commit('logIn')
            router.push('/dashboard')
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      logOut() {
        this.$store.dispatch('logOut')
      }
    }
  }
</script>

<style scoped>
  #atleta-page {
    height: calc(100vh - 58px);
  }
</style>
