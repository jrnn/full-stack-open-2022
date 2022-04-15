import React, { CSSProperties, FunctionComponent, useState } from "react"
import { BlogEntity, UserAuth } from "../types"

interface Props {
  user: UserAuth
  blog: BlogEntity
  incrementLikes: (blog: BlogEntity) => void
  removeBlog: (blog: BlogEntity) => void
}

const style: CSSProperties = {
  marginBottom: 4,
  outline: "thin solid",
  padding: 4
}

export const BlogEntry: FunctionComponent<Props> = ({ user, blog, incrementLikes, removeBlog }) => {
  const [ detailed, setDetailed ] = useState(false)
  const toggle = () => setDetailed(!detailed)
  const handleLike = () => incrementLikes(blog)
  const handleRemove = () => {
    if (window.confirm("Sure you wanna do that?")) {
      removeBlog(blog)
    }
  }
  const isBlogOwner = user.username === blog.user.username

  return (
    <div style={style}>
      <span>{blog.author}: "{blog.title}" </span>
      <button onClick={toggle}>
        {detailed ? "Hide" : "Show details"}
      </button>
      <div style={{ display: detailed ? "" : "none" }}>
        <div>URL: {blog.url}</div>
        <div>
          <span>Likes: {blog.likes} </span>
          <button onClick={handleLike}>Like!</button>
        </div>
        <div>Added by: {blog.user.name}</div>
        {isBlogOwner &&
          <div>
            <button onClick={handleRemove}>Remove</button>
          </div>
        }
      </div>
    </div>
  )
}
