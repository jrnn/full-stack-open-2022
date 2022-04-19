import { Request } from "express"
import { UserDocument } from "./models/user"

export interface DatabaseConnection {
  connect: (uri: string) => Promise<void>
  disconnect: () => Promise<void>
}

export interface TypedRequest<T = unknown> extends Request {
  body: T
  token?: string
  user?: UserDocument
}
