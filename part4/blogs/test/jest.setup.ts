import { MODE } from "../src/config"
import app from "../src/app"
import { db } from "../src/config"
import supertest from "supertest"

if (MODE !== "test") {
  console.error("Tests must be run in test mode!")
  process.exit(1)
}

export const api = supertest(app)

beforeAll(async () => await db.connect("dummy"))

afterAll(async () => await db.disconnect())
