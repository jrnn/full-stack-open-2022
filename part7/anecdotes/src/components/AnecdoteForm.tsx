import React, { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"
import { addAnecdote, notifySuccess, resetNotification, useDispatch } from "../store"

export const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const content = useField()
  const author = useField()
  const info = useField()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value
    }))
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
          <input id="content-input" { ...content } />
        </div>
        <div>
          <label htmlFor="author-input">Author: </label>
          <input id="author-input" { ...author } />
        </div>
        <div>
          <label htmlFor="info-input">URL for more info: </label>
          <input id="info-input" { ...info } />
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}
