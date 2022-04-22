import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { fetchBlogs } from "../store/blogs"
import { BlogEntry } from "./BlogEntry"
import { TogglableBlogForm } from "./BlogForm"

export const BlogList = () => {
  const dispatch = useAppDispatch()
  const blogs = useAppSelector(state => [ ...state.blogs.blogs ]
    .sort((p, q) => q.likes - p.likes))

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [ dispatch ])

  return (
    <div>
      <TogglableBlogForm />
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
