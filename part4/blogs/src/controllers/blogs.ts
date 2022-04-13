import { Request, RequestHandler, Response, Router } from "express"
import { Blog, BlogModel } from "../models/blog"
import { NotFoundError } from "../errors/errors"
import { TypedRequest } from "../types"

const router = Router()
const updateOpts = { new: true, runValidators: true }

const throwsError = (throwingHandler: (req: Request, res: Response) => Promise<unknown>): RequestHandler => {
  return (request, response, next) => {
    return throwingHandler(request, response).catch(next)
  }
}

router.get("/", throwsError(async (_, response) => {
  const blogs = await BlogModel.find({})
  return response.status(200).json(blogs)
}))

router.post("/", throwsError(async ({ body }: TypedRequest<Blog>, response) => {
  const blog = await new BlogModel(body).save()
  return response.status(201).json(blog)
}))

router.put("/:id", throwsError(async ({ body, params }, response) => {
  const { id } = params
  const updatedBlog = await BlogModel.findByIdAndUpdate(id, body, updateOpts)
  if (!updatedBlog) {
    throw new NotFoundError(`no blog found with id '${id}'`)
  }
  return response.status(200).json(updatedBlog)
}))

router.delete("/:id", throwsError(async ({ params }, response) => {
  const { id } = params
  const deletedBlog = await BlogModel.findByIdAndDelete(id)
  if (!deletedBlog) {
    throw new NotFoundError(`no blog found with id '${id}'`)
  }
  return response.status(204).end()
}))

export default router
