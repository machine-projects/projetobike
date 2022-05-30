import  Vue  from  'vue'
import  Vuex  from  'vuex'
import axios from 'axios'
Vue.use(Vuex)

export  default  new  Vuex.Store({
state: {
accessToken:  "",
currentUser : {}
},
mutations: {
    logIn() {
    axios
    .get('http://localhost:3000/api/v1/users', 
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
    .then(response => {
        // If request is good...
        this.state.currentUser = response.data
        this.state.accessToken = localStorage.getItem('access_token')

        })
    .catch((error) => {
        console.log(error)
    })
    },
    logOut(state) {
        state.currentUser = {}
        localStorage.removeItem('access_token')
        state.accessToken = ""
        
    }
},
actions: {
    async logOut({commit}){
        commit('logOut')
      }
}
})