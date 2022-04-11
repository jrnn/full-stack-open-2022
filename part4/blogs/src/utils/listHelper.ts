import logger from "../middleware/logger"
import { Blog } from "../models/blog"

export const dummy = (blogs: Array<Blog>): number => {
  logger.info(blogs)
  return 1
}

export const totalLikes = (blogs: Array<Blog>): number => {
  return blogs
    .map(blog => blog.likes)
    .reduce((prev, next) => prev + next, 0)
}

export const favoriteBlog = (blogs: Array<Blog>): Blog => {
  if (blogs.length === 0) {
    throw new Error("can't pick a favorite from nothing")
  } else if (blogs.length === 1) {
    return blogs[0] as Blog
  }
  return [ ...blogs ].sort((p, q) => q.likes - p.likes)[0] as Blog
}

export const mostBlogs = (blogs: Array<Blog>) => {
  if (blogs.length === 0) {
    throw new Error("can't pick author with most blogs from nothing")
  }
  const stats = blogs
    .map(blog => blog.author)
    .reduce((prev, next) => {
      const count = prev[next] || 0
      return { ...prev, [next]: count + 1 }
    }, {} as Record<string, number>)

  const [ author, totalBlogs ] = Object
    .entries(stats)
    .sort((p, q) => q[1] - p[1])[0] as [ string, number ]

  return { author, blogs: totalBlogs }
}
