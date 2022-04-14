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

export interface UserAuth {
  token: string
  name: string
  username: string
}
