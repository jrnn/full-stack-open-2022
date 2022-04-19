import { Router } from "express"
import { MODE } from "../config"
import { BlogModel } from "../models/blog"
import { UserModel } from "../models/user"

const router = Router()

router.post("/reset", async (_, response) => {
  if (MODE !== "test") {
    return response.status(404).end()
  }
  await BlogModel.deleteMany({})
  await UserModel.deleteMany({})
  return response.status(204).end()
})

export default router
