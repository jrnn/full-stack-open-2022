import { ApolloServer, gql } from "apollo-server"
import { authors, books } from "./data"

const MODE = process.env["NODE_ENV"] || "development"

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    "All authors known."
    allAuthors: [Author!]!

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
    allAuthors: () => authors,
    allBooks: () => books,
    authorCount: () => authors.length,
    bookCount: () => books.length
  },
  Author: {
    bookCount: ({ name }: { name: string }) => {
      return books.filter(b => b.author === name).length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`Running at ${url} in ${MODE} mode`))
