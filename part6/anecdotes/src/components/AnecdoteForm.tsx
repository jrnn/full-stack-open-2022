import React, { FormEvent, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { createAnecdote } from "../reducers/anecdotes"

const connector = connect(null, { createAnecdote })

type Props = ConnectedProps<typeof connector>

export const AnecdoteForm = connector(({ createAnecdote }: Props) => {
  // const dispatch = useAppDispatch()
  const [ content, setContent ] = useState("")

  const editContent = ({ currentTarget }: FormEvent<HTMLInputElement>) => setContent(currentTarget.value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // dispatch(createAnecdote(content))
    createAnecdote(content)
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
})
