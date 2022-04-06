import express, { json, Response } from "express"
import morgan from "morgan"
import { persons as initialPersons } from "./persons"
import { Person, PersonDto, TypedRequest } from "./types"

let persons = [ ...initialPersons ]

const app = express()
const port = 3001
const rootUri = "/api/persons"

app.use(json())
app.use(morgan("tiny"))

const getPersonById = (id: string | number): Person | undefined => {
  const numericId = Number(id)
  return persons.find(p => p.id === numericId)
}

const getPersonByName = (name: string): Person | undefined => {
  const trimmedName = name.trim()
  return persons.find(p => p.name === trimmedName)
}

const errorResponse = (response: Response, status: number, message: string) => {
  return response
    .status(status)
    .json({ error: message })
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

  return !!person
    ? response.json(person)
    : errorResponse(response, 404, `no person found with id ${id}`)
})

app.post(rootUri, (request: TypedRequest<PersonDto>, response) => {
  const { name, phone } = request.body
  if (!name || !name.trim()) {
    return errorResponse(response, 400, "name missing")
  }
  if (!phone || !phone.trim()) {
    return errorResponse(response, 400, "phone missing")
  }
  if (getPersonByName(name)) {
    return errorResponse(response, 400, "name must be unique")
  }
  const newPerson: Person = {
    name: name.trim(),
    phone: phone.trim(),
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  }
  persons.push(newPerson)
  return response
    .status(201)
    .json(newPerson)
})

app.delete(`${rootUri}/:id`, (request, response) => {
  const { id } = request.params
  const person = getPersonById(id)

  if (!person) {
    return errorResponse(response, 404, `no person found with id ${id}`)
  }
  persons = persons.filter(p => p.id !== person.id)
  return response
    .status(204)
    .end()
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
