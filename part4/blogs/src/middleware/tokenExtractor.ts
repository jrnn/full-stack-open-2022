import { RequestHandler } from "express"
import { TypedRequest } from "../types"

const tokenExtractor: RequestHandler = (request: TypedRequest, _, next) => {
  const auth = request.get("authorization")
  const token = auth && auth.trim().toLowerCase().startsWith("bearer ")
    ? auth.substring(7).trim()
    : ""

  request.token = token
  return next()
}

export default tokenExtractor
