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
    set: (state, { payload: blogs }: PayloadAction<Array<BlogEntity>>) => {
      return {
        ...state,
        blogs
      }
    },
    add: (state, { payload: newBlog }: PayloadAction<BlogEntity>) => {
      return {
        ...state,
        blogs: state.blogs.concat(newBlog)
      }
    },
    update: (state, { payload: updatedBlog }: PayloadAction<BlogEntity>) => {
      return {
        ...state,
        blogs: state.blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      }
    },
    remove: (state, { payload: idToRemove }: PayloadAction<string>) => {
      return {
        ...state,
        blogs: state.blogs.filter(({ id }) => id !== idToRemove)
      }
    }
  }
})

const { set, add, update, remove } = slice.actions

export const fetchBlogs = (): AppThunkAction => async dispatch => {
  try {
    const blogs = await api.getAllBlogs()
    dispatch(set(blogs))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't fetch blogs from server. Too bad!"))
  }
}
export const createBlog = (blog: BlogDto, token: string, onSuccess?: () => void): AppThunkAction => async dispatch => {
  try {
    const newBlog = await api.postBlog(blog, token)
    dispatch(add(newBlog))
    dispatch(notifySuccess(`Hooray! You just added a new blog "${newBlog.title}"`))
    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! The server says no. Please check the inputs."))
  }
}
export const incrementLikes = ({ id, likes }: BlogEntity): AppThunkAction => async dispatch => {
  try {
    const payload = { id, likes: likes + 1 }
    const updatedBlog = await api.putBlog(payload)
    dispatch(update(updatedBlog))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't add that like. Too bad!"))
  }
}
export const removeBlog = ({ id }: BlogEntity, token: string): AppThunkAction => async dispatch => {
  try {
    await api.deleteBlog(id, token)
    dispatch(remove(id))
    dispatch(notifySuccess("You just removed a blog. Uhh... Hooray...?"))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't remove that blog. Too bad!"))
  }
}
export default slice.reducer
