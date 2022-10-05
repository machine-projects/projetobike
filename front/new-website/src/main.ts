import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createPinia } from 'pinia'
// @ts-ignore
import VueMask from '@devindex/vue-mask'

const app = createApp(App)
const pinia = createPinia()

const router = createRouter({
  history: createWebHistory()
})

app.use(VueMask)
app.use(pinia)
app.use(router)
app.mount(document.body)
