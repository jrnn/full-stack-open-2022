import React, { FunctionComponent } from "react"
import { BlogResponse } from "../types"

interface Props {
  blog: BlogResponse
}

export const BlogEntry: FunctionComponent<Props> = ({ blog }) => {
  return (
    <li>
      {blog.author} - {blog.title}
    </li>
  )
}
