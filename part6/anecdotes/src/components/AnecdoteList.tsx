import React, { useEffect } from "react"
import { fetchAnecdotes, voteAnecdote } from "../reducers/anecdotes"
import { notifySuccess } from "../reducers/notifications"
import { useAppDispatch, useAppSelector } from "../store"

export const AnecdoteList = () => {
  const anecdotes = useAppSelector(({ anecdotes, filters }) => {
    const filter = filters.anecdotes.toLowerCase().trim()
    return anecdotes.filter(({ content }) => content.includes(filter))
  })
  const dispatch = useAppDispatch()
  const vote = (id: number, content: string) => {
    dispatch(voteAnecdote(id))
    dispatch(notifySuccess(`You gave a vote to "${content}"`))
  }
  useEffect(() => {
    dispatch(fetchAnecdotes())
  }, [ dispatch ])

  return (
    <div>
      {anecdotes.map(({ id, content, votes }) =>
        <div key={id}>
          <div>
            {content}
          </div>
          <div>
            has {votes} votes
            <button onClick={() => vote(id, content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
