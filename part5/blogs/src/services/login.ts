import axios from "axios"
import { UserAuth } from "../types"

const rootUri = "/api/login"

export const login = async (username: string, password: string): Promise<UserAuth> => {
  const payload = { username, password }
  const { data } = await axios.post<UserAuth>(rootUri, payload)
  return data
}
