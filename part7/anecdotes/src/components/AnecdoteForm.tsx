import React, { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"
import { addAnecdote, notifySuccess, resetNotification, useDispatch } from "../store"

export const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { reset: resetContent, ...content } = useField()
  const { reset: resetAuthor, ...author } = useField()
  const { reset: resetInfo, ...info } = useField()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value
    }))
    dispatch(notifySuccess(`You added a new anecdote "${content.value}"`))
    setTimeout(() => dispatch(resetNotification()), 5000)
    navigate("/", { replace: true })
  }
  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
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
        <button
          onClick={handleReset}
          type="button"
        >
          Reset
        </button>
      </form>
    </div>
  )
}
