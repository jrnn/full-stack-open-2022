import { ErrorRequestHandler } from "express"
import logger from "./logger"

const errorHandler: ErrorRequestHandler = (error, _, response, next) => {
  logger.error(error)
  if (error instanceof Error) {
    const { name, message } = error
    if (name === "ValidationError") {
      return response.status(400).json({ error: name, message })
    }
  }
  return next(error)
}

export default errorHandler
