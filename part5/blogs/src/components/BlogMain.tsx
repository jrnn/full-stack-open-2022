import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { fetchBlogs } from "../store/blogs"
import { WaitForMe } from "./WaitForMe"

export const BlogMain = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(({ blogs }) => blogs.status === "fetching")

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [ dispatch ])

  return (isLoading
    ? <WaitForMe />
    :
    <div>
      <h2>Blogs</h2>
      <Outlet />
    </div>
  )
}
