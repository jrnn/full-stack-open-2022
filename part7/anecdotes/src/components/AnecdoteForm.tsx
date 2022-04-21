import React, { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addAnecdote, notifySuccess, resetNotification, useDispatch } from "../store"

export const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ content, setContent ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ info, setInfo ] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addAnecdote({ content, author, info }))
    dispatch(notifySuccess(`You added a new anecdote "${content}"`))
    setTimeout(() => dispatch(resetNotification()), 5000)
    navigate("/", { replace: true })
  }

  return (
    <div>
      <h2>Add a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content-input">Content: </label>
          <input
            id="content-input"
            onChange={({ currentTarget }) => setContent(currentTarget.value)}
            value={content}
          />
        </div>
        <div>
          <label htmlFor="author-input">Author: </label>
          <input
            id="author-input"
            onChange={({ currentTarget }) => setAuthor(currentTarget.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor="info-input">URL for more info: </label>
          <input
            id="info-input"
            onChange={({ currentTarget }) => setInfo(currentTarget.value)}
            value={info}
          />
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}
