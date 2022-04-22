import React from "react"
import { useAppSelector } from "../store"
import { BlogEntry } from "./BlogEntry"

export const BlogList = () => {
  const blogs = useAppSelector(state => [ ...state.blogs.blogs ]
    .sort((p, q) => q.likes - p.likes))

  return (
    <div>
      <h3>Please peruse blogs</h3>
      {blogs.map(blog =>
        <BlogEntry
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}
