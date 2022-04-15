import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

    it("'title' is displayed by default", () =>
      expect(screen.getByText(/blog.title/i)).toBeInTheDocument())

    it("'author' is displayed by default", () =>
      expect(screen.getByText(/blog.author/i)).toBeInTheDocument())

    it("'url' is not displayed by default", () =>
      expect(screen.queryByText(/blog.url/i)).not.toBeInTheDocument())

    it("'likes' is not displayed by default", () =>
      expect(screen.queryByText(/1337/i)).not.toBeInTheDocument())
  })

  describe("after clicking 'Show details'", () => {
    beforeEach(async () => {
      renderBlogEntry()
      const button = screen.getByText("Show details")
      await userEvent.click(button)
    })

    it("'title' is still displayed", async () =>
      expect(screen.getByText(/blog.title/i)).toBeInTheDocument())

    it("'author' is still displayed", () =>
      expect(screen.getByText(/blog.author/i)).toBeInTheDocument())

    it("'url' is now displayed too", () =>
      expect(screen.getByText(/blog.url/i)).toBeInTheDocument())

    it("'likes' is now displayed too", () =>
      expect(screen.getByText(/1337/i)).toBeInTheDocument())
  })
})

const renderBlogEntry = (props: Props = {}) => {
  return render(<BlogEntry {...defaultProps} {...props} />)
}
