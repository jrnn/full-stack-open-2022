import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { getAllBlogs, postBlog } from "../services/blogs"
import { BlogDto, BlogEntity, NotifyDispatch, UserAuth } from "../types"
import { BlogForm } from "./BlogForm"
import { BlogList } from "./BlogList"
import { TogglableElement } from "./TogglableElement"

interface Props {
  user: UserAuth
  handleLogout: () => void
  notify: NotifyDispatch
}

interface Togglable {
  toggle: () => void
}

export const BlogMain: FunctionComponent<Props> = ({ user, handleLogout, notify }) => {
  const [ blogs, setBlogs ] = useState<Array<BlogEntity>>([])
  const togglableRef = useRef<Togglable>()

  const createBlog = async (blogDto: BlogDto, onSuccess: () => void) => {
    try {
      const blog = await postBlog(blogDto, user.token)
      setBlogs(blogs.concat(blog))
      onSuccess()
      togglableRef.current?.toggle()
      notify(`You just added a new blog '${blog.title}', hooray!`, "info")
    } catch (error) {
      console.error(error)
      notify("Oops, couldn't add! Please check the inputs?", "error")
    }
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const blogsFromApi = await getAllBlogs()
        setBlogs(blogsFromApi)
      } catch (error) {
        console.error(error)
        notify("Couldn't fetch blogs from the server, maybe try again in a while?", "error")
      }
    }
    fetch()
  }, [])

  return (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
      <TogglableElement label="Click here to add new blog" ref={togglableRef}>
        <BlogForm createBlog={createBlog} />
      </TogglableElement>
      <BlogList blogs={blogs} />
    </div>
  )
}
