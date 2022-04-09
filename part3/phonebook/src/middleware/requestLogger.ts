import morgan from "morgan"
import { IncomingMessageWithBody } from "../types"

const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms :body")

morgan.token<IncomingMessageWithBody<unknown>>("body", ({ body, method }) => {
  return method === "POST"
    ? JSON.stringify(body || {})
    : " "
})

export default requestLogger
