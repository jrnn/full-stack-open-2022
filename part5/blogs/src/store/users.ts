import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "."
import { accessApi } from "../services/api"
import { UserEntity } from "../types"
import { notifyError } from "./notification"

type UsersState = Readonly<{
  users: ReadonlyArray<UserEntity>
}>

const initialState: UsersState = {
  users: []
}

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    set: (state, { payload: users }: PayloadAction<Array<UserEntity>>) => {
      return {
        ...state,
        users
      }
    }
  }
})

const { set } = slice.actions

const api = accessApi<UserEntity>("/api/users")

export const fetchUsers = (): AppThunkAction => async dispatch => {
  try {
    const users = await api.getAll()
    dispatch(set(users))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't fetch users from server. Too bad!"))
  }
}

export default slice.reducer
