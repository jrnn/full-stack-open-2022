import { ErrorRequestHandler } from "express"
import { UniqueConstraintError, ValidationError, ValidationErrorItem } from "sequelize"

const interpretError = (error: Error) => {
  const { name, message } = error
  switch (name) {
    case "AuthenticationError": {
      return {
        name,
        status: 401,
        message
      }
    }
    case "AuthorizationError": {
      return {
        name,
        status: 403,
        message: "you're not allowed to do that"
      }
    }
    case "JsonWebTokenError": {
      return {
        name: "AuthenticationError",
        status: 401,
        message: "invalid or missing token"
      }
    }
    case "NotFoundError":
      return {
        name,
        status: 404,
        message
      }
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      return {
        name: "BadInputError",
        status: 400,
        message: interpretSequelizeError(error)
      }
    default:
      return {
        name,
        status: 500,
        message
      }
  }
}

const interpretSequelizeError = (error: Error): string => {
  return error instanceof UniqueConstraintError || error instanceof ValidationError
    ? error.errors.map(interpretValidationErrorItem).join("; ")
    : error.message
}

const interpretValidationErrorItem = (item: ValidationErrorItem): string => {
  const { message, path, validatorKey } = item
  switch (validatorKey) {
    case "is_null":
      return `'${path}' cannot be empty`
    case "isEmail":
      return `'${path}' must be a valid email address`
    case "isInt":
      return `'${path}' must be an integer`
    case "not_unique":
      return `the given '${path}' is already in use`
    default:
      return message
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
