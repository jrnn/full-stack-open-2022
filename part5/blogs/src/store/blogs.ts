import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "."
import { accessApi } from "../services/api"
import { BlogDto, BlogEntity } from "../types"
import { notifyError, notifySuccess } from "./notification"

type Status = "idle" | "fetching" | "posting"
type BlogsState = Readonly<{
  status: Status
  blogs: ReadonlyArray<BlogEntity>
}>

const initialState: BlogsState = {
  status: "idle",
  blogs: []
}

const slice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setStatus: (state, { payload: status }: PayloadAction<Status>) => {
      return {
        ...state,
        status
      }
    },
    setBlogs: (state, { payload: blogs }: PayloadAction<Array<BlogEntity>>) => {
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

const { setStatus, setBlogs, add, update, remove } = slice.actions

const api = accessApi<BlogEntity>("/api/blogs")

export const fetchBlogs = (): AppThunkAction => async dispatch => {
  dispatch(setStatus("fetching"))
  try {
    const blogs = await api.getAll()
    dispatch(setBlogs(blogs))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't fetch blogs from server. Too bad!"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export const createBlog = (blog: BlogDto, token: string, onSuccess?: () => void): AppThunkAction => async dispatch => {
  dispatch(setStatus("posting"))
  try {
    const newBlog = await api.post(blog, token)
    dispatch(add(newBlog))
    dispatch(notifySuccess(`Hooray! You just added a new blog "${newBlog.title}"`))
    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! The server says no. Please check the inputs."))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export const incrementLikes = ({ id, likes }: BlogEntity): AppThunkAction => async dispatch => {
  dispatch(setStatus("posting"))
  try {
    const updatedBlog = await api.put({ likes: likes + 1 }, id)
    dispatch(update(updatedBlog))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't add that like. Too bad!"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export const removeBlog = ({ id }: BlogEntity, token: string, onSuccess?: () => void): AppThunkAction => async dispatch => {
  dispatch(setStatus("posting"))
  try {
    await api.delete(id, token)
    dispatch(remove(id))
    dispatch(notifySuccess("You just removed a blog. Uhh... Hooray...?"))
    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't remove that blog. Too bad!"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export const addComment = ({ id }: BlogEntity, comment: string, onSuccess?: () => void): AppThunkAction => async dispatch => {
  try {
    const response = await axios.post<BlogEntity>(`/api/blogs/${id}/comments`, { comment })
    dispatch(update(response.data))
    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't add that like. Too bad!"))
  }
}

export default slice.reducer
