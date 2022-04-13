import { ErrorRequestHandler } from "express"
import logger from "./logger"

const translateError = (error: Error) => {
  const { name, message } = error
  switch (name) {
    case "AuthenticationError":
      return {
        status: 401,
        message
      }
    case "AuthorizationError":
      return {
        status: 403,
        message
      }
    case "CastError":
      return {
        status: 400,
        message: "The given id is not a valid MongoDB ObjectId"
      }
    case "JsonWebTokenError":
      return {
        status: 401,
        message: "invalid or missing JSON web token"
      }
    case "NotFoundError":
      return {
        status: 404,
        message
      }
    case "ValidationError":
      return {
        status: 400,
        message
      }
    default:
      return {
        status: 500,
        message
      }
  }
}

const errorHandler: ErrorRequestHandler = (error, _, response, next) => {
  logger.error(error)
  if (error instanceof Error) {
    const { status, message } = translateError(error)
    return response
      .status(status)
      .json({ error: error.name, message })
  }
  return next(error)
}

export default errorHandler
