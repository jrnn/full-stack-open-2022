import { Blog } from "../../src/models/blog"
import { dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes } from "../../src/utils/listHelper"
import { blogs } from "../testdata"

describe("When calling 'dummy'", () => {
  it("Then always returns 1", () => {
    expect(dummy([])).toEqual(1)
  })
})

describe("When calling 'totalLikes'", () => {
  it("Given an empty list Then returns 0", () => {
    expect(totalLikes([])).toEqual(0)
  })
  it("Given only one blog Then returns that blog's likes", () => {
    const blog = randomBlog()
    expect(totalLikes([ blog ])).toEqual(blog.likes)
  })
  it("Given several blogs Then returns the sum of likes", () => {
    expect(totalLikes(blogs)).toEqual(1234)
  })
})

describe("When calling 'favoriteBlog'", () => {
  it("Given an empty list Then throws error", () => {
    expect(() => favoriteBlog([])).toThrow()
  })
  it("Given only one blog Then returns that blog", () => {
    const blog = randomBlog()
    expect(favoriteBlog([ blog ])).toEqual(blog)
  })
  it("Given several blogs Then returns the one with most likes", () => {
    expect(favoriteBlog(blogs)).toEqual(blogs[1])
  })
})

describe("When calling 'mostBlogs'", () => {
  it("Given an empty list Then throws error", () => {
    expect(() => mostBlogs([])).toThrow()
  })
  it("Given only one blog Then returns that blog's author and 'blogs: 1'", () => {
    const blog = randomBlog()
    expect(mostBlogs([ blog ])).toEqual({
      author: blog.author,
      blogs: 1
    })
  })
  it("Given several blogs Then returns the author with most blogs and their total number", () => {
    expect(mostBlogs(blogs)).toEqual({
      author: "Beany McBeanface",
      blogs: 3
    })
  })
})

describe("When calling 'mostLikes'", () => {
  it("Given an empty list Then throws error", () => {
    expect(() => mostLikes([])).toThrow()
  })
  it("Given only one blog Then returns that blog's author and likes", () => {
    const blog = randomBlog()
    expect(mostLikes([ blog ])).toEqual({
      author: blog.author,
      likes: blog.likes
    })
  })
  it("Given several blogs Then returns the author with most likes and their total number", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Chucky McChuckface",
      likes: 699
    })
  })
})

const randomBlog = (): Blog => {
  return blogs[Math.floor(Math.random() * blogs.length)] as Blog
}
