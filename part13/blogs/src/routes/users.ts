import { Router } from "express"
import { NotFoundError, throwsError } from "../errors"
import { Blog, User } from "../models"
import { TypedRequest } from "../types"

export const usersRouter = Router()

usersRouter.get("/", throwsError(async (_, response) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: [
          "userId",
          "createdAt",
          "updatedAt"
        ]
      }
    }
  })
  return response.status(200).json(users)
}))

usersRouter.post("/", throwsError(async ({ body }, response) => {
  const user = await User.create(body)
  return response.status(201).json(user)
}))

usersRouter.put("/:username", throwsError(async (request: TypedRequest<{ name: string }>, response) => {
  const username = request.params["username"] as string
  const user = await User.findOne({ where: { username }})
  if (!user) {
    throw new NotFoundError(`no user found with username '${username}'`)
  }
  user.name = request.body.name
  await user.save()
  response.status(200).json(user)
}))
