import { api } from "../jest.setup"
import { UserDocument, UserRequest, UserResponse } from "../../src/models/user"
import { countUsersInDb, getRandomUserInDb, getUserInDb, getUsersInDb, initDb, USERS_ROOT_URI } from "./helper"

const newUser: UserRequest = {
  username: "boaty",
  name: "Boaty McBoatface",
  password: "qwerty123"
}

beforeEach(async () => {
  await initDb()
})

describe(`When POST ${USERS_ROOT_URI}`, () => {
  describe("Given a valid user", () => {
    it("Then adds a new user to database", async () => {
      await postAndExpectNewUserInDb(newUser)
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

  describe("Given 'username'", () => {
    it("is missing Then returns 400 without adding user to database", async () => {
      const { username, ...withoutUsername } = newUser
      await postAndExpectErrorWithoutNewUserInDb(withoutUsername)
    })

    it("is shorter than 3 characters Then returns 400 without adding user to database", async () => {
      const withShortUsername = { ...newUser, username: "bo" }
      await postAndExpectErrorWithoutNewUserInDb(withShortUsername)
    })

    it("is exactly 3 characters Then adds user to database", async () => {
      const withShortUsername = { ...newUser, username: "boa" }
      await postAndExpectNewUserInDb(withShortUsername)
    })

    it("is already in use Then returns 400 without adding user to database", async () => {
      const { username } = await getRandomUserInDb()
      const withReservedUsername = { ...newUser, username }
      await postAndExpectErrorWithoutNewUserInDb(withReservedUsername)
    })
  })

  describe("Given 'password'", () => {
    it("is missing Then returns 400 without adding user to database", async () => {
      const { password, ...withoutPassword } = newUser
      await postAndExpectErrorWithoutNewUserInDb(withoutPassword)
    })

    it("is shorter than 3 characters Then returns 400 without adding user to database", async () => {
      const withShortPassword = { ...newUser, password: "qw" }
      await postAndExpectErrorWithoutNewUserInDb(withShortPassword)
    })

    it("is exactly 3 characters Then adds user to database", async () => {
      const withShortPassword = { ...newUser, password: "qwe" }
      await postAndExpectNewUserInDb(withShortPassword)
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

const postAndExpectError = async (user: Partial<UserRequest>): Promise<void> => {
  await api
    .post(USERS_ROOT_URI)
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/)
}

const postAndGetFromDb = async (user: Partial<UserRequest>): Promise<UserDocument> => {
  const { id } = await postAndExpectOk(user)
  return await getUserInDb(id)
}

const postAndExpectNewUserInDb = async (user: Partial<UserRequest>): Promise<void> => {
  const userCountBefore = await countUsersInDb()
  await postAndExpectOk(user)
  const userCountAfter = await countUsersInDb()
  expect(userCountAfter).toEqual(userCountBefore + 1)
}

const postAndExpectErrorWithoutNewUserInDb = async (user: Partial<UserRequest>): Promise<void> => {
  const usersBefore = await getUsersInDb()
  await postAndExpectError(user)
  const usersAfter = await getUsersInDb()
  expect(usersBefore).toEqual(usersAfter)
}
