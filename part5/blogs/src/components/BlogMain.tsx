import React, { useEffect } from "react"
import { useAuth } from "../hooks"
import { useAppDispatch } from "../store"
import { logout } from "../store/auth"
import { fetchBlogs } from "../store/blogs"
import { TogglableBlogForm } from "./BlogForm"
import { BlogList } from "./BlogList"

export const BlogMain = () => {
  const dispatch = useAppDispatch()
  const { name } = useAuth()

  const handleLogout = () => {
    dispatch(logout())
  }
  useEffect(() => {
    dispatch(fetchBlogs())
  }, [ dispatch ])

  return (
    <div>
      <p>Logged in as {name}</p>
      <button onClick={handleLogout}>Logout</button>
      <TogglableBlogForm />
      <BlogList />
    </div>
  )
}
