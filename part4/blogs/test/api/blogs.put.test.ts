import { api } from "../jest.setup"
import { Blog, BlogDocument } from "../../src/models/blog"
import { BLOGS_ROOT_URI, deleteRandomBlogInDb, getBlogInDb, getBlogsInDb, getRandomBlogInDb, initBlogs } from "./helper"

const newBlog: Blog = {
  title: "All About Plumbuses",
  author: "Plumbusy McPlumbusface",
  url: "http://all.about.plumb.us",
  likes: 2
}

beforeEach(async () => {
  await initBlogs()
})

describe(`When PUT ${BLOGS_ROOT_URI}/:id`, () => {
  describe("Given a malformed id", () => {
    it("Then returns 400 and no blog is updated", async () => {
      const blogsBefore = await getBlogsInDb()
      await api
        .put(`${BLOGS_ROOT_URI}/this_is_not_a_valid_mongodb_object_id`)
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const blogsAfter = await getBlogsInDb()
      expect(blogsBefore).toEqual(blogsAfter)
    })
  })

  describe("Given no blog is found with the id", () => {
    it("Then returns 404 and no blog is updated", async () => {
      const id = await deleteRandomBlogInDb()
      const blogsBefore = await getBlogsInDb()
      await api
        .put(`${BLOGS_ROOT_URI}/${id}`)
        .send(newBlog)
        .expect(404)
        .expect("Content-Type", /application\/json/)

      const blogsAfter = await getBlogsInDb()
      expect(blogsBefore).toEqual(blogsAfter)
    })
  })

  describe("Given a blog is found with the id", () => {
    it("Then updates only that blog", async () => {
      const originalBlog = await getRandomBlogInDb()
      const { id } = originalBlog
      const otherBlogsBefore = await getBlogsInDb({ _id: { $ne: id }})
      await putAndExpectOk(id, newBlog)

      const updatedBlog = await getBlogInDb(id)
      const otherBlogsAfter = await getBlogsInDb({ _id: { $ne: id }})
      expect(originalBlog).not.toEqual(updatedBlog)
      expect(otherBlogsBefore).toEqual(otherBlogsAfter)
    })

    describe("And sets its", () => {
      const { title, author, url, likes } = newBlog

      it("'title' to the given 'title'", async () => {
        const { id } = await getRandomBlogInDb()
        const updatedBlog = await putAndGetFromDb(id, { title })
        expect(updatedBlog.title).toEqual(title)
      })

      it("'author' to the given 'author'", async () => {
        const { id } = await getRandomBlogInDb()
        const updatedBlog = await putAndGetFromDb(id, { author })
        expect(updatedBlog.author).toEqual(author)
      })

      it("'url' to the given 'url'", async () => {
        const { id } = await getRandomBlogInDb()
        const updatedBlog = await putAndGetFromDb(id, { url })
        expect(updatedBlog.url).toEqual(url)
      })

      it("'likes' to the given 'likes'", async () => {
        const { id } = await getRandomBlogInDb()
        const updatedBlog = await putAndGetFromDb(id, { likes })
        expect(updatedBlog.likes).toEqual(likes)
      })
    })
  })
})

const putAndExpectOk = async (id: string, blog: Partial<Blog>): Promise<void> => {
  await api
    .put(`${BLOGS_ROOT_URI}/${id}`)
    .send(blog)
    .expect(200)
    .expect("Content-Type", /application\/json/)
}

const putAndGetFromDb = async (id: string, blog: Partial<Blog>): Promise<BlogDocument> => {
  await putAndExpectOk(id, blog)
  return await getBlogInDb(id)
}
