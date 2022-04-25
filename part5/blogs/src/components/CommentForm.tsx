import React, { FormEvent, FunctionComponent } from "react"
import { useFormInput } from "../hooks"
import { useAppDispatch } from "../store"
import { addComment } from "../store/blogs"
import { BlogEntity } from "../types"
import { FormInput } from "./FormInput"

interface Props {
  blog: BlogEntity
}

export const CommentForm: FunctionComponent<Props> = ({ blog }) => {
  const dispatch = useAppDispatch()
  const comment = useFormInput("Say something")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addComment(blog, comment.value, comment.reset))
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormInput { ...comment } />
      <button>Add comment</button>
    </form>
  )
}
