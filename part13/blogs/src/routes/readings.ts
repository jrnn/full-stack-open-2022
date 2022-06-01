import { Router } from "express"
import { NotFoundError, throwsError } from "../errors"
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
