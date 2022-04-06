import express from "express"
import { persons } from "./persons"

const app = express()
const port = 3001
const rootUri = "/api/persons"

app.get("/info", (_, response) => {
  response.send(`<div>
    <p>Phonebook currently has ${persons.length} contacts.</p>
    <p>Server time: ${new Date().toISOString()}</p>
  </div>`)
})

app.get(rootUri, (_, response) => {
  response.json(persons)
})

app.get(`${rootUri}/:id`, (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (!person) {
    return response
      .status(404)
      .json({ error: `no person found with id ${id}` })
  }
  return response.json(person)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
