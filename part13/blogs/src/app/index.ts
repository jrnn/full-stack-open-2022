import cors from "cors"
import express from "express"
import { blogsRouter } from "../routes"

export const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.get("/api/ping", (_, response) => response.status(200).send("pong"))
