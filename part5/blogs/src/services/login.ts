import axios from "axios"
import { LoginCredentials, UserAuth } from "../types"

const userAuthKey = "FSO22_PART5_BLOGS_WEB_CLIENT_USER_AUTH"
const rootUri = "/api/login"

export const login = async (credentials: LoginCredentials): Promise<UserAuth> => {
  const { data } = await axios.post<UserAuth>(rootUri, credentials)
  storeUserToLocal(data)
  return data
}

export const getUserFromLocal = (): UserAuth | undefined => {
  const auth = window.localStorage.getItem(userAuthKey)
  return !auth
    ? undefined
    : JSON.parse(auth)
}

const storeUserToLocal = (user: UserAuth): void => {
  window.localStorage.setItem(userAuthKey, JSON.stringify(user))
}

export const removeUserFromLocal = (): void => {
  window.localStorage.removeItem(userAuthKey)
}
