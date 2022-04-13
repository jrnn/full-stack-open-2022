import { api } from "../jest.setup"
import { BlogModel } from "../../src/models/blog"
import { BLOGS_ROOT_URI, countBlogsInDb, initDb } from "./helper"

beforeEach(async () => {
  await initDb()
})

describe(`When GET ${BLOGS_ROOT_URI}`, () => {
  describe("Given no blogs in database", () => {
    it("Then returns an empty array", async () => {
      await BlogModel.deleteMany({})
      const blogs = await get()
      expect(blogs).toEqual([])
    })
  })

  describe("Given existing blogs in database", () => {
    it("Then returns all those blogs", async () => {
      const blogCount = await countBlogsInDb()
      const blogs = await get()
      expect(blogs).toHaveLength(blogCount)
    })

    describe("And", () => {
      it("identifies each blog with an 'id' property", async () => {
        const blogs = await get()
        blogs.map(blog => expect(blog["id"]).toBeDefined())
      })

      it("does not identify any blog with an '_id' property", async () => {
        const blogs = await get()
        blogs.map(blog => expect(blog["_id"]).toBeUndefined())
      })
    })
  })
})

const get = async (): Promise<Array<Record<string, unknown>>> => {
  const response = await api
    .get(BLOGS_ROOT_URI)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  return response.body
}
