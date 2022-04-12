import { api } from "../jest.setup"
import { BlogDocument, BlogModel } from "../../src/models/blog"
import { blogs as initialBlogs } from "../testblogs"

const rootUri = "/api/blogs"

beforeEach(async () => {
  await BlogModel.deleteMany({})
  await Promise.all(initialBlogs.map(blog => new BlogModel(blog).save()))
})

describe(`When DELETE ${rootUri}/:id`, () => {
  describe("Given a malformed id", () => {
    it("Then returns 400 and no blog is deleted", async () => {
      const blogCountBefore = await BlogModel.count({})
      await api
        .delete(`${rootUri}/this_is_not_a_valid_mongodb_object_id`)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const blogCountAfter = await BlogModel.count({})
      expect(blogCountBefore).toEqual(blogCountAfter)
    })
  })

  describe("Given no blog is found with the id", () => {
    it("Then returns 404 and no blog is deleted", async () => {
      const { id } = await getRandomBlogInDb()
      await BlogModel.findByIdAndDelete(id)

      const blogCountBefore = await BlogModel.count({})
      await api
        .delete(`${rootUri}/${id}`)
        .expect(404)
        .expect("Content-Type", /application\/json/)

      const blogCountAfter = await BlogModel.count({})
      expect(blogCountBefore).toEqual(blogCountAfter)
    })
  })

  describe("Given a blog is found with the id", () => {
    it("Then that blog is deleted", async () => {
      const { id } = await getRandomBlogInDb()
      const blogCountBefore = await BlogModel.count({})
      await api
        .delete(`${rootUri}/${id}`)
        .expect(204)

      const blogsAfter = await BlogModel.find({})
      expect(blogsAfter).toHaveLength(blogCountBefore - 1)
      expect(blogsAfter.map(blog => blog.id)).not.toContain(id)
    })
  })
})

const getRandomBlogInDb = async (): Promise<BlogDocument> => {
  const blogs = await BlogModel.find({})
  return blogs[Math.floor(Math.random() * blogs.length)] as BlogDocument
}
