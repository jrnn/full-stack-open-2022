export interface Author {
  id: string
  name: string
  born?: number
  bookCount: number
}

export interface Book {
  id: string
  title: string
  author: string
  published: number
}
