import React, { useReducer } from "react"
import { anecdoteReducer, initialAnecdotes } from "./reducers/anecdotes"

export const App = () => {
  const [ anecdotes, dispatch ] = useReducer(anecdoteReducer, initialAnecdotes)

  const vote = (id: number) => {
    dispatch({ type: "VOTE", id })
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}
