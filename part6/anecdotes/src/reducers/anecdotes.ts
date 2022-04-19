import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Anecdote } from "../types"

const toAnecdote = (content: string): Anecdote => ({
  id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  content,
  votes: 0
})

export const initialState: ReadonlyArray<Anecdote> = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
].map(toAnecdote)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
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

export const { addAnecdote, voteAnecdote } = anecdoteSlice.actions

export default anecdoteSlice.reducer
