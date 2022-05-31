import { Request } from "express"
import { Blog, User } from "./models"

export interface TypedRequest<T = unknown> extends Request {
  blog?: Blog
  body: T
  user?: User
}
