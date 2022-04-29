import { DB_URI, MODE, SECRET_KEY } from "./config"
import { ApolloServer } from "apollo-server"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import UserModel from "./models/user"
import resolvers from "./resolvers"
import typeDefs from "./typeDefs"

mongoose.connect(DB_URI)
  .then(() => console.log(`Now connected to MongoDB at ${DB_URI}`))
  .catch((error) => {
    console.error("Couldn't connect to MongoDB =", error)
    process.exit(1)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    const auth = ctx.req.headers.authorization
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const token = auth.substring(7)
      const { id } = <{ id: string }>jwt.verify(token, SECRET_KEY)
      const currentUser = await UserModel.findById(id)
      return { currentUser }
    }
    return { ...ctx, currentUser: null }
  }
})

server.listen().then(({ url }) => console.log(`Running at ${url} in ${MODE} mode`))
