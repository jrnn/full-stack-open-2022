import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import anecdotesReducer from "./reducers/anecdotes"
import filtersReducer from "./reducers/filters"
import notificationReducer from "./reducers/notifications"

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filters: filtersReducer,
    notification: notificationReducer
  }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
