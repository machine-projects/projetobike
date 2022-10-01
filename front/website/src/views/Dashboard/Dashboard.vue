<template>
  <div class="h-100">
    <NavBar>
       <b-button v-b-toggle.sidebar-left>MENU</b-button>
    </NavBar>
    <main class="d-flex flex-row h-100">
    
      <b-sidebar id="sidebar-left" left  shadow>
        <div class="sidebar h-100 w-100 d-flex flex-column align-items-center">
          <img src="https://d3ifpylmkdyg0z.cloudfront.net/assets/athletes/avatar/original/missing_male-a753bcd69cf76ff21e8e105e532ee3fc.png" alt="imagem de perfil">
          <p> {{ this.$store.state.currentUser.firstName + " " + this.$store.state.currentUser.lastName  }} </p>
          <p class="mb-5"> {{ this.$store.state.currentUser.email }} </p>
          
          <router-link :to="{ name: 'inicio' }"> INICIO </router-link>
          <router-link :to="{ name: 'meusdados' }"> MEUS DADOS </router-link>
          <router-link v-if="this.$store.state.currentUser.accountType === 'organizador'" :to="{ name: 'meuseventos' }"> MEUS EVENTOS </router-link>
          <button @click="logOut" class="logout"> SAIR </button>
        </div>
      </b-sidebar>

      <router-view/>

    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import store from '../../store'
import router from '@/router'

  export default {
    name: 'DashboardView',
    components: {
      NavBar
    },
    data() {
      return {
       
      }
    },
    watch: {
     
    },
    methods: {
     logOut() {
      console.log('oi')
      store.dispatch('logOut');
      router.push({ name: 'homePage' })
    }
    }
  }
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.sidebar {
  width: fit-content;
}

a, button.logout {
  color: black !important;
  text-decoration: none !important;
  width: 100%;
  text-align: center;
  padding: 5px;
}

a:hover, button.logout:hover {
  background-color: rgba(128, 128, 128, 0.372);
}
</style>
