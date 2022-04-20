import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NotificationType } from "../types"

const initialState: Readonly<NotificationType> = {
  type: "info",
  message: "the owls are not what they seem"
}

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notifySuccess: (_, { payload: message }: PayloadAction<string>) => {
      return {
        type: "info",
        message
      }
    },
    notifyError: (_, { payload: message }: PayloadAction<string>) => {
      return {
        type: "error",
        message
      }
    }
  }
})

export const { notifySuccess, notifyError } = slice.actions
export default slice.reducer
