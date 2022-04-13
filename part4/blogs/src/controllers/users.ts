import bcrypt from "bcryptjs"
import { Router } from "express"
import { UserModel, UserRequest } from "../models/user"
import { TypedRequest } from "../types"

const router = Router()

router.get("/", async (_, response) => {
  const users = await UserModel.find({})
  return response.status(200).json(users)
})

router.post("/", async (request: TypedRequest<UserRequest>, response) => {
  const { username, name, password } = request.body
  const pwHash = await bcrypt.hash(password, 10)
  const schema = {
    username,
    name,
    pwHash
  }
  const newUser = await new UserModel(schema).save()
  return response.status(201).json(newUser)
})

export default router
