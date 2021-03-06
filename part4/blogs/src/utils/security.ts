import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import { SECRET_KEY } from "../config"
import { ValidationError } from "../errors/errors"

const saltRounds = 10

export const hashPassword = async (password = ""): Promise<string> => {
  const _password = password.trim()
  if (!_password) {
    throw new ValidationError("password cannot be empty")
  }
  if (_password.length < 3) {
    throw new ValidationError("password must have at least 3 characters")
  }
  return await bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async (password = "", hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

export const issueToken = (id: string, username: string, key = SECRET_KEY): string => {
  return jwt.sign({ id, username }, key)
}

interface UserPayload extends JwtPayload {
  id: string
  username: string
}

export const decodeToken = (token = ""): string => {
  const { id } = <UserPayload>jwt.verify(token, SECRET_KEY)
  return id
}
