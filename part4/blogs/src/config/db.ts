import mongoose from "mongoose"
import logger from "../middleware/logger"
import { DatabaseConnection } from "../types"

export const bonaFideConnection: DatabaseConnection = {
  connect: async (uri) => {
    try {
      await mongoose.connect(uri)
      logger.info(`Now connected to MongoDB at ${uri}`)
    } catch (error) {
      logger.error("Failed to connect to MongoDB:", error)
      process.exit(1)
    }
  },
  disconnect: async () => {
    try {
      await mongoose.disconnect()
      logger.info("Connection to database closed")
    } catch (error) {
      logger.error("Failed to disconnect from MongoDB:", error)
      process.exit(1)
    }
  }
}
