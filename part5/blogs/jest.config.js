module.exports = {
  roots: [
    "<rootDir>/test"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true
}
