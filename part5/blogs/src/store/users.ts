import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "."
import { accessApi } from "../services/api"
import { UserEntity } from "../types"
import { notifyError } from "./notification"

type Status = "idle" | "fetching"
type UsersState = Readonly<{
  status: Status
  users: ReadonlyArray<UserEntity>
}>

const initialState: UsersState = {
  status: "idle",
  users: []
}

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setStatus: (state, { payload: status }: PayloadAction<Status>) => {
      return {
        ...state,
        status
      }
    },
    setUsers: (state, { payload: users }: PayloadAction<Array<UserEntity>>) => {
      return {
        ...state,
        users
      }
    }
  }
})

const { setStatus, setUsers } = slice.actions

const api = accessApi<UserEntity>("/api/users")

export const fetchUsers = (): AppThunkAction => async dispatch => {
  dispatch(setStatus("fetching"))
  try {
    const users = await api.getAll()
    dispatch(setUsers(users))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't fetch users from server. Too bad!"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export default slice.reducer
