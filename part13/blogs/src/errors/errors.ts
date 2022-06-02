export class AuthenticationError extends Error {
  constructor() {
    super("invalid username or password")
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends Error {
  constructor() {
    super("I know who you are, but you're not allowed to do that")
    this.name = "AuthorizationError"
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}

export class UserDisabledError extends Error {
  constructor() {
    super("the user account has been disabled")
    this.name = "UserDisabledError"
  }
}
