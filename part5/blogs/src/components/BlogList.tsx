import React, { FunctionComponent } from "react"
import { BlogEntity } from "../types"
import { BlogEntry } from "./BlogEntry"

interface Props {
  blogs: Array<BlogEntity>
  incrementLikes: (blog: BlogEntity) => void
}

export const BlogList: FunctionComponent<Props> = ({ blogs, incrementLikes }) => {
  return (
    <div>
      <h3>Please peruse blogs</h3>
      {blogs.map(blog =>
        <BlogEntry
          key={blog.id}
          blog={blog}
          incrementLikes={incrementLikes}
        />
      )}
    </div>
  )
}
