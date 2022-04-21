import React from "react"
import { Route, Routes } from "react-router-dom"
import { About } from "./components/About"
import { AnecdoteDetails } from "./components/AnecdoteDetails"
import { AnecdoteForm } from "./components/AnecdoteForm"
import { AnecdoteList } from "./components/AnecdoteList"
import { Footer } from "./components/Footer"
import { Menu } from "./components/Menu"
import { Notification } from "./components/Notification"

export const App = () => {
  return (
    <div>
      <Notification />
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<AnecdoteDetails />}
        />
        <Route
          path="/create"
          element={<AnecdoteForm />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/"
          element={<AnecdoteList />}
        />
      </Routes>
      <Footer />
    </div>
  )
}
