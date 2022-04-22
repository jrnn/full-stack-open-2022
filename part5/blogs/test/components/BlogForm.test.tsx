import React from "react"
import { useDispatch } from "react-redux"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BlogForm } from "../../src/components/BlogForm"
import * as blogThunks from "../../src/store/blogs"

jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}))
type MockUseDispatch = jest.Mock<typeof useDispatch>
const mockUseDispatch = useDispatch as MockUseDispatch

const token = "someToken"
const defaultInput = {
  title: "",
  author: "",
  url: ""
}

beforeEach(() => mockUseDispatch.mockImplementation(() => () => null as never))

describe("<BlogForm />", () => {
  describe("on submitting the form", () => {

    let container: HTMLElement
    const createBlog = jest.spyOn(blogThunks, "createBlog")

    beforeEach(() => container = render(<BlogForm token={token} />).container)

    it("current 'title' value is dispatched with the 'createBlog' thunk", async () => {
      const titleInput = container.querySelector("#title-input") as Element
      await userEvent.type(titleInput, "All About Boats")
      await userEvent.click(screen.getByText("Add"))

      expect(createBlog).toHaveBeenCalledTimes(1)
      expect(createBlog).toHaveBeenCalledWith({ ...defaultInput, title: "All About Boats" }, token)
    })

    it("current 'author' value is dispatched with the 'createBlog' thunk", async () => {
      const authorInput = container.querySelector("#author-input") as Element
      await userEvent.type(authorInput, "Boaty McBoatface")
      await userEvent.click(screen.getByText("Add"))

      expect(createBlog).toHaveBeenCalledTimes(1)
      expect(createBlog).toHaveBeenCalledWith({ ...defaultInput, author: "Boaty McBoatface" }, token)
    })

    it("current 'url' value is dispatched with the 'createBlog' thunk", async () => {
      const urlInput = container.querySelector("#url-input") as Element
      await userEvent.type(urlInput, "http://all.about.beaowts")
      await userEvent.click(screen.getByText("Add"))

      expect(createBlog).toHaveBeenCalledTimes(1)
      expect(createBlog).toHaveBeenCalledWith({ ...defaultInput, url: "http://all.about.beaowts" }, token)
    })
  })
})

afterEach(() => jest.resetAllMocks())
