import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "."
import { accessApi } from "../services/api"
import { LoginCredentials, UserAuth } from "../types"
import { notifyError, notifySuccess } from "./notification"

const USER_AUTH_KEY = "FSO22_PART5_BLOGS_WEB_CLIENT_USER_AUTH"

type Status = "idle" | "posting"
type AuthState = Readonly<{
  status: Status
  user?: UserAuth
}>

const initialState: AuthState = {
  status: "idle"
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, { payload: status }: PayloadAction<Status>) => {
      return {
        ...state,
        status
      }
    },
    setUser: (state, { payload: user }: PayloadAction<UserAuth>) => {
      return {
        ...state,
        user
      }
    },
    reset: () => {
      return initialState
    }
  }
})

const { setStatus, setUser, reset } = slice.actions

const api = accessApi<UserAuth>("/api/login")

export const checkForAuthInLocal = (): AppThunkAction => dispatch => {
  const auth = window.localStorage.getItem(USER_AUTH_KEY)
  if (auth) {
    dispatch(setUser(JSON.parse(auth)))
  }
}

export const login = (credentials: LoginCredentials): AppThunkAction => async dispatch => {
  dispatch(setStatus("posting"))
  try {
    const user = await api.post(credentials)
    dispatch(setUser(user))
    dispatch(notifySuccess("You are now logged in, welcome!"))
    window.localStorage.setItem(USER_AUTH_KEY, JSON.stringify(user))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Invalid username or password"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export const logout = (): AppThunkAction => dispatch => {
  window.localStorage.removeItem(USER_AUTH_KEY)
  dispatch(reset())
  dispatch(notifySuccess("You are now logged out. We will miss you! :("))
}

export default slice.reducer
