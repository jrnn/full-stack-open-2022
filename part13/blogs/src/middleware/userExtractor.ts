import { SECRET_KEY } from "../config"
import { RequestHandler } from "express"
import * as jwt from "jsonwebtoken"
import { AuthenticationError } from "../errors"
import { User } from "../models"
import { TypedRequest } from "../types"

export const userExtractor: RequestHandler = async (request: TypedRequest, _, next) => {
  try {
    const auth = request.get("authorization")
    const token = auth && auth.trim().toLowerCase().startsWith("bearer ")
      ? auth.substring(7).trim()
      : ""

    const { id } = <{ id: number }>jwt.verify(token, SECRET_KEY)
    const user = await User.findByPk(id)
    if (!user) {
      throw new AuthenticationError()
    }
    request.user = user
    return next()
  } catch (error) {
    return next(error)
  }
}
