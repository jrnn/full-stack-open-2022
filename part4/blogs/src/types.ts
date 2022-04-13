import { Request } from "express"

export interface RequestWithToken extends Request {
  token?: string
}

export interface TypedRequest<T> extends RequestWithToken {
  body: T
}
