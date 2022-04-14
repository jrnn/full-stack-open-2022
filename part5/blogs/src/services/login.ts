import axios from "axios"
import { UserAuth } from "../types"

const userAuthKey = "FSO22_PART5_BLOGS_WEB_CLIENT_USER_AUTH"
const rootUri = "/api/login"

export const login = async (username: string, password: string): Promise<UserAuth> => {
  const payload = { username, password }
  const { data } = await axios.post<UserAuth>(rootUri, payload)
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
