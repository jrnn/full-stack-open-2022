import React, { FunctionComponent, useEffect, useState } from "react"
import { getAllBlogs, postBlog } from "../services/blogs"
import { BlogDto, BlogEntity, UserAuth } from "../types"
import { BlogForm } from "./BlogForm"
import { BlogList } from "./BlogList"

interface Props {
  user: UserAuth
  handleLogout: () => void
}

export const BlogMain: FunctionComponent<Props> = ({ user, handleLogout }) => {
  const [ blogs, setBlogs ] = useState<Array<BlogEntity>>([])

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

  const createBlog = async (blogDto: BlogDto): Promise<boolean> => {
    try {
      const blog = await postBlog(blogDto, user.token)
      setBlogs(blogs.concat(blog))
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
      <BlogForm createBlog={createBlog} />
      <BlogList blogs={blogs} />
    </div>
  )
}
