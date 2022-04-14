import { RequestHandler } from "express"
import { TypedRequest } from "../types"
import logger from "./logger"

type Body = Record<string, unknown>

const hidePassword = (body: Body) => {
  if (Object.keys(body).includes("password")) {
    return {
      ...body,
      password: "**********"
    }
  }
  return body
}

const requestLogger: RequestHandler = (request: TypedRequest<Body>, _, next) => {
  const { method, path } = request
  if (method === "POST") {
    logger.info(`${method} ${path} ${JSON.stringify(hidePassword(request.body))}`)
  } else {
    logger.info(`${method} ${path}`)
  }
  return next()
}

export default requestLogger
