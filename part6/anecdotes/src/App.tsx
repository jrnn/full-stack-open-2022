import React, { useReducer } from "react"
import { AnecdoteForm } from "./components/AnecdoteForm"
import { addAnecdote, anecdoteReducer, initialAnecdotes, voteForAnecdote } from "./reducers/anecdotes"

export const App = () => {
  const [ anecdotes, dispatch ] = useReducer(anecdoteReducer, initialAnecdotes)

  const add = (content: string) => dispatch(addAnecdote(content))
  const vote = (id: number) =>  dispatch(voteForAnecdote(id))

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
      <AnecdoteForm addAnecdote={add} />
    </div>
  )
}
