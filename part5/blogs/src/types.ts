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
  user: UserEntity
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface UserAuth {
  token: string
  name: string
  username: string
}

export interface UserEntity {
  id: string
  name: string
  username: string
}
