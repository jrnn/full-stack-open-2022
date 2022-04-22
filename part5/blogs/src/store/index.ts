import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import blogsReducer from "./blogs"
import notificationReducer from "./notification"

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer
  }
})

type AppDispatch = typeof store.dispatch
type AppState = Readonly<ReturnType<typeof store.getState>>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export type AppThunkAction<R = void> = ThunkAction<R, AppState, unknown, AnyAction>
