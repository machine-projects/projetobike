import { defineStore, acceptHMRUpdate } from 'pinia'
import { getAuth } from '../services/AuthService'
import { useLocalStorage } from '@vueuse/core'
import { IS_LOGGED_IN, ACCESS_TOKEN } from '../types/AuthTypes'
import { USER, type UserResponseData } from '../types/UserTypes'

import type { UserLogin } from '../types/UserTypes'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: useLocalStorage(IS_LOGGED_IN, false as boolean),
    access_token: useLocalStorage(ACCESS_TOKEN, null as string | null),
    user: useLocalStorage(USER, {} as UserResponseData)
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
