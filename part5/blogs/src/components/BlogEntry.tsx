import React, { CSSProperties, FunctionComponent, useState } from "react"
import { useAuth } from "../hooks"
import { useAppDispatch } from "../store"
import { incrementLikes, removeBlog } from "../store/blogs"
import { BlogEntity } from "../types"

interface Props {
  blog: BlogEntity
}

const style: CSSProperties = {
  marginBottom: 4,
  outline: "thin solid",
  padding: 4
}

export const BlogEntry: FunctionComponent<Props> = ({ blog }) => {
  const dispatch = useAppDispatch()
  const user = useAuth()
  const [ detailed, setDetailed ] = useState(false)

  const toggle = () => setDetailed(!detailed)
  const handleLike = () => dispatch(incrementLikes(blog))
  const handleRemove = () => {
    if (window.confirm("Sure you wanna do that?")) {
      dispatch(removeBlog(blog, user.token))
    }
  }
  const isBlogOwner = user.username === blog.user.username

  return (
    <div
      className="blog-entry"
      style={style}
    >
      <span>{blog.author}: &quot;{blog.title}&quot; </span>
      <button onClick={toggle}>
        {detailed ? "Hide" : "Show details"}
      </button>
      {detailed &&
        <div>
          <div>URL: {blog.url}</div>
          <div>
            <span>Likes: {blog.likes}</span>
            <button onClick={handleLike}>Like!</button>
          </div>
          <div>Added by: {blog.user.name}</div>
          {isBlogOwner &&
            <div>
              <button onClick={handleRemove}>Remove</button>
            </div>
          }
        </div>
      }
    </div>
  )
}
