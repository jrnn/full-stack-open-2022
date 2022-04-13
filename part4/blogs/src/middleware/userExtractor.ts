import { RequestHandler } from "express"
import { AuthenticationError } from "../errors/errors"
import { UserModel } from "../models/user"
import { TypedRequest } from "../types"
import { decodeToken } from "../utils/security"

const userExtractor: RequestHandler = async (request: TypedRequest, _, next) => {
  try {
    const id = decodeToken(request.token)
    const user = await UserModel.findById(id)

    if (!user) {
      throw new AuthenticationError()
    }
    request.user = user
    return next()
  } catch (error) {
    return next(error)
  }
}

export default userExtractor
