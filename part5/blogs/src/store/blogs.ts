import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "."
import * as api from "../services/blogs"
import { BlogDto, BlogEntity } from "../types"
import { notifyError, notifySuccess } from "./notification"

type BlogsState = Readonly<{
  blogs: ReadonlyArray<BlogEntity>
}>

const initialState: BlogsState = {
  blogs: []
}

const slice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, { payload: blogs }: PayloadAction<Array<BlogEntity>>) => {
      return {
        ...state,
        blogs
      }
    },
    addBlog: (state, { payload: newBlog }: PayloadAction<BlogEntity>) => {
      return {
        ...state,
        blogs: state.blogs.concat(newBlog)
      }
    }
  }
})

const { setBlogs, addBlog } = slice.actions

export const fetchBlogs = (): AppThunkAction => async dispatch => {
  try {
    const blogs = await api.getAllBlogs()
    dispatch(setBlogs(blogs))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't fetch blogs from server. Too bad!"))
  }
}
export const createBlog = (blog: BlogDto, token: string): AppThunkAction => async dispatch => {
  try {
    const newBlog = await api.postBlog(blog, token)
    dispatch(addBlog(newBlog))
    dispatch(notifySuccess(`Hooray! You just added a new blog "${newBlog.title}"`))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! The server says no. Please check the inputs."))
  }
}
export default slice.reducer
