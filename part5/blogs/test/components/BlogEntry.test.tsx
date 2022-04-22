import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BlogEntry } from "../../src/components/BlogEntry"
import * as blogThunks from "../../src/store/blogs"

const props = {
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
  }
}

describe("<BlogEntry />", () => {
  beforeEach(() => render(<BlogEntry {...props} />))

  describe("once rendered", () => {
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

    describe("then, on clicking 'Like!'", () => {

      const spy = jest.spyOn(blogThunks, "incrementLikes")

      it("once, then the given 'incrementLikes' is called once with the current 'blog'", async () => {
        const button = screen.getByText("Like!")
        await userEvent.click(button)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(props.blog)
      })

      it("twice, then the given 'incrementLikes' is called twice with the current 'blog'", async () => {
        const button = screen.getByText("Like!")
        await userEvent.click(button)
        await userEvent.click(button)
        expect(spy).toHaveBeenCalledTimes(2)
        expect(spy).toHaveBeenNthCalledWith(1, props.blog)
        expect(spy).toHaveBeenNthCalledWith(2, props.blog)
      })
    })
  })
})
