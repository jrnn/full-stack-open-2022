import React, { FormEvent, FunctionComponent } from "react"
import { useFormInput } from "../hooks"
import { useAppDispatch } from "../store"
import { createBlog } from "../store/blogs"
import { FormInput } from "./FormInput"
import { togglable, TogglableProps } from "./Togglable"

interface Props extends TogglableProps {
  token: string
}

export const BlogForm: FunctionComponent<Props> = ({ token, toggle }) => {
  const dispatch = useAppDispatch()

  const title = useFormInput("Title")
  const author = useFormInput("Author")
  const url = useFormInput("URL")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    }, token, toggle))
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h3>Add new blog</h3>
      <form onSubmit={handleSubmit}>
        <FormInput { ...title } />
        <FormInput { ...author } />
        <FormInput { ...url } />
        <div>
          <button id="createBlog-button">Add</button>
        </div>
      </form>
    </div>
  )
}

export const TogglableBlogForm = togglable("Click here to add new blog", BlogForm)
