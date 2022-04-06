import express from "express"
import { persons as initialPersons } from "./persons"
import { Person } from "./types"

let persons = [ ...initialPersons ]

const app = express()
const port = 3001
const rootUri = "/api/persons"

const getPersonById = (id: string | number): Person | undefined => {
  const numericId = Number(id)
  return persons.find(p => p.id === numericId)
}

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
  const { id } = request.params
  const person = getPersonById(id)

  if (!person) {
    return response
      .status(404)
      .json({ error: `no person found with id ${id}` })
  }
  return response.json(person)
})

app.delete(`${rootUri}/:id`, (request, response) => {
  const { id } = request.params
  const person = getPersonById(id)

  if (!person) {
    return response
      .status(404)
      .json({ error: `no person found with id ${id}` })
  }
  persons = persons.filter(p => p.id !== person.id)
  return response
    .status(204)
    .end()
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
