import React, { FormEvent, FunctionComponent } from "react"
import { useAuth, useFormInput } from "../hooks"
import { useAppDispatch, useAppSelector } from "../store"
import { createBlog } from "../store/blogs"
import { FormInput } from "./FormInput"
import { togglable, TogglableProps } from "./Togglable"

export const BlogForm: FunctionComponent<TogglableProps> = ({ toggle }) => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.blogs)
  const { token } = useAuth().user.orElseThrow()

  const title = useFormInput("Title")
  const author = useFormInput("Author")
  const url = useFormInput("URL")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    const onSuccess = () => {
      title.reset()
      author.reset()
      url.reset()
      toggle()
    }
    dispatch(createBlog(blog, token, onSuccess))
  }
  return (
    <div>
      <h3>Add new blog</h3>
      {status === "posting" && <div>HOLD YOUR HORSES, ALMOST THERE ...</div>}
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
