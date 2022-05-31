import { RequestHandler, Router } from "express"
import { NotFoundError, throwsError } from "../errors"
import { userExtractor } from "../middleware"
import { Blog, User } from "../models"
import { TypedRequest } from "../types"

interface BlogDto {
  author?: string
  url: string
  title: string
  likes?: number
}

const blogFinder: RequestHandler = async (request: TypedRequest, _, next) => {
  const { id } = request.params
  const blog = await Blog.findByPk(id)
  if (!blog) {
    return next(new NotFoundError(`no blog found with id '${id}'`))
  }
  request.blog = blog
  return next()
}

export const blogsRouter = Router()

blogsRouter.get("/", throwsError(async (_, response) => {
  const blogs = await Blog.findAll()
  return response.status(200).json(blogs)
}))

blogsRouter.post("/", userExtractor, throwsError(async (request: TypedRequest<BlogDto>, response) => {
  const user = request.user as User
  const blog = await Blog.create({ ...request.body, userId: user.id })
  return response.status(201).json(blog)
}))

blogsRouter.put("/:id", blogFinder, throwsError(async (request: TypedRequest<{ likes: number }>, response) => {
  const blog = request.blog as Blog
  blog.likes = request.body.likes
  await blog.save()
  return response.status(200).json(blog)
}))

blogsRouter.delete("/:id", blogFinder, throwsError(async (request: TypedRequest, response) => {
  const blog = request.blog as Blog
  await blog.destroy()
  return response.status(204).end()
}))
