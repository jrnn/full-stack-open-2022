import React, { useEffect } from "react"
import { fetchAnecdotes, voteAnecdote } from "../reducers/anecdotes"
import { useAppDispatch, useAppSelector } from "../store"

export const AnecdoteList = () => {
  const dispatch = useAppDispatch()
  const anecdotes = useAppSelector(({ anecdotes, filters }) => {
    const filter = filters.anecdotes.toLowerCase().trim()
    return anecdotes
      .filter(({ content }) => content.includes(filter))
      .sort((p, q) => q.votes - p.votes)
  })
  useEffect(() => {
    dispatch(fetchAnecdotes())
  }, [ dispatch ])

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => dispatch(voteAnecdote(anecdote))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
