import { api } from "../jest.setup"
import { BlogModel } from "../../src/models/blog"
import { blogs } from "../testblogs"

const rootUri = "/api/blogs"

beforeEach(async () => {
  await BlogModel.deleteMany({})
  await Promise.all(blogs.map(blog => new BlogModel(blog).save()))
})

describe(`When GET ${rootUri}`, () => {
  it("Then returns all blogs in database", async () => {
    const { body } = await api
      .get(rootUri)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(body).toHaveLength(blogs.length)
  })
})
