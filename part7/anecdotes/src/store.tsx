import React, { createContext, PropsWithChildren, useContext, useReducer } from "react"
import { Anecdote } from "./types"

interface AppState {
  anecdotes: ReadonlyArray<Anecdote>
}

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
  ]
}

const reducer = (state: AppState, action: unknown): AppState => {
  console.log("just logging these for now, to get around eslint errors =", state, action)
  throw new Error("not implemented yet")
}

const StoreContext = createContext<AppState>({
  anecdotes: []
})

export const StoreProvider = <P extends object>({ children }: PropsWithChildren<P>) => {
  const [ state, ] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={state}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
