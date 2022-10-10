export interface UserLogin {
  cpf: string
  password: string
}

export interface UserResponseData {
  id: string
  firstName: string
  lastName: string
  email: string
  cpf: string
  sex: string
  birthDate: string
  state: string
  city: string
  phoneNumber: string
  emergencyContactName: string
  emergencyContactPhoneNumber: string
  accountType: string
  createdDate: string
  updatedDate: string
}

export interface CreateUserData {
  email: string
  firstName: string
  lastName: string
  password: string
  cpf: string
  sex: string
  birthDate: string
  state: string
  city: string
  phoneNumber: string
  emergencyContactName: string
  emergencyContactPhoneNumber: string
  accountType: string
}

export const ACCESS_TOKEN = 'access_token'
export const IS_LOGGED_IN = 'is_logged_in'
export const USERS_API = 'api/v1/users'
export const USER = 'user'
