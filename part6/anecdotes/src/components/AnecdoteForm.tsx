import React, { FormEvent, FunctionComponent, useState } from "react"

interface Props {
  addAnecdote: (content: string) => void
}

export const AnecdoteForm: FunctionComponent<Props> = ({ addAnecdote }) => {
  const [ content, setContent ] = useState("")

  const editContent = (event: FormEvent<HTMLInputElement>) => setContent(event.currentTarget.value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addAnecdote(content)
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
