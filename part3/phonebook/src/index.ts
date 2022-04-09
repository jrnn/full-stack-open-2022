import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import db from "./db"
import infoRouter from "./routers/info"
import personRouter from "./routers/persons"
import requestLogger from "./middleware/requestLogger"
import errorHandler from "./middleware/errorHandler"

dotenv.config()

const PORT = process.env["PORT"] || "3001"
const DB_URI = process.env["DB_URI"] || ""
const ENVIRONMENT = process.env["NODE_ENV"] || "development"

const app = express()

app.use(cors())
app.use(express.static("static"))
app.use(express.json())
app.use(requestLogger)

app.use("/info", infoRouter)
app.use("/api/persons", personRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT} in ${ENVIRONMENT} mode`)
  db.connect(DB_URI)
})
  .on("close", () => {
    console.log("Now closing server and connection to database")
    db.disconnect()
  })
