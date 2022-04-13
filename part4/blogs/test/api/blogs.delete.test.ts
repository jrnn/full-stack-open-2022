import { UserDocument, UserModel } from "../../src/models/user"
import { api } from "../jest.setup"
import { BLOGS_ROOT_URI, deleteRandomBlogInDb, getBlogsInDb, getInvalidToken, getRandomBlogInDb, getValidToken, initDb } from "./helper"

beforeEach(async () => {
  await initDb()
})

describe(`When DELETE ${BLOGS_ROOT_URI}/:id`, () => {
  describe("Given no authorization token", () => {
    it("Then returns 401 and no blog is deleted", async () => {
      const { id } = await getRandomBlogInDb()
      await deleteAndExpectErrorWithoutChangingDb(id, "", 401)
    })
  })

  describe("Given an invalid authorization token", () => {
    it("Then returns 401 and no blog is deleted", async () => {
      const { id } = await getRandomBlogInDb()
      const { token } = await getInvalidToken()
      await deleteAndExpectErrorWithoutChangingDb(id, token, 401)
    })
  })

  describe("Given a valid authorization token", () => {
    describe("Given a malformed id", () => {
      it("Then returns 400 and no blog is deleted", async () => {
        const { token } = await getValidToken()
        await deleteAndExpectErrorWithoutChangingDb("this_is_not_a_valid_mongodb_object_id", token, 400)
      })
    })

    describe("Given no blog is found with the id", () => {
      it("Then returns 404 and no blog is deleted", async () => {
        const { token } = await getValidToken()
        const id = await deleteRandomBlogInDb()
        await deleteAndExpectErrorWithoutChangingDb(id, token, 404)
      })
    })

    describe("Given a blog is found with the id", () => {
      describe("And that blog belongs to the user identified by the token", () => {
        it("Then that blog is deleted", async () => {
          const { id, user } = await getRandomBlogInDb()
          const { token } = await getValidToken(user?.toString())
          const otherBlogsBefore = await getBlogsInDb({ _id: { $ne: id }})
          await _delete(id, token, 204)
          const blogsAfter = await getBlogsInDb()
          expect(otherBlogsBefore).toEqual(blogsAfter)
        })
      })

      describe("And that blog does not belong to the user identified by the token", () => {
        it("Then returns 403 and no blog is deleted", async () => {
          const { id, user } = await getRandomBlogInDb()
          const someOtherUser = await UserModel.findOne({ _id: { $ne: user }}) as UserDocument
          const { token } = await getValidToken(someOtherUser._id.toString())
          await deleteAndExpectErrorWithoutChangingDb(id, token, 403)
        })
      })
    })
  })
})

const _delete = async (id: string, token: string, status: number): Promise<void> => {
  await api
    .delete(`${BLOGS_ROOT_URI}/${id}`)
    .set("authorization", `bearer ${token}`)
    .expect(status)
}

const deleteAndExpectErrorWithoutChangingDb = async (id: string, token: string, status: number): Promise<void> => {
  const blogsBefore = await getBlogsInDb()
  await _delete(id, token, status)
  const blogsAfter = await getBlogsInDb()
  expect(blogsBefore).toEqual(blogsAfter)
}
