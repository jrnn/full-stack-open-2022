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
    it("Then returns 200 and issues a JSON web token", async () => {
      const { username } = await getRandomUserInDb()
      const { body } = await api
        .post(LOGIN_ROOT_URI)
        .send({ username, password: "qwerty123" })
        .expect(200)
        .expect("Content-Type", /application\/json/)

      expect(body.token).toBeDefined()
    })
  })

  describe("Given invalid 'username'", () => {
    it("Then returns 401 and no token", async () => {
      const { username } = await getRandomUserInDb()
      const { body } = await api
        .post(LOGIN_ROOT_URI)
        .send({ username: username.substring(1), password: "qwerty123" })
        .expect(401)
        .expect("Content-Type", /application\/json/)

      expect(body.token).toBeUndefined()
    })
  })

  describe("Given invalid 'password'", () => {
    it("Then returns 401 and no token", async () => {
      const { username } = await getRandomUserInDb()
      const { body } = await api
        .post(LOGIN_ROOT_URI)
        .send({ username, password: "qwerty124" })
        .expect(401)
        .expect("Content-Type", /application\/json/)

      expect(body.token).toBeUndefined()
    })
  })
})
