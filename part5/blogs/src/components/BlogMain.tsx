import React, { FunctionComponent, useEffect, useState } from "react"
import { deleteBlog, putBlog } from "../services/blogs"
import { useAppDispatch, useAppSelector } from "../store"
import { fetchBlogs } from "../store/blogs"
import { notifyError, notifySuccess } from "../store/notification"
import { BlogEntity, UserAuth } from "../types"
import { TogglableBlogForm } from "./BlogForm"
import { BlogList } from "./BlogList"

interface Props {
  user: UserAuth
  handleLogout: () => void
}

export const BlogMain: FunctionComponent<Props> = ({ user, handleLogout }) => {
  const dispatch = useAppDispatch()
  const { blogs } = useAppSelector(state => state.blogs)

  const [ , setBlogs ] = useState<Array<BlogEntity>>([])

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
    dispatch(fetchBlogs())
  }, [ dispatch ])

  return (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
      {}
      <TogglableBlogForm token={user.token} />
      <BlogList
        user={user}
        blogs={blogs}
        incrementLikes={incrementLikes}
        removeBlog={removeBlog}
      />
    </div>
  )
}
