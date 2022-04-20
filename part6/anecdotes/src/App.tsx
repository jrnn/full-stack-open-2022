import React from "react"
import { AnecdoteFilter } from "./components/AnecdoteFilter"
import { AnecdoteForm } from "./components/AnecdoteForm"
import { AnecdoteList } from "./components/AnecdoteList"
import { Notification } from "./components/Notification"

export const App = () => {
  return (
    <>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </>
  )
}
