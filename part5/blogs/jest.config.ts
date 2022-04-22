export default {
  roots: [
    "<rootDir>/test"
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/test/setup.jest.ts"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true
}
