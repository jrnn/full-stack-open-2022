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
    allAuthors: [Author!]!
    allBooks(author: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
  }
`

const resolvers = {
  Query: {
    allAuthors: () => authors,
    allBooks: (_: never, { author }: { author?: string }) => {
      return !author
        ? books
        : books.filter(b => b.author === author)
    },
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
