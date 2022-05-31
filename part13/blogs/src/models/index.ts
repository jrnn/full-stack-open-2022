import { Blog } from "./blog"
import { sequelize } from "./sequelize"
import { User } from "./user"

User.hasMany(Blog)
Blog.belongsTo(User)

export const setupDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connected to database")
    await User.sync({ alter: true })
    await Blog.sync({ alter: true })
    console.log("Tables created if missing")
  } catch (error) {
    console.error("Something went wrong =", error)
    process.exit(1)
  }
}

export { Blog, sequelize, User }
