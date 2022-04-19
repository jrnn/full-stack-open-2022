interface Logger {
  error: (...args: unknown[]) => void
  info: (...args: unknown[]) => void
}

const prefix = "[blogs-api]"
const now = () => new Date().toISOString()

const consoleLogger: Logger = {
  error: (...args) => {
    console.error(prefix, now(), "--", ...args)
  },
  info: (...args) => {
    console.log(prefix, now(), "--", ...args)
  }
}

const quietLogger: Logger = {
  error: () => {
    // do nothing
  },
  info: () => {
    // do nothing
  }
}

const logger: Logger = process.env["NODE_ENV"] === "test"
  ? quietLogger
  : consoleLogger

export default logger
