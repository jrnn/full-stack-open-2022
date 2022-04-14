export interface BlogDto {
  title: string
  author: string
  url: string
}

export interface BlogEntity {
  id: string
  title: string
  author: string
  url: string
  likes: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface NotificationType {
  message?: string
  type: "info" | "error" | "none"
}

export type NotifyDispatch = (message: string, type: "info" | "error") => void

export interface UserAuth {
  token: string
  name: string
  username: string
}
