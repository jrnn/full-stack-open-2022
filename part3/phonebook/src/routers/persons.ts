import { Response, Router } from "express"
import { PersonModel } from "../models/person"
import { Person, TypedRequest } from "../types"

const errorResponse = (response: Response, status: number, message: string) => {
  return response
    .status(status)
    .json({ error: message })
}

const router = Router()

router.get("/", async (_, response) => {
  const persons = await PersonModel.find({}).exec()
  return response.json(persons)
})

router.get("/:id", async (request, response) => {
  const { id } = request.params
  const person = await PersonModel.findById(id).exec()

  return !!person
    ? response.json(person)
    : errorResponse(response, 404, `no person found with id ${id}`)
})

router.post("/", async (request: TypedRequest<Partial<Person>>, response) => {
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

router.delete("/:id", async (request, response) => {
  const { id } = request.params
  const person = await PersonModel.findByIdAndDelete(id).exec()

  return !!person
    ? response.status(204).end()
    : errorResponse(response, 404, `no person found with id ${id}`)
})

export default router
