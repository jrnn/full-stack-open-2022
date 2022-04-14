import React, { FormEvent, FunctionComponent, useState } from "react"
import { BlogDto } from "../types"

interface Props {
  createBlog: (blog: BlogDto) => Promise<boolean>
}

export const BlogForm: FunctionComponent<Props> = ({ createBlog }) => {
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ url, setUrl ] = useState("")

  const editTitle = ({ currentTarget }: FormEvent<HTMLInputElement>) => setTitle(currentTarget.value)
  const editAuthor = ({ currentTarget }: FormEvent<HTMLInputElement>) => setAuthor(currentTarget.value)
  const editUrl = ({ currentTarget }: FormEvent<HTMLInputElement>) => setUrl(currentTarget.value)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isSuccessful = await createBlog({ title, author, url })
    if (isSuccessful) {
      setTitle("")
      setAuthor("")
      setUrl("")
    }
  }

  return (
    <div>
      <h3>Add new blog</h3>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            onChange={editTitle}
            value={title}
          />
        </section>
        <section>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            onChange={editAuthor}
            value={author}
          />
        </section>
        <section>
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            onChange={editUrl}
            value={url}
          />
        </section>
        <section>
          <button type="submit">Add</button>
        </section>
      </form>
    </div>
  )
}
