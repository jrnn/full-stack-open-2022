import axios from "axios"
import { BlogResponse } from "../types"

const rootUri = "/api/blogs"

export const getAllBlogs = async (): Promise<Array<BlogResponse>> => {
  const { data } = await axios.get<Array<BlogResponse>>(rootUri)
  return data
}
