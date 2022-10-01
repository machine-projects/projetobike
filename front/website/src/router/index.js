import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: HomeView
  },
  {
    path: '/realizados',
    name: 'eventosRealizados',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/evento',
    name: 'events',
    children: [
      {
        path: 'detalhes',
        name: 'eventDetails',
        component: () => import('../views/EventDetails.vue')
      }
    ],
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    component: () => import('../views/Dashboard/Dashboard.vue'),
    children: [
      { path: 'dados', name: 'meusdados', component: () => import('../views/Dashboard/MeusDados.vue') },
      { path: 'eventos', name: 'meuseventos', component: () => import('../views/Dashboard/MeusEventos.vue') },
      { 
        path: '',
        name: 'inicio',
        component: () => import('../views/Dashboard/Inicio.vue'), 
        children: [
          { 
            path: 'detalhes/:eventId',
            name: 'inscricoesoueventosdetalhes',
            component: () => import('../views/Dashboard/InscricoesOuEventosDetalhes.vue'),
            props: route => (route.params) 
          },
          { 
            path: 'cadastrar',
            name: 'cadastrarEvento',
            component: () => import('../views/Dashboard/CadastrarEvento.vue'), 
          }
        ]
      }  
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const CURRENT_USER = 'current_user'
  const ACCESS_TOKEN = 'access_token'

  if(localStorage.getItem(CURRENT_USER)) {
    store.state.currentUser = JSON.parse(localStorage.getItem(CURRENT_USER))
    store.state.accessToken = localStorage.getItem(ACCESS_TOKEN)
    if(to.path === '/login') {
      router.push({ name: 'homePage'})
    }
  }
  next();
})

export default router
