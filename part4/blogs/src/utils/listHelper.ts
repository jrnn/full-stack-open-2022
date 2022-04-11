import logger from "../middleware/logger"
import { Blog } from "../models/blog"

const summingBy = <T>(elements: Array<T>, mapper: (t: T) => [ string, number ]) => {
  return elements
    .map(mapper)
    .reduce((prev, [ key, increment ]) => {
      const count = prev[key] || 0
      return { ...prev, [key]: count + increment }
    }, {} as Record<string, number>)
}

const getMax = (stats: Record<string, number>): [ string, number ] => {
  return Object
    .entries(stats)
    .reduce((prev, next) => prev[1] < next[1] ? next : prev)
}

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
  const totalBlogsByAuthor = summingBy(blogs, ({ author }) => [ author, 1 ])
  const [ author, totalBlogs ] = getMax(totalBlogsByAuthor)
  return { author, blogs: totalBlogs }
}

export const mostLikes = (blogs: Array<Blog>) => {
  if (blogs.length === 0) {
    throw new Error("can't pick author with most likes from nothing")
  }
  const totalLikesByAuthor = summingBy(blogs, ({ author, likes }) => [ author, likes ])
  const [ author, totalLikes ] = getMax(totalLikesByAuthor)
  return { author, likes: totalLikes }
}
