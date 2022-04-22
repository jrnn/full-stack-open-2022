import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { deleteBlog, getAllBlogs, postBlog, putBlog } from "../services/blogs"
import { useAppDispatch } from "../store"
import { notifyError, notifySuccess } from "../store/notification"
import { BlogDto, BlogEntity, UserAuth } from "../types"
import { BlogForm } from "./BlogForm"
import { BlogList } from "./BlogList"
import { TogglableElement } from "./TogglableElement"

interface Props {
  user: UserAuth
  handleLogout: () => void
}

interface Togglable {
  toggle: () => void
}

export const BlogMain: FunctionComponent<Props> = ({ user, handleLogout }) => {
  const dispatch = useAppDispatch()

  const [ blogs, setBlogs ] = useState<Array<BlogEntity>>([])
  const togglableRef = useRef<Togglable>()

  const createBlog = async (blogDto: BlogDto, onSuccess: () => void) => {
    try {
      const blog = await postBlog(blogDto, user.token)
      setBlogs(blogs.concat(blog))
      onSuccess()
      togglableRef.current?.toggle()
      dispatch(notifySuccess(`You just added a new blog '${blog.title}', hooray!`))
    } catch (error) {
      console.error(error)
      dispatch(notifyError("Oops, couldn't add! Please check the inputs?"))
    }
  }
  const incrementLikes = async ({ id, likes }: BlogEntity) => {
    try {
      const payload = { id, likes: likes + 1 }
      const updatedBlog = await putBlog(payload)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch (error) {
      console.error(error)
      dispatch(notifyError("Oops, couldn't add that like! Too bad!"))
    }
  }
  const removeBlog = async ({ id }: BlogEntity) => {
    try {
      await deleteBlog(id, user.token)
      setBlogs(blogs.filter(blog => blog.id !== id))
      dispatch(notifySuccess("You just removed a blog. Uhh... Hooray...?"))
    } catch (error) {
      console.error(error)
      dispatch(notifyError("Oh no, couldn't remove that blog! Such a sad day!"))
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
