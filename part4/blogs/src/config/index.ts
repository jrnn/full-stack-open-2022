import dotenv from "dotenv"
import { bonaFideConnection } from "./db"
import { inMemoryConnection } from "./db.memory"

dotenv.config()

const _mode = process.env["NODE_ENV"] || "development"
const _secretKey = _mode === "test"
  ? "theOwlsAreNotWhatTheySeem"
  : process.env["SECRET_KEY"]

if (!_secretKey) {
  console.error("dude, where's my SECRET_KEY ?")
  process.exit(1)
}

export const DB_URI = process.env["DB_URI"] || "N/A"
export const MODE = _mode
export const PORT = process.env["PORT"] || "3003"
export const SECRET_KEY = _secretKey

export const db = _mode === "test"
  ? inMemoryConnection
  : bonaFideConnection
