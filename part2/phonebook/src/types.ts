export interface Contact {
  id: number
  name: string
  phone: string
}

export interface Message {
  text?: string
  type: "success" | "error" | "none"
}
