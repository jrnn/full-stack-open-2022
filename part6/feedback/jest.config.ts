export default {
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true
}
