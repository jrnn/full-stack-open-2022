import bcrypt from "bcryptjs"
import { ValidationError } from "../errors/errors"

const saltRounds = 10

export const hash = async (password = ""): Promise<string> => {
  const _password = password.trim()
  if (!_password) {
    throw new ValidationError("password cannot be empty")
  }
  if (_password.length < 3) {
    throw new ValidationError("password must have at least 3 characters")
  }
  return await bcrypt.hash(password, saltRounds)
}
