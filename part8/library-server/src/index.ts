import { ApolloServer, gql } from "apollo-server"
import * as data from "./data"

const MODE = process.env["NODE_ENV"] || "development"

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    "All books known."
    allBooks: [Book!]!

    "Total number of authors known."
    authorCount: Int!

    "Total number of books known."
    bookCount: Int!
  }
`

const resolvers = {
  Query: {
    allBooks: () => data.books,
    authorCount: () => data.authors.length,
    bookCount: () => data.books.length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`Running at ${url} in ${MODE} mode`))
