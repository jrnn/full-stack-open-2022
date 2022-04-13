import cors from "cors"
import express from "express"
import blogRouter from "./controllers/blogs"
import errorHandler from "./middleware/errorHandler"
import userRouter from "./controllers/users"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/users", userRouter)
app.use("/api/blogs", blogRouter)
app.use(errorHandler)

export default app
