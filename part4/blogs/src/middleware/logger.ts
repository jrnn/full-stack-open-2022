import { MODE } from "../config"

interface Logger {
  error: (...args: unknown[]) => void
  info: (...args: unknown[]) => void
}

const consoleLogger: Logger = {
  error: (...args) => {
    console.error(...args)
  },
  info: (...args) => {
    console.log(...args)
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

const logger: Logger = MODE === "test"
  ? quietLogger
  : consoleLogger

export default logger
