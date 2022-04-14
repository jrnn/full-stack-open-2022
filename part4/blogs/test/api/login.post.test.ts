import { UserModel } from "../../src/models/user"
import { api } from "../jest.setup"
import { users as initialUsers } from "../testdata"
import { getRandomUserInDb, LOGIN_ROOT_URI } from "./helper"

beforeEach(async () => {
  await UserModel.deleteMany({})
  await Promise.all(initialUsers.map(user => new UserModel(user).save()))
})

describe(`When POST ${LOGIN_ROOT_URI}`, () => {
  describe("Given valid credentials", () => {
    describe("Then returns 200 and the response body", () => {
      it("contains a JSON web token", async () => {
        const { username } = await getRandomUserInDb()
        const { body } = await post(username, "qwerty123", 200)
        expect(body.token).toBeDefined()
      })

      it("contains the user's 'name'", async () => {
        const { name, username } = await getRandomUserInDb()
        const { body } = await post(username, "qwerty123", 200)
        expect(body.name).toEqual(name)
      })

      it("contains the user's 'username'", async () => {
        const { username } = await getRandomUserInDb()
        const { body } = await post(username, "qwerty123", 200)
        expect(body.username).toEqual(username)
      })
    })
  })

  describe("Given invalid 'username'", () => {
    it("Then returns 401 and no token", async () => {
      const { username } = await getRandomUserInDb()
      const { body } = await post(username.substring(1), "qwerty123", 401)
      expect(body.token).toBeUndefined()
    })
  })

  describe("Given invalid 'password'", () => {
    it("Then returns 401 and no token", async () => {
      const { username } = await getRandomUserInDb()
      const { body } = await post(username, "qwerty124", 401)
      expect(body.token).toBeUndefined()
    })
  })
})

const post = async (username: string, password: string, status: number) => {
  return await api
    .post(LOGIN_ROOT_URI)
    .send({ username, password })
    .expect(status)
    .expect("Content-Type", /application\/json/)
}
