import { Router } from "express"
import { BlogRequest, BlogModel } from "../models/blog"
import { AuthorizationError, NotFoundError, throwsError } from "../errors/errors"
import { TypedRequest } from "../types"
import { UserModel } from "../models/user"
import { decodeToken } from "../utils/security"

const router = Router()
const updateOpts = { new: true, runValidators: true }

router.get("/", throwsError(async (_, response) => {
  const blogs = await BlogModel
    .find({})
    .populate("user", { blogs: 0 })

  return response.status(200).json(blogs)
}))

router.post("/", throwsError(async (request: TypedRequest<BlogRequest>, response) => {
  const { body, token } = request
  const tokenId = decodeToken(token)
  const user = await UserModel.findById(tokenId)
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

router.delete("/:id", throwsError(async (request: TypedRequest, response) => {
  const userId = decodeToken(request.token)
  const { id } = request.params
  const blogToDelete = await BlogModel.findById(id)

  if (!blogToDelete) {
    throw new NotFoundError(`no blog found with id '${id}'`)
  }
  if (blogToDelete.user && userId !== blogToDelete.user.toString()) {
    throw new AuthorizationError()
  }
  await blogToDelete.delete()
  return response.status(204).end()
}))

export default router
