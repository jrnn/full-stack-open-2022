import { ErrorRequestHandler } from "express";

const interpretError = (name: string, message: string) => {
  switch (name) {
    case "CastError":
      return {
        status: 400,
        message: "The given id is not a valid MongoDB ObjectId"
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
  console.error(error)
  if (error instanceof Error) {
    const { name } = error
    const { status, message } = interpretError(name, error.message)
    return response
      .status(status)
      .json({ error: name, message })
  }
  return next(error)
}

export default errorHandler
