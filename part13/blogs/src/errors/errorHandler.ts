import { ErrorRequestHandler } from "express"

const interpretError = (error: Error) => {
  const { name, message } = error
  switch (name) {
    case "NotFoundError":
      return {
        name,
        status: 404,
        message
      }
    case "SequelizeValidationError":
      return {
        name: "BadInputError",
        status: 400,
        message
      }
    default:
      return {
        name,
        status: 500,
        message
      }
  }
}

export const errorHandler: ErrorRequestHandler = (error, _, response, next) => {
  console.warn(error)
  if (error instanceof Error) {
    const { name, status, message } = interpretError(error)
    return response
      .status(status)
      .json({ error: name, message })
  }
  return next(error)
}
