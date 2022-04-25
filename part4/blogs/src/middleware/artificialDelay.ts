import { RequestHandler } from "express"

const delay = (millis: number) =>
  new Promise(resolve => setTimeout(resolve, millis))

/**
 * Adds an entirely unnecessary 1-second delay to response times. Very cheesy!
 * Should only be used in development for mimicking a slow API.
 */
const artificialDelay: RequestHandler = (_, __, next) => {
  return delay(1000).then(next)
}

export default artificialDelay
