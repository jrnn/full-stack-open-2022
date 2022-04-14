import React, { FunctionComponent } from "react"
import { BlogEntity } from "../types"

interface Props {
  blog: BlogEntity
}

export const BlogEntry: FunctionComponent<Props> = ({ blog }) => {
  return (
    <li>
      {blog.author} - {blog.title}
    </li>
  )
}
