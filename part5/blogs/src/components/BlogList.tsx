import React from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../store"
import { TogglableBlogForm } from "./BlogForm"

export const BlogList = () => {
  const blogs = useAppSelector(state => [ ...state.blogs.blogs ]
    .sort((p, q) => q.likes - p.likes))

  return (
    <div>
      <TogglableBlogForm />
      <h3>Please peruse blogs</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr
              className="blog-entry"
              key={blog.id}
            >
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
