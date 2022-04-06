import { Request } from "express"
import { IncomingMessage } from "http"

export interface TypedRequest<T> extends Request {
  body: T
}

export interface IncomingMessageWithBody<T> extends IncomingMessage {
  body?: T
}

export interface PersonDto {
  name?: string
  phone?: string
}

export interface Person {
  id: number
  name: string
  phone: string
}
