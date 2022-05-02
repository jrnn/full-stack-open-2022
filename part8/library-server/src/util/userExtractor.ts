import { SECRET_KEY } from "../config"
import { ExpressContext } from "apollo-server-express"
import jwt from "jsonwebtoken"
import UserModel, { UserDocument } from "../models/user"

export const userExtractor = async ({ req }: ExpressContext): Promise<UserDocument | null> => {
  const auth = req.headers.authorization
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.substring(7)
    const { id } = <{ id: string }>jwt.verify(token, SECRET_KEY)
    return await UserModel.findById(id)
  }
  return null
}
