import mongoose from "mongoose"

const connect = (uri: string): void => {
  mongoose
    .connect(uri)
    .then(() => console.log("Now connected to MongoDB"))
    .catch(error => {
      console.error("Failed to connect to MongoDB:", error)
      process.exit(1)
    })
}

const disconnect = (): void => {
  mongoose
    .disconnect()
    .then(() => console.log("Connection to database closed"))
    .catch(error => {
      console.error("Failed to disconnect from MongoDB:", error)
      process.exit(1)
    })
}

export default { connect, disconnect }
