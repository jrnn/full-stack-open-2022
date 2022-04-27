import React, { FormEventHandler, FunctionComponent } from "react"
import { useFormInput } from "../hooks"
import { useAppDispatch, useAppSelector } from "../store"
import { addComment } from "../store/blogs"
import { BlogEntity } from "../types"
import { Button } from "./Button"
import { FormInput } from "./FormInput"
import { togglable, TogglableProps } from "./Togglable"

interface Props extends TogglableProps {
  blog: BlogEntity
}

export const CommentForm: FunctionComponent<Props> = ({ blog, toggle }) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(({ blogs }) => blogs.status === "posting")
  const comment = useFormInput("Say something")

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const onSuccess = () => {
      comment.reset()
      toggle()
    }
    dispatch(addComment(blog, comment.value, onSuccess))
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormInput { ...comment } loading={isLoading} />
      <Button label="Comment" loading={isLoading} type="submit" />
    </form>
  )
}

export const TogglableCommentForm = togglable(CommentForm)
