r<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="px-5">
      <b-navbar-brand to="/">SEU LOGO AQUI</b-navbar-brand>
      <slot></slot>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">
            <mdicon name="calendar-month" /> PRÓXIMOS EVENTOS</b-nav-item
          >
          <b-nav-item to="/realizados">
            <mdicon name="clock-check-outline" /> EVENTOS REALIZADOS</b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <div>
              <b-nav-item right v-if="!$store.state.currentUser" to="/login"> ÁREA DE LOGIN </b-nav-item>

              <template v-else-if="$store.state.currentUser && !$route.path.includes('dashboard')">
                
                <b-nav-item right v-b-modal.modal-1> PERFIL </b-nav-item>

                <b-modal id="modal-1" title="Dados do usuário">
                  <p class="text-center"> {{userData.firstName}} </p>
                  <p class="text-center"> {{userData.lastName}} </p>

                
                  <router-link :to="`/dashboard/${$store.state.currentUser.id}`"><mdicon name="view-dashboard" /> Ir para o Dashboard</router-link>

                  <template #modal-footer>
                    <div class="w-100">
                      <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="logOut"
                      >
                        Log Out
                      </b-button>
                    </div>
                  </template>
                  
                </b-modal>
              </template>
            </div>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
 import store from '../store';

export default {
  name: "NavBar",
  data() {
    return {
      userData: "",
    }
  },
  mounted() {
     this.userData = JSON.parse(localStorage.getItem('current_user'))
  },
  methods: {
    logOut() {
      store.dispatch('logOut');
      this.$bvModal.hide('modal-1')
    }
  }
};
</script>


<style scoped>
.nav-link {
  color: red;
}
</style>
