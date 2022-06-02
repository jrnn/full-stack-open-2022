import { Router } from "express"
import { NotFoundError, throwsError } from "../errors"
import { userExtractor } from "../middleware"
import { Blog, Reading, User } from "../models"
import { TypedRequest } from "../types"

export const readingsRouter = Router()

interface ReadingDto {
  blogId: number
  userId: number
}

readingsRouter.post("/", throwsError(async (request: TypedRequest<ReadingDto>, response) => {
  const { blogId, userId } = request.body
  const blog = await Blog.findByPk(blogId)
  if (!blog) {
    throw new NotFoundError(`no blog found with id '${blogId}'`)
  }
  const user = await User.findByPk(userId)
  if (!user) {
    throw new NotFoundError(`no user found with id '${userId}'`)
  }
  const reading = await Reading.create({ blogId, userId })
  response.status(201).json(reading)
}))

readingsRouter.put("/:blogId", userExtractor, throwsError(async (request: TypedRequest<{ hasBeenRead: boolean }>, response) => {
  const user = request.user as User
  const blogId = request.params["blogId"] || "-1"
  const reading = await Reading.findOne({
    where: {
      blogId,
      userId: user.id
    }
  })
  if (!reading) {
    throw new NotFoundError(`no reading found for the current user for blog '${blogId}'`)
  }
  const { hasBeenRead } = request.body
  reading.hasBeenRead = hasBeenRead
  await reading.save()
  return response.status(200).json(reading)
}))
