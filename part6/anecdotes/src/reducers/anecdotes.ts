import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as api from "../services/anecdotes"
import { AppThunkAction } from "../store"
import { Anecdote } from "../types"
import { notifyError, notifySuccess } from "./notifications"

const initialState: ReadonlyArray<Anecdote> = []

const slice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    setAnecdotes: (_, { payload: anecdotes }: PayloadAction<Array<Anecdote>>) => {
      return anecdotes
    },
    addAnecdote: (state, { payload: newAnecdote }: PayloadAction<Anecdote>) => {
      return state.concat(newAnecdote)
    },
    voteAnecdote: (state, { payload: id }: PayloadAction<number>) => {
      return state.map(anecdote => anecdote.id !== id
        ? anecdote
        : { ...anecdote, votes: anecdote.votes + 1 })
        .sort((p, q) => q.votes - p.votes)
    }
  }
})

const { setAnecdotes, addAnecdote } = slice.actions
export const { voteAnecdote } = slice.actions

export const fetchAnecdotes = (): AppThunkAction => async dispatch => {
  try {
    const anecdotes = await api.fetchAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't get anecdotes from server. Too bad!"))
  }
}

export const createAnecdote = (content: string): AppThunkAction => async dispatch => {
  try {
    const newAnecdote = await api.postAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(notifySuccess(`Hooray! You created a new anecdote "${content}".`))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't create new anecdote. Too bad!"))
  }
}

export default slice.reducer
