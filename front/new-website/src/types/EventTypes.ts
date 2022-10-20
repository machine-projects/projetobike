import type { Ref } from 'vue'

export const API_EVENTS = 'api/v1/event'

export interface EventsResponse {
  data: Events[]
  count: number
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  lastPage: number
}

export interface Events {
  id: string
  title: string
  description: string
  startDate: string
  stopDate: string
  state: string
  city: string
  images: {
    gallery: EventImage[]
    header: EventImage
  }
  isFeatured: boolean
  createdDate: string
  updatedDate: string
}

export interface EventImage {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface Filters {
  city?: string
  state?: string
  eventName?: string
}
