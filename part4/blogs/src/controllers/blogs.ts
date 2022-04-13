import { Router } from "express"
import { BlogRequest, BlogModel } from "../models/blog"
import { NotFoundError, throwsError } from "../errors/errors"
import { TypedRequest } from "../types"
import { UserModel } from "../models/user"

const router = Router()
const updateOpts = { new: true, runValidators: true }

router.get("/", throwsError(async (_, response) => {
  const blogs = await BlogModel
    .find({})
    .populate("user", { blogs: 0 })

  return response.status(200).json(blogs)
}))

router.post("/", throwsError(async ({ body }: TypedRequest<BlogRequest>, response) => {
  const user = (await UserModel.find({}))[0]
  if (!user) {
    throw new NotFoundError("no users in database")
  }
  const blog = await new BlogModel({ ...body, user: user._id }).save()
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
