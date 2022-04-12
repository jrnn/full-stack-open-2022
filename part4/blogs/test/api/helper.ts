import { FilterQuery } from "mongoose"
import { BlogDocument, BlogModel } from "../../src/models/blog"
import { blogs as initialBlogs } from "../testblogs"

export const BLOGS_ROOT_URI = "/api/blogs"

export const initBlogs = async (): Promise<void> => {
  await BlogModel.deleteMany({})
  await Promise.all(initialBlogs.map(blog => new BlogModel(blog).save()))
}

export const countBlogsInDb = async (): Promise<number> => {
  return BlogModel.count({})
}

export const getBlogsInDb = async (filter: FilterQuery<unknown> = {}) => {
  return BlogModel.find(filter).sort({ _id: -1 })
}

export const getBlogInDb = async (id: string): Promise<BlogDocument> => {
  return await BlogModel.findById(id) as BlogDocument
}

export const getRandomBlogInDb = async (): Promise<BlogDocument> => {
  const blogs = await BlogModel.find({})
  return blogs[Math.floor(Math.random() * blogs.length)] as BlogDocument
}

export const deleteRandomBlogInDb = async (): Promise<string> => {
  const { id } = await getRandomBlogInDb()
  await BlogModel.findByIdAndDelete(id)
  return id
}
