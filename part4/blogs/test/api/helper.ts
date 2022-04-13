import { FilterQuery } from "mongoose"
import { BlogDocument, BlogModel } from "../../src/models/blog"
import { UserDocument, UserModel } from "../../src/models/user"
import { blogs as initialBlogs, users as initialUsers } from "../testdata"

export const BLOGS_ROOT_URI = "/api/blogs"
export const USERS_ROOT_URI = "/api/users"

export const initBlogs = async (): Promise<void> => {
  await BlogModel.deleteMany({})
  await Promise.all(initialBlogs.map(blog => new BlogModel(blog).save()))
}

export const initUsers = async (): Promise<void> => {
  await UserModel.deleteMany({})
  await Promise.all(initialUsers.map(user => new UserModel(user).save()))
}

export const countBlogsInDb = async (): Promise<number> => {
  return BlogModel.countDocuments({})
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

export const countUsersInDb = async (): Promise<number> => {
  return UserModel.countDocuments({})
}

export const getUsersInDb = async (filter: FilterQuery<unknown> = {}): Promise<Array<UserDocument>> => {
  return await UserModel.find(filter).sort({ _id: -1 })
}

export const getUserInDb = async (id: string): Promise<UserDocument> => {
  return await UserModel.findById(id) as UserDocument
}

export const getRandomUserInDb = async (): Promise<UserDocument> => {
  const users = await UserModel.find({})
  return users[Math.floor(Math.random() * users.length)] as UserDocument
}
