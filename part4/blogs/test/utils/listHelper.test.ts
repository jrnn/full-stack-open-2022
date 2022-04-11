import { dummy, totalLikes } from "../../src/utils/listHelper"
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
    expect(result).toEqual(722)
  })
})
