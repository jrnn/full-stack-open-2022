import { api } from "../jest.setup"
import { BLOGS_ROOT_URI, deleteRandomBlogInDb, getBlogsInDb, getRandomBlogInDb, initBlogs } from "./helper"

beforeEach(async () => {
  await initBlogs()
})

describe(`When DELETE ${BLOGS_ROOT_URI}/:id`, () => {
  describe("Given a malformed id", () => {
    it("Then returns 400 and no blog is deleted", async () => {
      const blogsBefore = await getBlogsInDb()
      await api
        .delete(`${BLOGS_ROOT_URI}/this_is_not_a_valid_mongodb_object_id`)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const blogsAfter = await getBlogsInDb()
      expect(blogsBefore).toEqual(blogsAfter)
    })
  })

  describe("Given no blog is found with the id", () => {
    it("Then returns 404 and no blog is deleted", async () => {
      const id = await deleteRandomBlogInDb()
      const blogsBefore = await getBlogsInDb()
      await api
        .delete(`${BLOGS_ROOT_URI}/${id}`)
        .expect(404)
        .expect("Content-Type", /application\/json/)

      const blogsAfter = await getBlogsInDb()
      expect(blogsBefore).toEqual(blogsAfter)
    })
  })

  describe("Given a blog is found with the id", () => {
    it("Then that blog is deleted", async () => {
      const { id } = await getRandomBlogInDb()
      const otherBlogsBefore = await getBlogsInDb({ _id: { $ne: id }})
      await api
        .delete(`${BLOGS_ROOT_URI}/${id}`)
        .expect(204)

      const blogsAfter = await getBlogsInDb()
      expect(otherBlogsBefore).toEqual(blogsAfter)
    })
  })
})
