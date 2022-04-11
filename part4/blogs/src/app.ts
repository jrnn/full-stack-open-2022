import cors from "cors"
import express from "express"
import blogRouter from "./controllers/blogs"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)

export default app
