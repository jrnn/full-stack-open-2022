import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "."

const NOTIFICATION_DISPLAY_TIME_MS = 5000

type NotificationState = Readonly<{
  type: "info" | "error" | "none"
  message: string
  timer?: number
}>

const initialState: NotificationState = {
  type: "none",
  message: ""
}

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set: ({ timer: previousTimer }, { payload: newNotification }: PayloadAction<NotificationState>) => {
      clearTimeout(previousTimer)
      return newNotification
    },
    reset: () => {
      return initialState
    }
  }
})

const { set, reset } = slice.actions

export const notifySuccess = (message: string): AppThunkAction => dispatch => {
  const timer = window.setTimeout(() => dispatch(reset()), NOTIFICATION_DISPLAY_TIME_MS)
  dispatch(set({ message, timer, type: "info" }))
}

export const notifyError = (message: string): AppThunkAction => dispatch => {
  const timer = window.setTimeout(() => dispatch(reset()), NOTIFICATION_DISPLAY_TIME_MS)
  dispatch(set({ message, timer, type: "error" }))
}

export default slice.reducer
