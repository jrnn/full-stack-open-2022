import logger from "../middleware/logger"
import { Blog } from "../models/blog"

export const dummy = (blogs: Array<Blog>): number => {
  logger.info(blogs)
  return 1
}

export const totalLikes = (blogs: Array<Blog>): number => {
  return blogs
    .map(blog => blog.likes || 0)
    .reduce((prev, next) => prev + next, 0)
}
