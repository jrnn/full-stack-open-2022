import React, { FormEvent, useState } from "react"
import { addAnecdote } from "../reducers/anecdotes"
import { notifySuccess } from "../reducers/notifications"
import { useAppDispatch } from "../store"

export const AnecdoteForm = () => {
  const dispatch = useAppDispatch()
  const [ content, setContent ] = useState("")

  const editContent = ({ currentTarget }: FormEvent<HTMLInputElement>) => setContent(currentTarget.value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addAnecdote(content))
    dispatch(notifySuccess(`You created a new anecdote "${content}"`))
    setContent("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          onChange={editContent}
          value={content}
        />
      </div>
      <button>create</button>
    </form>
  )
}
