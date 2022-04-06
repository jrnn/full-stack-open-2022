import express from "express"
import { persons } from "./persons"

const app = express()
const port = 3001
const rootUri = "/api/persons"

app.get(rootUri, (_, response) => {
  response.json(persons)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
