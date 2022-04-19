import React from "react"
import { AnecdoteForm } from "./components/AnecdoteForm"
import { AnecdoteList } from "./components/AnecdoteList"

export const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </>
  )
}
