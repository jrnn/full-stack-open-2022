import { Request } from "express"

export interface TypedRequest<T> extends Request {
  body: T
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
