import { DB_URI, MODE, PORT } from "./config"

import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { createServer } from "http"
import express from "express"
import { makeExecutableSchema } from "@graphql-tools/schema"
import mongoose from "mongoose"
import { useServer } from "graphql-ws/lib/use/ws"
import { WebSocketServer } from "ws"

import resolvers from "./resolvers"
import typeDefs from "./typeDefs"
import { userExtractor } from "./util/userExtractor"
import { createAuthorByNameLoader, createBooksByAuthorLoader } from "./util/loaders"

if (MODE === "development") {
  mongoose.set("debug", true)
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log(`Connected to MongoDB at ${DB_URI}`)
  } catch (error) {
    console.error("Couldn't connect to MongoDB =", error)
    process.exit(1)
  }
}

const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/"
  })
  const wsServerCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanup.dispose()
            }
          }
        }
      }
    ],
    context: async (context) => {
      const currentUser = await userExtractor(context)
      return {
        ...context,
        currentUser,
        authorByNameLoader: createAuthorByNameLoader(),
        booksByAuthorLoader: createBooksByAuthorLoader()
      }
    }
  })
  await server.start()

  server.applyMiddleware({
    app,
    path: "/"
  })
  httpServer.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}${server.graphqlPath} in ${MODE} mode`)
  })
}

connectToDatabase()
startServer()
