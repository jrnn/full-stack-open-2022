import cors from "cors"
import express from "express"
import { errorHandler } from "../errors"
import { authorsRouter, blogsRouter, loginRouter, readingsRouter, usersRouter } from "../routes"

export const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/authors", authorsRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/login", loginRouter)
app.use("/api/readinglists", readingsRouter)
app.use("/api/users", usersRouter)
app.get("/api/ping", (_, response) => response.status(200).send("pong"))

app.use(errorHandler)
