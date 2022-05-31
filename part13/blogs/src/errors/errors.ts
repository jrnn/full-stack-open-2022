export class AuthenticationError extends Error {
  constructor() {
    super("invalid username or password")
    this.name = "AuthenticationError"
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}
