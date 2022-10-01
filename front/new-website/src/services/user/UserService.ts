import axios from 'axios'
import { type UserLogin, ACCESS_TOKEN, IS_LOGGED_IN } from './UserTypes'
import { useUserStore } from '../../store/userStore'
import type {
  AxiosRequestConfig,
  AxiosInterceptorManager,
  AxiosResponse
} from 'axios'

const loginConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
}

const login = axios.create(loginConfig as AxiosRequestConfig)

login.interceptors.response.use<AxiosInterceptorManager<AxiosResponse>>(
  (res) => {
    const { data } = res
    const store = useUserStore()
    store.access_token = data.token
    store.isLoggedIn = !store.isLoggedIn

    localStorage.setItem(ACCESS_TOKEN, data.token)
    localStorage.setItem(IS_LOGGED_IN, 'true')

    return data.token
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('errooooo')
    return Promise.reject(error)
  }
)

export const getAuth = (data: UserLogin) => {
  return login.post('http://localhost:3000/api/v1/auth/login', data)
}
