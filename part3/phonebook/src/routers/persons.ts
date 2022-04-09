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

router.get("/", throwsError(async (_, response) => {
  const persons = await PersonModel.find({}).exec()
  return response.json(persons)
}))

router.get("/:id", throwsError(async (request, response) => {
  const { id } = request.params
  const person = await PersonModel.findById(id).exec()

  if (!person) {
    throw new NotFoundError(`No person found with the given id '${id}'`)
  }
  return response.json(person)
}))

router.post("/", throwsError(async (request: TypedRequest<Partial<Person>>, response) => {
  const { name, phone } = request.body
  const person = await new PersonModel({ name, phone }).save()
  return response
    .status(201)
    .json(person)
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
