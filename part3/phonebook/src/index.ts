import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import { IncomingMessageWithBody } from "./types"
import db from "./db"
import infoRouter from "./routers/info"
import personRouter from "./routers/persons"

dotenv.config()

const PORT = process.env["PORT"] || "3001"
const DB_URI = process.env["DB_URI"] || ""
const ENVIRONMENT = process.env["NODE_ENV"] || "development"

const app = express()

morgan.token<IncomingMessageWithBody<unknown>>("body", ({ body, method }) => {
  return method === "POST"
    ? JSON.stringify(body || {})
    : " "
})

app.use(cors())
app.use(express.static("static"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.use("/info", infoRouter)
app.use("/api/persons", personRouter)

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT} in ${ENVIRONMENT} mode`)
  db.connect(DB_URI)
})
  .on("close", () => {
    console.log("Now closing server and connection to database")
    db.disconnect()
  })
