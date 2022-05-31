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
