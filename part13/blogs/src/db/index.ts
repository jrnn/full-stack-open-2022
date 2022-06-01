import { DATABASE_URL } from "../config"
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connected to database")
  } catch (error) {
    console.error("Something went wrong =", error)
    process.exit(1)
  }
}
