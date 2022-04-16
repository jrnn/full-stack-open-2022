import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BlogForm } from "../../src/components/BlogForm"

const defaultInput = {
  title: "",
  author: "",
  url: ""
}

describe("<BlogForm />", () => {
  describe("on submitting the form", () => {

    let container: HTMLElement
    const createBlog = jest.fn()

    beforeEach(() => container = render(<BlogForm createBlog={createBlog} />).container)

    it("current 'title' value is passed to the given 'createBlog'", async () => {
      const titleInput = container.querySelector("#title-input") as Element
      await userEvent.type(titleInput, "All About Boats")
      await userEvent.click(screen.getByText("Add"))

      expect(createBlog).toHaveBeenCalledTimes(1)
      expect(createBlog).toHaveBeenCalledWith({ ...defaultInput, title: "All About Boats" }, expect.any(Function))
    })

    it("current 'author' value is passed to the given 'createBlog'", async () => {
      const authorInput = container.querySelector("#author-input") as Element
      await userEvent.type(authorInput, "Boaty McBoatface")
      await userEvent.click(screen.getByText("Add"))

      expect(createBlog).toHaveBeenCalledTimes(1)
      expect(createBlog).toHaveBeenCalledWith({ ...defaultInput, author: "Boaty McBoatface" }, expect.any(Function))
    })

    it("current 'url' value is passed to the given 'createBlog'", async () => {
      const urlInput = container.querySelector("#url-input") as Element
      await userEvent.type(urlInput, "http://all.about.beaowts")
      await userEvent.click(screen.getByText("Add"))

      expect(createBlog).toHaveBeenCalledTimes(1)
      expect(createBlog).toHaveBeenCalledWith({ ...defaultInput, url: "http://all.about.beaowts" }, expect.any(Function))
    })
  })
})

afterEach(() => jest.resetAllMocks())
