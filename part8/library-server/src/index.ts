import { ApolloServer } from "apollo-server"
import dotenv from "dotenv"
import mongoose from "mongoose"
import resolvers from "./resolvers"
import typeDefs from "./typeDefs"

dotenv.config()

const MODE = process.env["NODE_ENV"] || "development"
const DB_URI = process.env["DB_URI"]

if (!DB_URI) {
  console.error("DB_URI missing from env vars")
  process.exit(1)
}
mongoose.connect(DB_URI)
  .then(() => console.log(`Now connected to MongoDB at ${DB_URI}`))
  .catch((error) => {
    console.error("Couldn't connect to MongoDB =", error)
    process.exit(1)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`Running at ${url} in ${MODE} mode`))
