import React from "react"
import { Link } from "react-router-dom"
import { useStore } from "../store"

export const AnecdoteList = () => {
  const { anecdotes } = useStore()
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(({ id, content }) =>
          <li key={id}>
            <Link to={`/anecdotes/${id}`}>{content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}
