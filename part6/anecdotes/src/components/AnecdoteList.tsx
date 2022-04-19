import React from "react"
import { voteAnecdote } from "../reducers/anecdotes"
import { useAppDispatch, useAppSelector } from "../store"

export const AnecdoteList = () => {
  const anecdotes = useAppSelector(state => state.anecdotes)
  const dispatch = useAppDispatch()

  return (
    <div>
      {anecdotes.map(({ id, content, votes }) =>
        <div key={id}>
          <div>
            {content}
          </div>
          <div>
            has {votes} votes
            <button onClick={() => dispatch(voteAnecdote(id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
