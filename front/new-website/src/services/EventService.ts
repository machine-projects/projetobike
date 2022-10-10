import { API_EVENTS, type EventsResponse } from '@/types/EventTypes'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { useEventStore } from '../stores/eventStore'
import { useUserStore } from '../stores/userStore'

const events: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' }
})

events.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const configEqualsGet = config.method === 'post' || config.method === 'POST'
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

events.interceptors.response.use((res) => {
  const eventStore = useEventStore()

  const { data } = res
  eventStore.events = data

  return data
})

const getEvents = (
  limit: number = 12,
  page: number = 1
): Promise<AxiosResponse<EventsResponse, any>> => {
  return events.get(API_EVENTS + `?limit=${limit}&page=${page}`)
}

export { getEvents }

// TODO FIRST PRIORITY ---- CHECK THIS FILE TO SEE IF THERE AREN`T ANY ERRORS
