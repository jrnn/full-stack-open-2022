import dotenv from "dotenv"

dotenv.config()

export const DB_URI = process.env["DB_URI"] || "N/A"
export const MODE = process.env["NODE_ENV"] || "development"
export const PORT = process.env["PORT"] || "3003"
