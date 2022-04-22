import React, { FormEvent, FunctionComponent, useState } from "react"
import { useAppDispatch } from "../store"
import { createBlog } from "../store/blogs"
import { FormInput } from "./FormInput"
import { togglable, TogglableProps } from "./Togglable"

interface Props extends TogglableProps {
  token: string
}

const doNothing = () => { /**/ }

export const BlogForm: FunctionComponent<Props> = ({ token, toggle = doNothing }) => {
  const dispatch = useAppDispatch()

  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ url, setUrl ] = useState("")

  const editTitle = ({ currentTarget }: FormEvent<HTMLInputElement>) => setTitle(currentTarget.value)
  const editAuthor = ({ currentTarget }: FormEvent<HTMLInputElement>) => setAuthor(currentTarget.value)
  const editUrl = ({ currentTarget }: FormEvent<HTMLInputElement>) => setUrl(currentTarget.value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }, token))
    setTitle("")
    setAuthor("")
    setUrl("")
    toggle()
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

export const TogglableBlogForm = togglable("Click here to add new blog", BlogForm)
