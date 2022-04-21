import React, { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from "react"
import { Anecdote, AnecdoteDto } from "./types"

type Notification = Readonly<{
  type: "info" | "error" | "none",
  message: string
}>

type AppAction = Readonly<{
  type: "ADD_ANECDOTE",
  payload: AnecdoteDto
} | {
  type: "SET_NOTIFICATION",
  payload: Notification
}>

type AppDispatch = Dispatch<AppAction>
type AppState = Readonly<{
  anecdotes: ReadonlyArray<Anecdote>,
  notification: Notification
}>

const initialState: AppState = {
  anecdotes: [
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2
    }
  ],
  notification: {
    type: "none",
    message: ""
  }
}

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_ANECDOTE": {
      const newAnecdote = {
        ...action.payload,
        votes: 0,
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      }
      return {
        ...state,
        anecdotes: state.anecdotes.concat(newAnecdote)
      }
    }
    case "SET_NOTIFICATION": {
      const newNotification = action.payload
      return {
        ...state,
        notification: newNotification
      }
    }
    default:
      throw new Error("unknown action")
  }
}

export const addAnecdote = (anecdote: AnecdoteDto): AppAction => ({
  type: "ADD_ANECDOTE",
  payload: anecdote
})

export const notifySuccess = (message: string): AppAction => ({
  type: "SET_NOTIFICATION",
  payload: {
    type: "info",
    message
  }
})

export const resetNotification = (): AppAction => ({
  type: "SET_NOTIFICATION",
  payload: initialState.notification
})

const DispatchContext = createContext<AppDispatch>({} as AppDispatch)
const StoreContext = createContext<AppState>({} as AppState)

export const StoreProvider = <P extends object>({ children }: PropsWithChildren<P>) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={state}>
        {children}
      </StoreContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useDispatch = () => useContext(DispatchContext)
export const useStore = () => useContext(StoreContext)
