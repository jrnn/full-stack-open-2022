import React, { FormEventHandler, FunctionComponent } from "react"
import { useAuth, useFormInput } from "../hooks"
import { useAppDispatch, useAppSelector } from "../store"
import { createBlog } from "../store/blogs"
import { Button } from "./Button"
import { FormInput } from "./FormInput"
import { togglable, TogglableProps } from "./Togglable"

export const BlogForm: FunctionComponent<TogglableProps> = ({ toggle }) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(({ blogs }) => blogs.status === "posting")
  const { token } = useAuth()

  const title = useFormInput("Title")
  const author = useFormInput("Author")
  const url = useFormInput("URL")

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
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
      <form onSubmit={handleSubmit}>
        <FormInput { ...title } loading={isLoading} />
        <FormInput { ...author } loading={isLoading} />
        <FormInput { ...url } loading={isLoading} />
        <Button label="Add" loading={isLoading} type="submit" />
      </form>
    </div>
  )
}

export const TogglableBlogForm = togglable(BlogForm)
