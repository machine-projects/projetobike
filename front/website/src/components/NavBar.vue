<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">SEU LOGO AQUI</b-navbar-brand>

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
            <b-nav-item right v-if="$store.state.currentUser == null" to="/login"> ÁREA DE LOGIN </b-nav-item>

            <b-nav-item right v-else to="/login"> PERFIL DO ATLETA </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>


<style scoped>
.nav-link {
  color: red;
}
</style>
