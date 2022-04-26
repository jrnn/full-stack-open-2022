import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, useParamsId } from "../hooks"
import { useAppDispatch, useAppSelector } from "../store"
import { incrementLikes, removeBlog } from "../store/blogs"
import { Button } from "./Button"
import { TogglableCommentForm } from "./CommentForm"

export const BlogEntry = () => {
  const id = useParamsId()
  const user = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { blog, isLoading } = useAppSelector(({ blogs }) => ({
    blog: blogs.blogs[id],
    isLoading: blogs.status === "posting"
  }))

  if (!blog) {
    return (
      <h2>No blog found with id {id}!</h2>
    )
  }
  const handleLike = () => dispatch(incrementLikes(blog))
  const handleRemove = () => {
    if (window.confirm("Sure you wanna do that?")) {
      dispatch(removeBlog(blog, user.token, () => navigate(-1)))
    }
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <h4>Written by {blog.author}</h4>
      <div>URL: <a href={blog.url}>{blog.url}</a></div>
      <div>Likes: {blog.likes}</div>
      <div>Added by: {blog.user.name}</div>
      <Button label="Like!" loading={isLoading} onClick={handleLike} />
      {user.username === blog.user.username &&
        <Button label="Remove" loading={isLoading} onClick={handleRemove} />
      }
      <h4>Comments</h4>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </ul>
      <TogglableCommentForm blog={blog} label="Click here to add comment" />
    </div>
  )
}
