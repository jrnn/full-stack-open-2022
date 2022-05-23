import cors from "cors"
import express from "express"
import path from "path"
import { MODE } from "./config"
import artificialDelay from "./middleware/artificialDelay"
import blogRouter from "./controllers/blogs"
import errorHandler from "./middleware/errorHandler"
import loginRouter from "./controllers/login"
import requestLogger from "./middleware/requestLogger"
import testingRouter from "./controllers/testing"
import tokenExtractor from "./middleware/tokenExtractor"
import userRouter from "./controllers/users"

const app = express()

app.use(cors())
app.use(express.static(path.resolve(__dirname, "..", "static")))
app.use(express.json())
app.use(tokenExtractor)
app.use(requestLogger)

if (MODE === "development") {
  app.use(artificialDelay)
}

app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)
app.use("/api/blogs", blogRouter)
app.get("/api/ping", (_, response) => response.send("pong"))

if (MODE === "test") {
  app.use("/api/testing", testingRouter)
}

app.use(errorHandler)

export default app
