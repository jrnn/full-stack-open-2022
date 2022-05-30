import { config } from "dotenv"

config()

const _databaseUrl = process.env["DATABASE_URL"]

if (!_databaseUrl) {
  console.error("Where's your DATABASE_URL, sahib?")
  process.exit(1)
}

export const MODE = process.env["NODE_ENV"] || "development"
export const PORT = process.env["PORT"] || 3001
export const DATABASE_URL = _databaseUrl
