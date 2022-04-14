import React, { CSSProperties, FunctionComponent, useState } from "react"
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
  const [ detailed, setDetailed ] = useState(false)
  const toggle = () => setDetailed(!detailed)

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
          <button>Like!</button>
        </div>
        <div>Added by: {blog.user.name}</div>
      </div>
    </div>
  )
}
