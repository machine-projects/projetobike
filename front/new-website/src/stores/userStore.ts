import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAuth } from '../services/user/AuthService'
import { useLocalStorage } from '@vueuse/core'
import { IS_LOGGED_IN, ACCESS_TOKEN } from '../types/UserTypes'

import type { UserLogin } from '../types/UserTypes'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: useLocalStorage(IS_LOGGED_IN, false as boolean),
    access_token: useLocalStorage(ACCESS_TOKEN, null as string | null)
  }),
  getters: {
    bearerToken: (state) =>
      state.isLoggedIn
        ? state.access_token
        : new Error('Usuário não está logado')
  },
  actions: {
    changeLogInState(data: UserLogin) {
      return getAuth(data)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
