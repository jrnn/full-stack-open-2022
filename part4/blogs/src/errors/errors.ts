import { Request, RequestHandler, Response } from "express"

export class AuthenticationError extends Error {
  constructor() {
    super("invalid username or password")
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends Error {
  constructor() {
    super("I know who you are, but you're not allowed to do that")
    this.name = "AuthorizationError"
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

/**
 * Catches any error thrown from the given request handler, and passes it on to
 * next(). In other words, a homebrew alternative to express-async-errors.
 */
export const throwsError = (throwingHandler: (req: Request, res: Response) => Promise<unknown>): RequestHandler => {
  return (request, response, next) => {
    return throwingHandler(request, response).catch(next)
  }
}
