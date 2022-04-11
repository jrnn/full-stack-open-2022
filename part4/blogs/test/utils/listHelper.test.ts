import { dummy } from "../../src/utils/listHelper"

describe("when calling 'dummy'", () => {
  it("should always return 1", () => {
    const blogs: Array<unknown> = []
    const result = dummy(blogs)
    expect(result).toEqual(1)
  })
})
