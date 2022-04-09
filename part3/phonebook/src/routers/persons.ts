import { Request, RequestHandler, Response, Router } from "express"
import { NotFoundError } from "../errors/errors"
import { PersonModel } from "../models/person"
import { Person, TypedRequest } from "../types"

const throwsError = (wrappedHandler: (req: Request, res: Response) => Promise<unknown>): RequestHandler => {
  return (request, response, next) => {
    return wrappedHandler(request, response).catch(next)
  }
}

const router = Router()
const updateOpts = { new: true, runValidators: true }

router.get("/", throwsError(async (_, response) => {
  const persons = await PersonModel.find({}).exec()
  return response.status(200).json(persons)
}))

router.get("/:id", throwsError(async (request, response) => {
  const { id } = request.params
  const person = await PersonModel.findById(id).exec()

  if (!person) {
    throw new NotFoundError(`No person found with the given id '${id}'`)
  }
  return response.status(200).json(person)
}))

router.post("/", throwsError(async (request: TypedRequest<Person>, response) => {
  const { name, phone } = request.body
  const person = await new PersonModel({ name, phone }).save()
  return response.status(201).json(person)
}))

router.put("/:id", throwsError(async (request: TypedRequest<Person>, response) => {
  const { id } = request.params
  const person = await PersonModel.findByIdAndUpdate(id, request.body, updateOpts)

  if (!person) {
    throw new NotFoundError(`No person found with the given id '${id}'`)
  }
  return response.status(200).json(person)
}))

router.delete("/:id", throwsError(async (request, response) => {
  const { id } = request.params
  const person = await PersonModel.findByIdAndDelete(id).exec()

  if (!person) {
    throw new NotFoundError(`No person found with the given id '${id}'`)
  }
  return response.status(204).end()
}))

export default router
