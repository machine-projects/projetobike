import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { API_AUTH, type UserAuthFields } from '../types/AuthTypes'
import { useUserStore } from '../stores/userStore'

const login: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' }
})

login.interceptors.response.use(
  (res) => {
    const { data } = res
    const store = useUserStore()
    store.access_token = data.token
    store.isLoggedIn = !store.isLoggedIn

    return Promise.resolve(res)
  },
  function (error) {
    console.log('errooooo')
    return Promise.reject(error)
  }
)

const getAuth = (
  data: UserAuthFields
): Promise<AxiosResponse<{ token: string }, any>> => {
  return login.post(API_AUTH, data as UserAuthFields)
}

export { getAuth }
