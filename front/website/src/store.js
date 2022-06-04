import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        accessToken:  localStorage.getItem('access_token'),
        currentUser : JSON.parse(localStorage.getItem('current_user'))
        },
        mutations: {
            logIn() {
            axios
            .get('http://localhost:3000/api/v1/users', 
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
            .then(response => {
                const userData = JSON.stringify(response.data)
                // If request is good...
                localStorage.setItem('current_user', userData)
                this.state.currentUser = JSON.parse(localStorage.getItem('current_user'))
                this.state.accessToken = localStorage.getItem('access_token')
        
                })
            .catch((error) => {
                console.log(error)
            })
            },
            logOut(state) {
               
                localStorage.removeItem('access_token')
                localStorage.removeItem('current_user')
                state.accessToken = localStorage.getItem('access_token')
                state.currentUser = localStorage.getItem('current_user')
                
            }
        },
        actions: {
            async logOut({commit}){
                commit('logOut')
              }
        }
});