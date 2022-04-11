import mongoose from "mongoose"
import logger from "./middleware/logger"

const connect = (uri: string): void => {
  mongoose
    .connect(uri)
    .then(() => logger.info(`Now connected to MongoDB at ${uri}`))
    .catch(error => {
      logger.error("Failed to connect to MongoDB:", error)
      process.exit(1)
    })
}

const disconnect = (): void => {
  mongoose
    .disconnect()
    .then(() => logger.info("Connection to database closed"))
    .catch(error => {
      logger.error("Failed to disconnect from MongoDB:", error)
      process.exit(1)
    })
}

export default { connect, disconnect }
