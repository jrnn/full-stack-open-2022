module.exports = {
  roots: [
    "<rootDir>/test"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/test/jest.setup.ts"
  ],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  verbose: true
}
