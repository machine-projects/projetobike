import { type Option, API_ESTADOS } from '@/types/CityTypes'
import axios, { type AxiosResponse } from 'axios'

// ============= INSTANCE CREATION =======================
const cityService = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/',
  headers: { 'Content-Type': 'application/json' }
})

// ===== TODO: INTERCEPT

// ==================== FETCH BRAZIL STATES ====================
const getStates = (): Promise<AxiosResponse> => {
  return cityService.get(API_ESTADOS)
}

// ========= FETCH CITIES BASED ON STATE CHOOSEN ===============
const getCities = (state: Option): Promise<AxiosResponse> => {
  const API_CIDADES = `localidades/estados/${state.id}/municipios`
  return cityService.get(API_CIDADES)
}

export { getCities, getStates }
