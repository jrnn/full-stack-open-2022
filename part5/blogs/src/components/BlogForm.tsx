import React, { FormEvent, FunctionComponent, useState } from "react"
import { BlogDto } from "../types"
import { FormInput } from "./FormInput"

interface Props {
  createBlog: (blog: BlogDto, onSuccess: () => void) => Promise<void>
}

export const BlogForm: FunctionComponent<Props> = ({ createBlog }) => {
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ url, setUrl ] = useState("")

  const editTitle = ({ currentTarget }: FormEvent<HTMLInputElement>) => setTitle(currentTarget.value)
  const editAuthor = ({ currentTarget }: FormEvent<HTMLInputElement>) => setAuthor(currentTarget.value)
  const editUrl = ({ currentTarget }: FormEvent<HTMLInputElement>) => setUrl(currentTarget.value)
  const resetForm = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createBlog({ title, author, url }, resetForm)
  }

  return (
    <div>
      <h3>Add new blog</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          handleChange={editTitle}
          value={title}
        />
        <FormInput
          label="Author"
          handleChange={editAuthor}
          value={author}
        />
        <FormInput
          label="URL"
          handleChange={editUrl}
          value={url}
        />
        <div>
          <button
            id="createBlog-button"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}
