import { dummy, favoriteBlog, mostBlogs, totalLikes } from "../../src/utils/listHelper"
import { blogs, randomBlog } from "../testblogs"

describe("When calling 'dummy'", () => {
  it("Then always returns 1", () => {
    const result = dummy([])
    expect(result).toEqual(1)
  })
})

describe("When calling 'totalLikes'", () => {
  it("Given an empty list Then returns 0", () => {
    const result = totalLikes([])
    expect(result).toEqual(0)
  })
  it("Given only one blog Then returns that blog's likes", () => {
    const blog = randomBlog()
    const result = totalLikes([ blog ])
    expect(result).toEqual(blog.likes)
  })
  it("Given several blogs Then returns the sum of likes", () => {
    const result = totalLikes(blogs)
    expect(result).toEqual(1234)
  })
})

describe("When calling 'favoriteBlog'", () => {
  it("Given an empty list Then throws error", () => {
    expect(() => favoriteBlog([])).toThrow()
  })
  it("Given only one blog Then returns that blog", () => {
    const blog = randomBlog()
    const result = favoriteBlog([ blog ])
    expect(result).toEqual(blog)
  })
  it("Given several blogs Then returns the one with most likes", () => {
    const result = favoriteBlog(blogs)
    expect(result).toEqual(blogs[1])
  })
})

describe("When calling 'mostBlogs'", () => {
  it("Given an empty list Then throws error", () => {
    expect(() => mostBlogs([])).toThrow()
  })
  it("Given only one blog Then returns that blog's author and 'blogs: 1'", () => {
    const blog = randomBlog()
    const result = mostBlogs([ blog ])
    expect(result).toEqual({
      author: blog.author,
      blogs: 1
    })
  })
  it("Given several blogs Then returns the author with most blogs and their total number", () => {
    const result = mostBlogs(blogs)
    expect(result).toEqual({
      author: "Beany McBeanface",
      blogs: 3
    })
  })
})
