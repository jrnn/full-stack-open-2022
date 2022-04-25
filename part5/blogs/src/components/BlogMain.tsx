import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { fetchBlogs } from "../store/blogs"

export const BlogMain = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.blogs)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [ dispatch ])

  return status === "fetching"
    ? <div>... LOADING ...</div>
    :
    <div>
      <h2>Blogs</h2>
      <Outlet />
    </div>
}
