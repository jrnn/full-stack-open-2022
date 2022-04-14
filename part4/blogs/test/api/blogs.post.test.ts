import { api } from "../jest.setup"
import { BlogDocument, BlogRequest, BlogResponse } from "../../src/models/blog"
import { BLOGS_ROOT_URI, countBlogsInDb, getBlogInDb, getBlogsInDb, getInvalidToken, getUserInDb, getValidToken, initDb } from "./helper"

const newBlog: BlogRequest = {
  title: "All About Plumbuses",
  author: "Plumbusy McPlumbusface",
  url: "http://all.about.plumb.us",
  likes: 2
}

beforeEach(async () => {
  await initDb()
})

describe(`When POST ${BLOGS_ROOT_URI}`, () => {
  describe("Given no authorization token", () => {
    it("Then returns 401 without adding blog to database", async () => {
      await postAndExpectErrorWithoutNewBlogInDb(newBlog, "", 401)
    })
  })

  describe("Given an invalid authorization token", () => {
    it("Then returns 401 without adding blog to database", async () => {
      const { token } = await getInvalidToken()
      await postAndExpectErrorWithoutNewBlogInDb(newBlog, token, 401)
    })
  })

  describe("Given a valid authorization token", () => {
    describe("Given a valid blog", () => {
      it("Then adds a new blog to database", async () => {
        const { token } = await getValidToken()
        await postAndExpectNewBlogInDb(newBlog, token)
      })

      describe("And sets the new blog's", () => {
        it("'title' to the given 'title'", async () => {
          const { token } = await getValidToken()
          const { title } = await postAndGetFromDb(newBlog, token)
          expect(title).toEqual(newBlog.title)
        })

        it("'author' to the given 'author'", async () => {
          const { token } = await getValidToken()
          const { author } = await postAndGetFromDb(newBlog, token)
          expect(author).toEqual(newBlog.author)
        })

        it("'url' to the given 'url'", async () => {
          const { token } = await getValidToken()
          const { url } = await postAndGetFromDb(newBlog, token)
          expect(url).toEqual(newBlog.url)
        })

        it("'likes' to the given 'likes'", async () => {
          const { token } = await getValidToken()
          const { likes } = await postAndGetFromDb(newBlog, token)
          expect(likes).toEqual(newBlog.likes)
        })

        it("'user' to the User identified by the token", async () => {
          const { id, token } = await getValidToken()
          const tokenUser = await getUserInDb(id)
          const { user } = await postAndGetFromDb(newBlog, token)
          expect(user).toEqual(tokenUser._id)
        })
      })

      it("And adds the new blog to the user's 'blogs'", async () => {
        const { id, token } = await getValidToken()
        const blog = await postAndGetFromDb(newBlog, token)
        const tokenUser = await getUserInDb(id)
        expect(tokenUser.blogs.map(_id => _id.toString())).toContain(blog._id.toString())
      })
    })

    describe("Given no 'title'", () => {
      it("Then returns 400 without adding blog to database", async () => {
        const { token } = await getValidToken()
        const { title, ...withoutTitle } = newBlog
        await postAndExpectErrorWithoutNewBlogInDb(withoutTitle, token)
      })
    })

    describe("Given no 'author'", () => {
      it("Then returns 400 without adding blog to database", async () => {
        const { token } = await getValidToken()
        const { author, ...withoutAuthor } = newBlog
        await postAndExpectErrorWithoutNewBlogInDb(withoutAuthor, token)
      })
    })

    describe("Given no 'url'", () => {
      it("Then returns 400 without adding blog to database", async () => {
        const { token } = await getValidToken()
        const { url, ...withoutUrl } = newBlog
        await postAndExpectErrorWithoutNewBlogInDb(withoutUrl, token)
      })
    })

    describe("Given no 'likes'", () => {
      const { likes, ...withoutLikes } = newBlog

      it("Then adds a new blog to database", async () => {
        const { token } = await getValidToken()
        await postAndExpectNewBlogInDb(withoutLikes, token)
      })

      describe("And sets the new blog's", () => {
        it("'likes' to 0 by default", async () => {
          const { token } = await getValidToken()
          const { likes } = await postAndGetFromDb(withoutLikes, token)
          expect(likes).toEqual(0)
        })
      })
    })
  })
})

const post = async (blog: Partial<BlogRequest>, token: string, status: number): Promise<BlogResponse> => {
  const { body } = await api
    .post(BLOGS_ROOT_URI)
    .set("authorization", `bearer ${token}`)
    .send(blog)
    .expect(status)
    .expect("Content-Type", /application\/json/)

  return body as BlogResponse
}

const postAndExpectOk = async (blog: Partial<BlogRequest>, token: string): Promise<BlogResponse> => {
  return await post(blog, token, 201)
}

const postAndExpectError = async (blog: Partial<BlogRequest>, token: string, status = 400): Promise<void> => {
  await post(blog, token, status)
}

const postAndGetFromDb = async (blog: Partial<BlogRequest>, token: string): Promise<BlogDocument> => {
  const { id } = await postAndExpectOk(blog, token)
  return await getBlogInDb(id)
}

const postAndExpectNewBlogInDb = async (blog: Partial<BlogRequest>, token: string): Promise<void> => {
  const blogCountBefore = await countBlogsInDb()
  await postAndExpectOk(blog, token)
  const blogCountAfter = await countBlogsInDb()
  expect(blogCountAfter).toEqual(blogCountBefore + 1)
}

const postAndExpectErrorWithoutNewBlogInDb = async (blog: Partial<BlogRequest>, token: string, status = 400): Promise<void> => {
  const blogsBefore = await getBlogsInDb()
  await postAndExpectError(blog, token, status)
  const blogsAfter = await getBlogsInDb()
  expect(blogsBefore).toEqual(blogsAfter)
}
