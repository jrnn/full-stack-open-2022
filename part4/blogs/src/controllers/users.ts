import { Router } from "express"
import { throwsError } from "../errors/errors"
import { UserModel, UserRequest } from "../models/user"
import { TypedRequest } from "../types"
import { hash } from "../utils/security"

const router = Router()

router.get("/", throwsError(async (_, response) => {
  const users = await UserModel
    .find({})
    .populate("blogs", { user: 0 })

  return response.status(200).json(users)
}))

router.post("/", throwsError(async (request: TypedRequest<UserRequest>, response) => {
  const { username, name, password } = request.body
  const pwHash = await hash(password)
  const schema = {
    username,
    name,
    pwHash
  }
  const newUser = await new UserModel(schema).save()
  return response.status(201).json(newUser)
}))

export default router
