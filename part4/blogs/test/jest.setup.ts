import { MODE } from "../src/config"
import { MongoMemoryServer } from "mongodb-memory-server"
import app from "../src/app"
import db from "../src/db"
import supertest from "supertest"

if (MODE !== "test") {
  console.error("Tests must be run in test mode!")
  process.exit(1)
}

export const api = supertest(app)

let dbServer: MongoMemoryServer

beforeAll(async () => {
  dbServer = await MongoMemoryServer.create()
  await db.connect(dbServer.getUri())
})

afterAll(async () => {
  await db.disconnect()
  await dbServer.stop()
})
