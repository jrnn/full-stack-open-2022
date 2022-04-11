import { Router } from "express"
import { BlogModel } from "../models/blog"

const router = Router()

router.get("/", async (_, response) => {
  const blogs = await BlogModel.find({})
  return response.status(200).json(blogs)
})

router.post("/", async (request, response) => {
  const blog = await new BlogModel(request.body).save()
  return response.status(201).json(blog)
})

export default router
