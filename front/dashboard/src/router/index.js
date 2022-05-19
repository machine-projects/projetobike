import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/pesquisar-eventos',
    name: 'pesquisarEventos',
    component: () => import(/* webpackChunkName: "pesquisarEventos" */ '../views/PesquisarEventos.vue')
  },
  {
    path: '/minhas-inscricoes',
    name: 'minhasInscricoes',
    component: () => import(/* webpackChunkName: "minhasInscricoes" */ '../views/MinhasInscricoes.vue')
  },
  {
    path: '/meus-pagamentos',
    name: 'meusPagamentos',
    component: () => import(/* webpackChunkName: "meusPagamentos" */ '../views/MeusPagamentos.vue')
  },
  {
    path: '/cadastrar-evento',
    name: 'cadastrarEvento',
    component: () => import(/* webpackChunkName: "cadastrarEvento" */ '../views/CadastrarEvento.vue')
  },
  {
    path: '/meus-eventos',
    name: 'meusEventos',
    component: () => import(/* webpackChunkName: "meusEventos" */ '../views/MeusEventos.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
