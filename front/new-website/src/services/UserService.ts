import { useUserStore } from '@/stores/userStore'
import {
  type UserResponseData,
  USERS_API,
  type CreateUserData
} from '@/types/UserTypes'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

// INSTANCE CREATION
const userInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})
//

// GET AND DELETE REQUEST INTERCEPTOR
// :: INJECT BEARER TOKEN ::
userInstance.interceptors.request.use((config) => {
  const userStore = useUserStore()

  const configEqualsGet = config.method === 'get' || config.method === 'GET'
  const configEqualsDelete =
    config.method === 'delete' || config.method === 'DELETE'

  if (
    (configEqualsGet || configEqualsDelete) &&
    !(userStore.bearerToken instanceof Error)
  ) {
    config.headers = {
      Authorization: 'Bearer ' + userStore.bearerToken
    }
  }

  return config
})
//

// USERS INSTANCE METHODS
const fetchUsers = (): Promise<AxiosResponse<UserResponseData, any>> => {
  return userInstance.get(USERS_API)
}

const fetchUser = (
  id: string
): Promise<AxiosResponse<UserResponseData, any>> => {
  return userInstance.get(USERS_API + '/' + id)
}

const createUser = (data: CreateUserData): Promise<AxiosResponse> => {
  return userInstance.post(USERS_API, data)
}

export { fetchUsers, fetchUser, createUser }
