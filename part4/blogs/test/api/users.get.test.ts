import { api } from "../jest.setup"
import { UserModel } from "../../src/models/user"
import { countUsersInDb, initDb, USERS_ROOT_URI } from "./helper"

beforeEach(async () => {
  await initDb()
})

describe(`When GET ${USERS_ROOT_URI}`, () => {
  describe("Given no users in database", () => {
    it("Then returns an empty array", async () => {
      await UserModel.deleteMany({})
      const users = await get()
      expect(users).toEqual([])
    })
  })

  describe("Given existing users in database", () => {
    it("Then returns all those users", async () => {
      const userCount = await countUsersInDb()
      const users = await get()
      expect(users).toHaveLength(userCount)
    })

    describe("And", () => {
      it("identifies each user with an 'id' property", async () => {
        const users = await get()
        users.map(user => expect(user["id"]).toBeDefined())
      })

      it("does not identify any user with an '_id' property", async () => {
        const users = await get()
        users.map(user => expect(user["_id"]).toBeUndefined())
      })

      it("does not include 'password' property for any user", async () => {
        const users = await get()
        users.map(user => expect(user["password"]).toBeUndefined())
      })

      it("does not include 'pwHash' property for any user", async () => {
        const users = await get()
        users.map(user => expect(user["pwHash"]).toBeUndefined())
      })
    })
  })
})

const get = async (): Promise<Array<Record<string, unknown>>> => {
  const response = await api
    .get(USERS_ROOT_URI)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  return response.body
}
