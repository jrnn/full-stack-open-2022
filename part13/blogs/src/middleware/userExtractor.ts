import { RequestHandler } from "express"
import { UserDisabledError } from "../errors"
import { sessionService } from "../services"
import { TypedRequest } from "../types"

export const userExtractor: RequestHandler = async (request: TypedRequest, _, next) => {
  try {
    const auth = request.get("authorization")
    const token = auth && auth.trim().toLowerCase().startsWith("bearer ")
      ? auth.substring(7).trim()
      : ""

    const user = await sessionService.check(token)
    if (user.disabled) {
      throw new UserDisabledError()
    }
    request.user = user
    return next()
  } catch (error) {
    return next(error)
  }
}
