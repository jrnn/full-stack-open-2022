import axios from "axios"
import { BlogDto, BlogEntity } from "../types"

const rootUri = "/api/blogs"

export const getAllBlogs = async (): Promise<Array<BlogEntity>> => {
  const { data } = await axios.get<Array<BlogEntity>>(rootUri)
  return data
}

export const postBlog = async (blog: BlogDto, token: string): Promise<BlogEntity> => {
  const { data } = await axios.post<BlogEntity>(rootUri, blog, bearer(token))
  return data
}

export const putBlog = async (blog: Partial<BlogEntity>): Promise<BlogEntity> => {
  const { data } = await axios.put<BlogEntity>(`${rootUri}/${blog.id}`, blog)
  return data
}

const bearer = (token: string) => {
  return {
    headers: {
      authorization: `bearer ${token}`
    }
  }
}
