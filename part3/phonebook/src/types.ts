import { Request } from "express"
import { IncomingMessage } from "http"

export interface TypedRequest<T> extends Request {
  body: T
}

export interface IncomingMessageWithBody<T> extends IncomingMessage {
  body?: T
}

export interface Person {
  id: string
  name: string
  phone: string
}
