import React, { FunctionComponent } from "react"
import { BlogEntity } from "../types"
import { BlogEntry } from "./BlogEntry"

interface Props {
  blogs: Array<BlogEntity>
}

export const BlogList: FunctionComponent<Props> = ({ blogs }) => {
  return (
    <div>
      <h3>Please peruse blogs</h3>
      <ul>
        {blogs.map(blog =>
          <BlogEntry
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
    </div>
  )
}
