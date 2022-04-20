import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as api from "../services/anecdotes"
import { AppThunkAction } from "../store"
import { Anecdote } from "../types"
import { notifyError } from "./notifications"

const toAnecdote = (content: string): Anecdote => ({
  id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  content,
  votes: 0
})

const initialState: ReadonlyArray<Anecdote> = []

const slice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    setAnecdotes: (_, { payload: anecdotes }: PayloadAction<Array<Anecdote>>) => {
      return anecdotes
    },
    addAnecdote: (state, { payload: content }: PayloadAction<string>) => {
      return state.concat(toAnecdote(content))
    },
    voteAnecdote: (state, { payload: id }: PayloadAction<number>) => {
      return state.map(anecdote => anecdote.id !== id
        ? anecdote
        : { ...anecdote, votes: anecdote.votes + 1 })
        .sort((p, q) => q.votes - p.votes)
    }
  }
})

const { setAnecdotes } = slice.actions
export const { addAnecdote, voteAnecdote } = slice.actions

export const fetchAnecdotes = (): AppThunkAction => async dispatch => {
  try {
    const anecdotes = await api.fetchAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  } catch (error) {
    console.log(error)
    dispatch(notifyError("Oops! Couldn't get anecdotes from server. Too bad!"))
  }
}

export default slice.reducer
