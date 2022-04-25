import { useAppDispatch, useAppSelector } from "../store"
import { login, logout } from "../store/auth"
import { Maybe, UserAuth } from "../types"
import { maybe } from "../util"

type UseAuthHook = Readonly<{
  user: Maybe<UserAuth>
  login: (username: string, password: string) => void
  logout: () => void
}>

export const useAuth = (): UseAuthHook => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  return {
    user: maybe(user),
    login: (username, password) => {
      dispatch(login({ username, password }))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}
