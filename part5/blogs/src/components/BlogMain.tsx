import React, { FunctionComponent, useEffect } from "react"
import { useAppDispatch } from "../store"
import { fetchBlogs } from "../store/blogs"
import { UserAuth } from "../types"
import { TogglableBlogForm } from "./BlogForm"
import { BlogList } from "./BlogList"

interface Props {
  user: UserAuth
  handleLogout: () => void
}

export const BlogMain: FunctionComponent<Props> = ({ user, handleLogout }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [ dispatch ])

  return (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
      <TogglableBlogForm token={user.token} />
      <BlogList user={user} />
    </div>
  )
}
