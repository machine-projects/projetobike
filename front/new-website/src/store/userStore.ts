import { defineStore } from 'pinia'
import { getAuth } from '../services/user/UserService'
import type { UserLogin } from '../services/user/UserTypes'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false as boolean,
    access_token: null as string | null
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    changeLogInState(data: UserLogin) {
      getAuth(data)
    }
  }
})
