import { Router } from "express"
import { AuthenticationError, throwsError } from "../errors/errors"
import { UserModel } from "../models/user"
import { TypedRequest } from "../types"
import { issueToken, verifyPassword } from "../utils/security"

interface Credentials {
  username: string
  password: string
}

const router = Router()

router.post("/", throwsError(async ({ body }: TypedRequest<Credentials>, response) => {
  const { username, password } = body
  const user = await UserModel.findOne({ username })
  const isCorrectPassword = !user
    ? false
    : await verifyPassword(password, user.pwHash)

  if (!user || !isCorrectPassword) {
    throw new AuthenticationError()
  }
  const token = issueToken(user._id.toString(), username)
  return response.status(200).json({
    token,
    name: user.name,
    username: user.username
  })
}))

export default router
