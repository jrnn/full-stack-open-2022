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
  const certainlyUser = user as UserDocument
  const { _id } = await new BlogModel({ ...body, user: certainlyUser._id }).save()
  certainlyUser.blogs.push(_id)
  await certainlyUser.save()

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
  const certainlyUser = user as UserDocument
  const blogToDelete = await BlogModel.findById(id)

  if (!blogToDelete) {
    throw new NotFoundError(`no blog found with id '${id}'`)
  }
  if (blogToDelete.user && blogToDelete.user.toString() !== certainlyUser._id.toString()) {
    throw new AuthorizationError()
  }
  certainlyUser.blogs = certainlyUser.blogs.filter(({ _id }) => _id.toString() !== id)
  await certainlyUser.save()
  await blogToDelete.delete()

  return response.status(204).end()
}))

export default router
