import express, { Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import { IncomingMessageWithBody, Person, TypedRequest } from "./types"
import { PersonModel } from "./models/person"
import { connectToDatabase, disconnectFromDatabase } from "./db"

dotenv.config()

const app = express()
const port = process.env["PORT"] || "3001"
const dbUri = process.env["DB_URI"] || ""
const rootUri = "/api/persons"

morgan.token<IncomingMessageWithBody<never>>("body", ({ body, method }) => {
  return method === "POST"
    ? JSON.stringify(body || {})
    : " "
})

app.use(cors())
app.use(express.static("static"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

const getAllPersons = (): Promise<Array<Person>> => {
  return PersonModel.find({}).exec()
}

const getPersonById = (id: string): Promise<Person | null> => {
  return PersonModel.findById(id).exec()
}

const errorResponse = (response: Response, status: number, message: string) => {
  return response
    .status(status)
    .json({ error: message })
}

app.get("/info", async (_, response) => {
  const persons = await getAllPersons()
  return response.send(`<div>
    <p>Phonebook currently has ${persons.length} contacts.</p>
    <p>Server time: ${new Date().toISOString()}</p>
  </div>`)
})

app.get(rootUri, async (_, response) => {
  const persons = await getAllPersons()
  return response.json(persons)
})

app.get(`${rootUri}/:id`, async (request, response) => {
  const { id } = request.params
  const person = await getPersonById(id)

  return !!person
    ? response.json(person)
    : errorResponse(response, 404, `no person found with id ${id}`)
})

app.post(rootUri, async (request: TypedRequest<Partial<Person>>, response) => {
  const { name, phone } = request.body
  if (!name || !name.trim()) {
    return errorResponse(response, 400, "name missing")
  }
  if (!phone || !phone.trim()) {
    return errorResponse(response, 400, "phone missing")
  }
  const newPerson = await new PersonModel({ name, phone }).save()
  return response
    .status(201)
    .json(newPerson)
})

app.listen(port, () => {
  console.log(`Server now listening on port ${port} in ${process.env["NODE_ENV"]} mode`)
  connectToDatabase(dbUri)
})
  .on("close", () => {
    console.log("Now closing server and connection to database")
    disconnectFromDatabase()
  })
