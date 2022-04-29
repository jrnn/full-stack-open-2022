import dotenv from "dotenv"

dotenv.config()

const _DB_URI = process.env["DB_URI"]

if (!_DB_URI) {
  console.error("DB_URI missing from env vars")
  process.exit(1)
}

export const DB_URI = _DB_URI
export const MODE = process.env["NODE_ENV"] || "development"
export const SECRET_KEY = process.env["SECRET_KEY"] || "theOwlsAreNotWhatTheySeem"
export const PASSWORD = process.env["INCREDIBLY_SECURE_PASSWORD"] || "trustno1"
