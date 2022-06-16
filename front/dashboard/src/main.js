import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from '@/store'
import Vuex from 'vuex'
import storePlugin from './storePlugin'

Vue.use(Vuex)
Vue.use(router)

Vue.use(storePlugin)

Vue.config.productionTip = false
 
Vue.use(router)


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
