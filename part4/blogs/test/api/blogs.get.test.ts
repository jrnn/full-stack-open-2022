import { api } from "../jest.setup"
import { BlogDocument, BlogModel } from "../../src/models/blog"
import { BLOGS_ROOT_URI, countBlogsInDb, initBlogs } from "./helper"

beforeEach(async () => {
  await initBlogs()
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
        blogs.map(blog => expect(blog.id).toBeDefined())
      })
    })
  })
})

const get = async (): Promise<Array<BlogDocument>> => {
  const response = await api
    .get(BLOGS_ROOT_URI)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  return response.body as Array<BlogDocument>
}
