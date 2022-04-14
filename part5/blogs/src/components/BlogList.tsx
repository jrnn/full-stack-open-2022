import React, { FunctionComponent, useEffect, useState } from "react"
import { getAllBlogs } from "../services/blogs"
import { BlogResponse, UserAuth } from "../types"
import { BlogEntry } from "./BlogEntry"

interface Props {
  user: UserAuth
  handleLogout: () => void
}

export const BlogList: FunctionComponent<Props> = ({ user, handleLogout }) => {
  const [ blogs, setBlogs ] = useState<Array<BlogResponse>>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const _blogs = await getAllBlogs()
        setBlogs(_blogs)
      } catch (error) {
        console.error(error)
      }
    }
    fetch()
  }, [])

  return (
    <div>
      <h2>Please peruse blogs</h2>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
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
