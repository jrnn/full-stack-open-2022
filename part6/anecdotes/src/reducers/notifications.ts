import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "../store"
import { NotificationType } from "../types"

type NotificationState = Readonly<
  NotificationType & { previousTimer: number | undefined }
>

type Payload = Readonly<{
  message: string,
  timer?: number
}>

const initialState: NotificationState = {
  type: "none",
  message: "",
  previousTimer: undefined
}

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setInfo: ({ previousTimer }, { payload }: PayloadAction<Payload>) => {
      clearTimeout(previousTimer)
      return {
        type: "info",
        message: payload.message,
        previousTimer: payload.timer
      }
    },
    setError: ({ previousTimer }, { payload }: PayloadAction<Payload>) => {
      clearTimeout(previousTimer)
      return {
        type: "error",
        message: payload.message,
        previousTimer: payload.timer
      }
    },
    reset: () => {
      return initialState
    }
  }
})

const { setInfo, setError, reset } = slice.actions

export const notifySuccess = (message: string, seconds = 5): AppThunkAction => dispatch => {
  const timer = window.setTimeout(() => dispatch(reset()), seconds * 1000)
  dispatch(setInfo({ message, timer }))
}
export const notifyError = (message: string, seconds = 5): AppThunkAction => dispatch => {
  const timer = window.setTimeout(() => dispatch(reset()), seconds * 1000)
  dispatch(setError({ message, timer }))
}

export default slice.reducer
