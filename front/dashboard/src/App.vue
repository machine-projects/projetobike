<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4 d-flex flex-column align-center"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        ></v-avatar>

        <div
          class="text-center"
        >
          {{ usuario.firstName }}
          <p v-if="usuario.atleta">
            Atleta
          </p>
          <p v-else>
            Organizador
          </p>
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <template
          v-if="usuario.atleta"
        >
          <v-list-item
            v-for="[icon, text, routerTo] in linksAtleta"
            :key="icon"
            :to="routerTo"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
          <template
          v-else
        >
          <v-list-item
            v-for="[icon, text, routerTo] in linksOrganizador"
            :key="icon"
            :to="routerTo"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

       <v-app-bar
      app
      clipped-right
      flat
      height="72"
    >

      <v-app-bar-nav-icon 
        @click="drawer = !drawer"
      />
     
      <v-spacer></v-spacer>

      <div class="d-flex align-self-center">SUA LOGO AQUI</div>
      
      <v-spacer></v-spacer>

      

      <v-icon
      > mdi-logout-variant </v-icon>
    </v-app-bar>

    

    <v-main>
      <router-view
        style="padding: 25px"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      usuario: "",
      alert: false,
      countDown: 100,
      cards: ['Today', 'Yesterday'],
      drawer: null,
      linksAtleta: [
        ['mdi-view-dashboard', 'Dashboard', '/dashboard'],
        ['mdi-magnify', 'Pesquisar Eventos', '/pesquisar-eventos'],
        ['mdi-playlist-check', 'Inscrições', '/minhas-inscricoes'],
        ['mdi-account-cash-outline', 'Pagamentos', '/meus-pagamentos'],
      ],
      linksOrganizador: [
        ['mdi-view-dashboard', 'Dashboard', '/dashboard'],
        ['mdi-delete', 'Cadastrar Evento', 'cadastrar-evento'],
        ['mdi-send', 'Meus Eventos', 'meus-eventos'],
      ],
    }),
    created() {
      this.usuario = JSON.parse(localStorage.getItem('current_user'))
    },
  }
</script>