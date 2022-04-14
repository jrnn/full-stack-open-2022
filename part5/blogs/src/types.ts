export interface BlogResponse {
  id: string
  title: string
  author: string
  url: string
  likes: number
}

export interface UserAuth {
  token: string
  name: string
  username: string
}
