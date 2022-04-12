import { Request, RequestHandler, Response, Router } from "express"
import { Blog, BlogModel } from "../models/blog"

const router = Router()

interface TypedRequest<T> extends Request {
  body: T
}

const throwsError = (throwingHandler: (req: Request, res: Response) => Promise<unknown>): RequestHandler => {
  return (request, response, next) => {
    return throwingHandler(request, response).catch(next)
  }
}

router.get("/", throwsError(async (_, response) => {
  const blogs = await BlogModel.find({})
  return response.status(200).json(blogs)
}))

router.post("/", throwsError(async (request: TypedRequest<Blog>, response) => {
  const blog = await new BlogModel(request.body).save()
  return response.status(201).json(blog)
}))

export default router
