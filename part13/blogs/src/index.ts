import cors from "cors"
import express from "express"

const PORT = process.env["PORT"] || 3001

const app = express()

app.use(cors())

app.get("/api/ping", (_, response) => response.status(200).send("pong"))

app.listen(PORT, () => {
  console.log(`Now running on port ${PORT}`)
})
