import React from "react"
import { useParams } from "react-router-dom"
import { useStore } from "../store"
import { Anecdote } from "../types"

const notFound = () => (
  <div>
    <h2>404</h2>
    <p>No anecdote exists with that id!</p>
  </div>
)

const showDetails = (anecdote: Anecdote) => (
  <div>
    <h2>{`"${anecdote.content}" by ${anecdote.author}`}</h2>
    <p>{`has ${anecdote.votes} votes`}</p>
    <p>for more info, visit <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

export const AnecdoteDetails = () => {
  const params = useParams<{ id: string }>()
  const numericId = Number(params.id || "-1")
  const anecdote = useStore().anecdotes.find(({ id }) => id === numericId)

  return !anecdote
    ? notFound()
    : showDetails(anecdote)
}
