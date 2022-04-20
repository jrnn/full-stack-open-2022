import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "../store"
import { NotificationType } from "../types"

const initialState: Readonly<NotificationType> = {
  type: "none",
  message: ""
}

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setInfo: (_, { payload: message }: PayloadAction<string>) => {
      return {
        type: "info",
        message
      }
    },
    setError: (_, { payload: message }: PayloadAction<string>) => {
      return {
        type: "error",
        message
      }
    },
    reset: () => {
      return initialState
    }
  }
})

const { setInfo, setError, reset } = slice.actions

export const notifySuccess = (message: string): AppThunkAction => dispatch => {
  setTimeout(() => dispatch(reset()), 5000)
  dispatch(setInfo(message))
}
export const notifyError = (message: string): AppThunkAction => dispatch => {
  setTimeout(() => dispatch(reset()), 5000)
  dispatch(setError(message))
}

export default slice.reducer
