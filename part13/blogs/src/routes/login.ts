import { PASSWORD } from "../config"
import { Router } from "express"
import { AuthenticationError, throwsError, UserDisabledError } from "../errors"
import { User } from "../models"
import { sessionService } from "../services"
import { TypedRequest } from "../types"

interface Credentials {
  username: string
  password: string
}

export const loginRouter = Router()

loginRouter.post("/", throwsError(async ({ body }: TypedRequest<Credentials>, response) => {
  const { username, password } = body
  if (!username || password !== PASSWORD) {
    throw new AuthenticationError()
  }
  const user = await User.findOne({ where: { username }})
  if (!user) {
    throw new AuthenticationError()
  }
  if (user.disabled) {
    throw new UserDisabledError()
  }
  const { token } = await sessionService.create(user)
  return response.status(200).json({ token })
}))
