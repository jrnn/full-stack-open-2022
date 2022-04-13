import { api } from "../jest.setup"
import { UserDocument, UserRequest, UserResponse } from "../../src/models/user"
import { countUsersInDb, getUserInDb, initUsers, USERS_ROOT_URI } from "./helper"

const newUser: UserRequest = {
  username: "boaty",
  name: "Boaty McBoatface",
  password: "letmein"
}

beforeEach(async () => {
  await initUsers()
})

describe(`When POST ${USERS_ROOT_URI}`, () => {
  describe("Given a valid user", () => {
    it("Then adds a new user to database", async () => {
      const userCountBefore = await countUsersInDb()
      await postAndExpectOk(newUser)
      const userCountAfter = await countUsersInDb()
      expect(userCountAfter).toEqual(userCountBefore + 1)
    })

    describe("And sets the new user's", () => {
      it("'username' to the given 'username'", async () => {
        const { username } = await postAndGetFromDb(newUser)
        expect(username).toEqual(newUser.username)
      })

      it("'name' to the given 'name'", async () => {
        const { name } = await postAndGetFromDb(newUser)
        expect(name).toEqual(newUser.name)
      })

      it("'pwHash' to something else than the given 'password'", async () => {
        const { pwHash } = await postAndGetFromDb(newUser)
        expect(pwHash).not.toEqual(newUser.password)
      })
    })
  })
})

const postAndExpectOk = async (user: Partial<UserRequest>): Promise<UserResponse> => {
  const response = await api
    .post(USERS_ROOT_URI)
    .send(user)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  return response.body as UserResponse
}

const postAndGetFromDb = async (user: Partial<UserRequest>): Promise<UserDocument> => {
  const { id } = await postAndExpectOk(user)
  return await getUserInDb(id)
}
