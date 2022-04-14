import { Router } from "express"
import { BlogRequest, BlogModel } from "../models/blog"
import { AuthorizationError, NotFoundError, throwsError } from "../errors/errors"
import { TypedRequest } from "../types"
import { UserDocument } from "../models/user"
import userExtractor from "../middleware/userExtractor"

const router = Router()
const updateOpts = { new: true, runValidators: true }
const populateOpts = { blogs: 0 }

router.get("/", throwsError(async (_, response) => {
  const blogs = await BlogModel
    .find({})
    .populate("user", populateOpts)

  return response.status(200).json(blogs)
}))

router.post("/", userExtractor, throwsError(async ({ body, user }: TypedRequest<BlogRequest>, response) => {
  const { _id } = await new BlogModel({ ...body, user: user?._id }).save()
  user?.blogs.push(_id)
  await user?.save()

  const blog = await BlogModel
    .findById(_id)
    .populate("user", populateOpts)

  return response.status(201).json(blog)
}))

router.put("/:id", throwsError(async ({ body, params }, response) => {
  const { id } = params
  const updatedBlog = await BlogModel
    .findByIdAndUpdate(id, body, updateOpts)
    .populate("user", populateOpts)

  if (!updatedBlog) {
    throw new NotFoundError(`no blog found with id '${id}'`)
  }
  return response.status(200).json(updatedBlog)
}))

router.delete("/:id", userExtractor, throwsError(async ({ params, user }: TypedRequest, response) => {
  const { id } = params
  const userId = (user as UserDocument)._id
  const blogToDelete = await BlogModel.findById(id)

  if (!blogToDelete) {
    throw new NotFoundError(`no blog found with id '${id}'`)
  }
  if (blogToDelete.user && userId.toString() !== blogToDelete.user.toString()) {
    throw new AuthorizationError()
  }
  await blogToDelete.delete()
  return response.status(204).end()
}))

export default router
