import { Router } from "express"
import { PersonModel } from "../models/person"

const router = Router()

router.get("/", async (_, response) => {
  const persons = await PersonModel.find({}).exec()
  return response.send(`
    <div>
      <p>Phonebook currently has ${persons.length} contacts.</p>
      <p>Server time: ${new Date().toISOString()}</p>
    </div>
  `)
})

export default router
