import React, { FormEvent, useReducer, useState } from "react"
import { addAnecdote, anecdoteReducer, initialAnecdotes, voteForAnecdote } from "./reducers/anecdotes"

export const App = () => {
  const [ content, setContent ] = useState("")
  const [ anecdotes, dispatch ] = useReducer(anecdoteReducer, initialAnecdotes)

  const editContent = (event: FormEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addAnecdote(content))
    setContent("")
  }
  const vote = (id: number) => {
    dispatch(voteForAnecdote(id))
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
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={editContent}
            value={content}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
