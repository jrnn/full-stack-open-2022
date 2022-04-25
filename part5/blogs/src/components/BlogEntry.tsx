import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, useParamsId } from "../hooks"
import { useAppDispatch, useAppSelector } from "../store"
import { incrementLikes, removeBlog } from "../store/blogs"

export const BlogEntry = () => {
  const id = useParamsId()
  const user = useAuth().user.orElseThrow()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { blogs, status } = useAppSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

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
      {status === "posting" && <div>WAIT FOR IT... WAIT FOR IT...</div>}
      <div>URL: <a href={blog.url}>{blog.url}</a></div>
      <div>
        <span>Likes: {blog.likes}</span>
        <button onClick={handleLike}>Like!</button>
      </div>
      <div>Added by: {blog.user.name}</div>
      {user.username === blog.user.username &&
        <div>
          <button onClick={handleRemove}>Remove</button>
        </div>
      }
    </div>
  )
}
