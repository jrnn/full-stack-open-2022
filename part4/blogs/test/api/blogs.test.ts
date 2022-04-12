import { api } from "../jest.setup"
import { BlogDocument, BlogModel } from "../../src/models/blog"
import { blogs as initialBlogs } from "../testblogs"

const rootUri = "/api/blogs"

beforeEach(async () => {
  await BlogModel.deleteMany({})
  await Promise.all(initialBlogs.map(blog => new BlogModel(blog).save()))
})

describe(`When GET ${rootUri}`, () => {
  it("Then returns all blogs in database", async () => {
    const blogs = await get()
    expect(blogs).toHaveLength(initialBlogs.length)
  })
  it("Then identifies each blog with 'id' attribute", async () => {
    const blogs = await get()
    console.log(blogs)
    blogs.map(blog => expect(blog.id).toBeDefined())
  })
  const get = async (): Promise<Array<BlogDocument>> => {
    const response = await api
      .get(rootUri)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    return response.body as Array<BlogDocument>
  }
})
