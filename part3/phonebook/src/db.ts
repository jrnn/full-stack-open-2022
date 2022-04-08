import mongoose from "mongoose"

export const connectToDatabase = (uri: string): void => {
  mongoose
    .connect(uri)
    .then(() => console.log("Now connected to MongoDB"))
    .catch(error => {
      console.error("Failed to connect to MongoDB:", error)
      process.exit(1)
    })
}

export const disconnectFromDatabase = (): void => {
  mongoose
    .disconnect()
    .then(() => console.log("Connection to database closed"))
    .catch(error => {
      console.error("Failed to disconnect from MongoDB:", error)
      process.exit(1)
    })
}
