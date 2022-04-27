import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "."
import { accessApi } from "../services/api"
import { BlogDto, BlogEntity } from "../types"
import { notifyError, notifySuccess } from "./notification"

type Status = "idle" | "fetching" | "posting"
type BlogsState = Readonly<{
  status: Status
  blogs: Record<string, BlogEntity>
}>

const initialState: BlogsState = {
  status: "idle",
  blogs: {}
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
    setBlogs: (state, { payload: blogs }: PayloadAction<Record<string, BlogEntity>>) => {
      return {
        ...state,
        blogs
      }
    },
    add: (state, { payload: blog }: PayloadAction<BlogEntity>) => {
      return {
        ...state,
        blogs: { ...state.blogs, [blog.id]: blog }
      }
    },
    remove: (state, { payload: idToRemove }: PayloadAction<string>) => {
      const { [idToRemove]: blogToRemove, ...blogs } = state.blogs
      return {
        ...state,
        blogs
      }
    }
  }
})

const { setStatus, setBlogs, add, remove } = slice.actions

const api = accessApi<BlogEntity>("/api/blogs")

const doNothing = () => { /**/ }

export const fetchBlogs = (): AppThunkAction => async dispatch => {
  dispatch(setStatus("fetching"))
  try {
    const blogs = await api.getAll()
    const indexedBlogs = Object.fromEntries(blogs.map(blog => [ blog.id, blog ]))
    dispatch(setBlogs(indexedBlogs))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't fetch blogs from server. Too bad!"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export const createBlog = (blog: BlogDto, token: string, onSuccess = doNothing): AppThunkAction => async dispatch => {
  dispatch(setStatus("posting"))
  try {
    const newBlog = await api.post(blog, token)
    dispatch(add(newBlog))
    dispatch(notifySuccess(`Hooray! You just added a new blog "${newBlog.title}"`))
    onSuccess()
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
    dispatch(add(updatedBlog))
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't add that like. Too bad!"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export const removeBlog = ({ id }: BlogEntity, token: string, onSuccess = doNothing): AppThunkAction => async dispatch => {
  dispatch(setStatus("posting"))
  try {
    await api.delete(id, token)
    dispatch(remove(id))
    dispatch(notifySuccess("You just removed a blog. Uhh... Hooray...?"))
    onSuccess()
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't remove that blog. Too bad!"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export const addComment = ({ id }: BlogEntity, comment: string, onSuccess = doNothing): AppThunkAction => async dispatch => {
  dispatch(setStatus("posting"))
  try {
    const { data } = await axios.post<BlogEntity>(`/api/blogs/${id}/comments`, { comment })
    dispatch(add(data))
    onSuccess()
  } catch (error) {
    console.error(error)
    dispatch(notifyError("Oops! Couldn't add that like. Too bad!"))
  } finally {
    dispatch(setStatus("idle"))
  }
}

export default slice.reducer
