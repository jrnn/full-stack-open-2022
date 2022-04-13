import { RequestHandler } from "express"
import { RequestWithToken } from "../types"

const tokenExtractor: RequestHandler = (request: RequestWithToken, _, next) => {
  const auth = request.get("authorization")
  const token = auth && auth.trim().toLowerCase().startsWith("bearer ")
    ? auth.substring(7).trim()
    : ""

  request.token = token
  return next()
}

export default tokenExtractor
