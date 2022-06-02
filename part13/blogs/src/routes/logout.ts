import { Router } from "express"
import { throwsError } from "../errors"
import { userExtractor } from "../middleware"
import { User } from "../models"
import { sessionService } from "../services"
import { TypedRequest } from "../types"

export const logoutRouter = Router()

logoutRouter.post("/", userExtractor, throwsError(async (request: TypedRequest, response) => {
  const user = request.user as User
  await sessionService.reset(user)
  return response.status(204).end()
}))
