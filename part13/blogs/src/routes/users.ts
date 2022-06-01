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

usersRouter.get("/:id", throwsError(async (request, response) => {
  const { id } = request.params
  const user = await User.findByPk(id, {
    include: {
      model: Blog,
      as: "readings",
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "userId"
        ]
      },
      through: {
        attributes: [
          "hasBeenRead"
        ]
      }
    }
  })
  if (!user) {
    throw new NotFoundError(`no user found with id '${id}'`)
  }
  response.status(200).json(user)
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
