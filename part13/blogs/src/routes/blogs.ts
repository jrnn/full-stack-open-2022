import { Request, RequestHandler, Router } from "express"
import { NotFoundError, throwsError } from "../errors"
import { Blog } from "../models"

interface RequestWithBlog<T = unknown> extends Request<{ id?: string }> {
  body: T
  blog?: Blog
}

const blogFinder: RequestHandler = async (request: RequestWithBlog, _, next) => {
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

blogsRouter.post("/", throwsError(async ({ body }, response) => {
  const blog = await Blog.create(body)
  return response.status(201).json(blog)
}))

blogsRouter.put("/:id", blogFinder, throwsError(async (request: RequestWithBlog<{ likes: number }>, response) => {
  const blog = request.blog as Blog
  blog.likes = request.body.likes
  await blog.save()
  return response.status(200).json(blog)
}))

blogsRouter.delete("/:id", blogFinder, throwsError(async (request: RequestWithBlog, response) => {
  const blog = request.blog as Blog
  await blog.destroy()
  return response.status(204).end()
}))
