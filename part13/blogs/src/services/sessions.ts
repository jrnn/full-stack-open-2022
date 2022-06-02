import { SECRET_KEY } from "../config"
import * as jwt from "jsonwebtoken"
import { AuthenticationError } from "../errors"
import { Session, User } from "../models"

/**
 * Verifies the given @param token and checks if a corresponding session exists.
 * If the token checks out and a session is found, then returns the associated
 * user; otherwise throws AuthenticationError
 */
export const check = async (token: string): Promise<User> => {
  const { id } = <{ id: number }>jwt.verify(token, SECRET_KEY)
  const session = await Session.findByPk(token)
  const user = await session?.getUser()
  if (!user || user.id !== id) {
    throw new AuthenticationError()
  }
  return user
}

/**
 * Creates and returns a new session for the given @param user
 * Removes any and all previous sessions, such that the newly created session
 * is the only existing one.
 */
export const create = async (user: User): Promise<Session> => {
  const { id, name, username } = user
  const token = jwt.sign({ id, name, username }, SECRET_KEY)
  await reset(user)
  return await Session.create({ token, userId: id })
}

/**
 * Removes all sessions associated with the given @param user
 */
export const reset = async (user: User): Promise<void> => {
  const sessions = await Session.findAll({
    where: {
      userId: user.id
    }
  })
  await Promise.all(sessions.map(session => session.destroy()))
}
