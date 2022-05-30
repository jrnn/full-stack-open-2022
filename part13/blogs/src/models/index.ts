import { Blog } from "./blog"
import { sequelize } from "./sequelize"

export const setupDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connected to database")
    await Blog.sync()
    console.log("Tables created if missing")
  } catch (error) {
    console.error("Something went wrong =", error)
    process.exit(1)
  }
}

export { Blog }
