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
    replaceAnecdote: (state, { payload: newAnecdote }: PayloadAction<Anecdote>) => {
      const { id } = newAnecdote
      return state.map(anecdote => anecdote.id !== id
        ? anecdote
        : newAnecdote)
    }
  }
})

const { setAnecdotes, addAnecdote, replaceAnecdote } = slice.actions

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
    dispatch(notifySuccess(`Hooray! You created a new anecdote "${content}"`))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't create new anecdote. Too bad!"))
  }
}

export const voteAnecdote = (anecdote: Anecdote): AppThunkAction => async dispatch => {
  try {
    const updatedAnecdote = await api.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(replaceAnecdote(updatedAnecdote))
    dispatch(notifySuccess(`Hooray! You gave a vote to "${updatedAnecdote.content}"`))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't register your vote. Democracy is dead!"))
  }
}

export default slice.reducer
