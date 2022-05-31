/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Request, RequestHandler, Router } from "express"
import { Blog } from "../models"

interface RequestWithBlog<T = unknown> extends Request<{ id?: string }> {
  body: T
  blog?: Blog
}

const blogFinder: RequestHandler = async (request: RequestWithBlog, response, next) => {
  const blog = await Blog.findByPk(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  request.blog = blog
  return next()
}

export const blogsRouter = Router()

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.findAll()
  return response.status(200).json(blogs)
})

blogsRouter.post("/", async ({ body }, response) => {
  try {
    const blog = await Blog.create(body)
    return response.status(201).json(blog)
  } catch (error) {
    return response.status(400).json({ error })
  }
})

blogsRouter.put("/:id", blogFinder, async ({ blog, body }: RequestWithBlog<{ likes: number }>, response) => {
  try {
    const { likes } = body
    blog!.likes = likes
    await blog!.save()
    return response.status(200).json(blog)
  } catch (error) {
    return response.status(400).json({ error })
  }
})

blogsRouter.delete("/:id", blogFinder, async ({ blog }: RequestWithBlog, response) => {
  await blog!.destroy()
  return response.status(204).end()
})
