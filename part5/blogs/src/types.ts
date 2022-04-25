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
  user: Omit<UserEntity, "blogs">
  comments: Array<string>
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface Maybe<T> {
  isEmpty: () => boolean
  isPresent: () => boolean
  orElseThrow: () => T
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
  blogs: Array<BlogEntity>
}
