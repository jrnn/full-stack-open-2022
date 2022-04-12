import { api } from "../jest.setup"
import { BlogDocument, BlogModel } from "../../src/models/blog"
import { blogs as initialBlogs } from "../testblogs"

const rootUri = "/api/blogs"

beforeEach(async () => {
  await BlogModel.deleteMany({})
})

describe(`When GET ${rootUri}`, () => {
  describe("Given no blogs in database", () => {
    it("Then returns an empty array", async () => {
      const blogs = await get()
      expect(blogs).toEqual([])
    })
  })

  describe("Given existing blogs in database", () => {
    beforeEach(async () => {
      await Promise.all(initialBlogs.map(blog => new BlogModel(blog).save()))
    })

    it("Then returns all those blogs", async () => {
      const blogs = await get()
      expect(blogs).toHaveLength(initialBlogs.length)
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
    .get(rootUri)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  return response.body as Array<BlogDocument>
}
