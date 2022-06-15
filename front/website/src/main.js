import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'
import store from '@/store'
import Vuex from 'vuex'
import storePlugin from './storePlugin'

Vue.use(Vuex)
Vue.use(router)

Vue.use(storePlugin)

Vue.use(mdiVue, {
  icons: mdijs
})
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
