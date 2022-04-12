import { api } from "../jest.setup"
import { Blog, BlogDocument, BlogModel } from "../../src/models/blog"
import { blogs as initialBlogs } from "../testblogs"

const rootUri = "/api/blogs"

const getBlogsInDb = async () => {
  return BlogModel.find({})
}

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

describe(`When POST ${rootUri}`, () => {
  const newBlog: Blog = {
    title: "All About Plumbus",
    author: "Plumbsy McPlumbusface",
    url: "http://all.about.plumb.us",
    likes: 2
  }

  describe("Given valid blog as request body", () => {
    it("Then adds a new blog to database", async () => {
      const blogsBefore = await getBlogsInDb()
      await postAndExpectOk(newBlog)
      const blogsAfter = await getBlogsInDb()
      expect(blogsAfter).toHaveLength(blogsBefore.length + 1)
    })
    it("Then sets the new blog's 'title' to the given 'title'", async () => {
      const { title } = await postAndGet(newBlog)
      expect(title).toEqual(newBlog.title)
    })
    it("Then sets the new blog's 'author' to the given 'author'", async () => {
      const { author } = await postAndGet(newBlog)
      expect(author).toEqual(newBlog.author)
    })
    it("Then sets the new blog's 'url' to the given 'url'", async () => {
      const { url } = await postAndGet(newBlog)
      expect(url).toEqual(newBlog.url)
    })
    it("Then sets the new blog's 'likes' to the given 'likes'", async () => {
      const { likes } = await postAndGet(newBlog)
      expect(likes).toEqual(newBlog.likes)
    })
  })
  describe("Given no 'title' in request body", () => {
    it("Then returns 400 without adding blog to database", async () => {
      const { title, ...withoutTitle } = newBlog
      const blogsBefore = await getBlogsInDb()
      await postAndExpectError(withoutTitle)
      const blogsAfter = await getBlogsInDb()
      expect(blogsAfter).toHaveLength(blogsBefore.length)
    })
  })
  describe("Given no 'author' in request body", () => {
    it("Then returns 400 without adding blog to database", async () => {
      const { author, ...withoutAuthor } = newBlog
      const blogsBefore = await getBlogsInDb()
      await postAndExpectError(withoutAuthor)
      const blogsAfter = await getBlogsInDb()
      expect(blogsAfter).toHaveLength(blogsBefore.length)
    })
  })
  describe("Given no 'url' in request body", () => {
    it("Then returns 400 without adding blog to database", async () => {
      const { url, ...withoutUrl } = newBlog
      const blogsBefore = await getBlogsInDb()
      await postAndExpectError(withoutUrl)
      const blogsAfter = await getBlogsInDb()
      expect(blogsAfter).toHaveLength(blogsBefore.length)
    })
  })
  describe("Given no 'likes' in request body", () => {
    const { likes, ...withoutLikes } = newBlog

    it("Then adds a new blog to database", async () => {
      const blogsBefore = await getBlogsInDb()
      await postAndExpectOk(withoutLikes)
      const blogsAfter = await getBlogsInDb()
      expect(blogsAfter).toHaveLength(blogsBefore.length + 1)
    })
    it("Then by default sets the new blog's 'likes' to 0", async () => {
      const { likes } = await postAndGet(withoutLikes)
      expect(likes).toEqual(0)
    })
  })

  const postAndExpectOk = async (blog: Partial<Blog>): Promise<BlogDocument> => {
    const response = await api
      .post(rootUri)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    return response.body as BlogDocument
  }
  const postAndExpectError = async (blog: Partial<Blog>): Promise<void> => {
    await api
      .post(rootUri)
      .send(blog)
      .expect(400)
      .expect("Content-Type", /application\/json/)
  }
  const postAndGet = async (blog: Partial<Blog>): Promise<BlogDocument> => {
    const { id } = await postAndExpectOk(blog)
    return await BlogModel.findById(id) as BlogDocument
  }
})
