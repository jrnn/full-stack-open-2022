import React from "react"
import { render, screen } from "@testing-library/react"
import { BlogEntry } from "../../src/components/BlogEntry"

const defaultProps = {
  user: {
    token: "user.token",
    name: "user.name",
    username: "user.username"
  },
  blog: {
    id: "blog.id",
    title: "blog.title",
    author: "blog.author",
    url: "blog.url",
    likes: 1337,
    user: {
      id: "blog.user.id",
      token: "blog.user.token",
      name: "blog.user.name",
      username: "blog.user.username"
    }
  },
  incrementLikes: () => {
    // do nothing
  },
  removeBlog: () => {
    // do nothing
  }
}
type Props = Partial<typeof defaultProps>

describe("<BlogEntry />", () => {
  describe("once rendered", () => {
    beforeEach(() => renderBlogEntry())

    it("'title' is displayed by default", () => {
      screen.getByText("blog.title", { exact: false })
    })

    it("'author' is displayed by default", () => {
      screen.getByText("blog.author", { exact: false })
    })

    it("'url' is not displayed by default", () => {
      const element = screen.queryByText("blog.url", { exact: false })
      expect(element).toBeNull()
    })

    it("'likes' is not displayed by default", () => {
      const element = screen.queryByText("1337", { exact: false })
      expect(element).toBeNull()
    })
  })
})

const renderBlogEntry = (props: Props = {}) => {
  return render(<BlogEntry {...defaultProps} {...props} />)
}
