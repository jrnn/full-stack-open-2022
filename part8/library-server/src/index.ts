import { ApolloServer } from "apollo-server"
import resolvers from "./resolvers"
import typeDefs from "./typeDefs"

const MODE = process.env["NODE_ENV"] || "development"

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`Running at ${url} in ${MODE} mode`))
