import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { deleteBlog, getAllBlogs, postBlog, putBlog } from "../services/blogs"
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
  const incrementLikes = async ({ id, likes }: BlogEntity) => {
    try {
      const payload = { id, likes: likes + 1 }
      const updatedBlog = await putBlog(payload)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch (error) {
      console.error(error)
      notify("Oops, couldn't add that like! Too bad!", "error")
    }
  }
  const removeBlog = async ({ id }: BlogEntity) => {
    try {
      await deleteBlog(id, user.token)
      setBlogs(blogs.filter(blog => blog.id !== id))
      notify("You just removed a blog. Uhh... Hooray...?", "info")
    } catch (error) {
      console.error(error)
      notify("Oh no, couldn't remove that blog! Such a sad day!", "error")
    }
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const blogsFromApi = await getAllBlogs()
        setBlogs(blogsFromApi)
      } catch (error) {
        console.error(error)
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
      <BlogList
        user={user}
        blogs={blogs}
        incrementLikes={incrementLikes}
        removeBlog={removeBlog}
      />
    </div>
  )
}
