import { Request, RequestHandler, Response } from "express"

export const throwsError = (throwingHandler: (req: Request, res: Response) => Promise<unknown>): RequestHandler => {
  return (request, response, next) => {
    return throwingHandler(request, response).catch(next)
  }
}

export { errorHandler } from "./errorHandler"
export { AuthenticationError, AuthorizationError, NotFoundError } from "./errors"
