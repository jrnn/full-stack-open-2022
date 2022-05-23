import dotenv from "dotenv"
import { DatabaseConnection } from "../types"

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

// just this once, TypeScript: cut me some slack
/* eslint-disable @typescript-eslint/no-var-requires */
export const db: DatabaseConnection = _mode === "test"
  ? require("./db.memory").inMemoryConnection
  : require("./db").bonaFideConnection
