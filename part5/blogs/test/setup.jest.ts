import { useDispatch, useSelector } from "react-redux"

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))

type MockUseDispatch = jest.Mock<typeof useDispatch>
type MockUseSelector = jest.Mock<typeof useSelector>

const mockUseDispatch = useDispatch as MockUseDispatch
const mockUseSelector = useSelector as MockUseSelector

const mockStore = {
  auth: {
    user: {
      token: "store.auth.user.token"
    }
  }
}

beforeEach(() => {
  mockUseDispatch.mockImplementation(() => () => null as never)
  mockUseSelector.mockImplementation(selector => selector(mockStore))
})

afterEach(() => jest.clearAllMocks())
