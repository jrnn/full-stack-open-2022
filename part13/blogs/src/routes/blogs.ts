import { Router } from "express"
import { Blog } from "../models"

export const blogsRouter = Router()

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.findAll()
  const blogsJson = blogs.map(blog => blog.toJSON())
  return response.status(200).json(blogsJson)
})

blogsRouter.post("/", async ({ body }, response) => {
  try {
    const blog = await Blog.create(body)
    return response.status(201).json(blog)
  } catch (error) {
    return response.status(400).json({ error })
  }
})

blogsRouter.delete("/:id", async ({ params }, response) => {
  const blog = await Blog.findByPk(params.id)
  if (!blog) {
    return response.status(404).end()
  }
  await blog.destroy()
  return response.status(204).end()
})
