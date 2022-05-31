import { PASSWORD, SECRET_KEY } from "../config"
import { Request, Router } from "express"
import * as jwt from "jsonwebtoken"
import { AuthenticationError, throwsError } from "../errors"
import { User } from "../models"

interface TypedRequest<T = unknown> extends Request {
  body: T
}

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
  const { id, name } = user
  const token = jwt.sign({ id, name, username }, SECRET_KEY)
  return response.status(200).json({ token })
}))
