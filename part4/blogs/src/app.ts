import cors from "cors"
import express from "express"
import { MODE } from "./config"
import blogRouter from "./controllers/blogs"
import errorHandler from "./middleware/errorHandler"
import loginRouter from "./controllers/login"
import requestLogger from "./middleware/requestLogger"
import testingRouter from "./controllers/testing"
import tokenExtractor from "./middleware/tokenExtractor"
import userRouter from "./controllers/users"

const app = express()

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use(requestLogger)

app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)
app.use("/api/blogs", blogRouter)

if (MODE === "test") {
  app.use("/api/testing", testingRouter)
}

app.use(errorHandler)

export default app
