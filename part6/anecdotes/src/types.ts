export interface Anecdote {
  id: number
  content: string
  votes: number
}

export interface NotificationType {
  type: "info" | "error" | "none"
  message: string
}
