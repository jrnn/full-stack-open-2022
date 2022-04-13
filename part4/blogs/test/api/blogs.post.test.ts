import { api } from "../jest.setup"
import { Blog, BlogDocument } from "../../src/models/blog"
import { BLOGS_ROOT_URI, countBlogsInDb, getBlogInDb, getBlogsInDb, initBlogs } from "./helper"

const newBlog: Blog = {
  title: "All About Plumbuses",
  author: "Plumbusy McPlumbusface",
  url: "http://all.about.plumb.us",
  likes: 2
}

beforeEach(async () => {
  await initBlogs()
})

describe(`When POST ${BLOGS_ROOT_URI}`, () => {
  describe("Given a valid blog", () => {
    it("Then adds a new blog to database", async () => {
      await postAndExpectNewBlogInDb(newBlog)
    })

    describe("And sets the new blog's", () => {
      it("'title' to the given 'title'", async () => {
        const { title } = await postAndGetFromDb(newBlog)
        expect(title).toEqual(newBlog.title)
      })

      it("'author' to the given 'author'", async () => {
        const { author } = await postAndGetFromDb(newBlog)
        expect(author).toEqual(newBlog.author)
      })

      it("'url' to the given 'url'", async () => {
        const { url } = await postAndGetFromDb(newBlog)
        expect(url).toEqual(newBlog.url)
      })

      it("'likes' to the given 'likes'", async () => {
        const { likes } = await postAndGetFromDb(newBlog)
        expect(likes).toEqual(newBlog.likes)
      })
    })
  })

  describe("Given no 'title'", () => {
    it("Then returns 400 without adding blog to database", async () => {
      const { title, ...withoutTitle } = newBlog
      await postAndExpectErrorWithoutNewBlogInDb(withoutTitle)
    })
  })

  describe("Given no 'author'", () => {
    it("Then returns 400 without adding blog to database", async () => {
      const { author, ...withoutAuthor } = newBlog
      await postAndExpectErrorWithoutNewBlogInDb(withoutAuthor)
    })
  })

  describe("Given no 'url'", () => {
    it("Then returns 400 without adding blog to database", async () => {
      const { url, ...withoutUrl } = newBlog
      await postAndExpectErrorWithoutNewBlogInDb(withoutUrl)
    })
  })

  describe("Given no 'likes'", () => {
    const { likes, ...withoutLikes } = newBlog

    it("Then adds a new blog to database", async () => {
      await postAndExpectNewBlogInDb(withoutLikes)
    })

    describe("And sets the new blog's", () => {
      it("'likes' to 0 by default", async () => {
        const { likes } = await postAndGetFromDb(withoutLikes)
        expect(likes).toEqual(0)
      })
    })
  })
})

const postAndExpectOk = async (blog: Partial<Blog>): Promise<BlogDocument> => {
  const response = await api
    .post(BLOGS_ROOT_URI)
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  return response.body as BlogDocument
}

const postAndExpectError = async (blog: Partial<Blog>): Promise<void> => {
  await api
    .post(BLOGS_ROOT_URI)
    .send(blog)
    .expect(400)
    .expect("Content-Type", /application\/json/)
}

const postAndGetFromDb = async (blog: Partial<Blog>): Promise<BlogDocument> => {
  const { id } = await postAndExpectOk(blog)
  return await getBlogInDb(id)
}

const postAndExpectNewBlogInDb = async (blog: Partial<Blog>): Promise<void> => {
  const blogCountBefore = await countBlogsInDb()
  await postAndExpectOk(blog)
  const blogCountAfter = await countBlogsInDb()
  expect(blogCountAfter).toEqual(blogCountBefore + 1)
}

const postAndExpectErrorWithoutNewBlogInDb = async (blog: Partial<Blog>): Promise<void> => {
  const blogsBefore = await getBlogsInDb()
  await postAndExpectError(blog)
  const blogsAfter = await getBlogsInDb()
  expect(blogsBefore).toEqual(blogsAfter)
}
