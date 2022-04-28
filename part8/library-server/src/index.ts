import { ApolloServer, gql } from "apollo-server"
import { v4 as uuid } from "uuid"
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
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]
    ): Book!
  }
`

interface QueryArgsAllBooks {
  author?: string
  genre?: string
}

interface MutationArgsAddBook {
  title: string
  author: string
  published: number
  genres?: Array<string>
}

const resolvers = {
  Query: {
    allAuthors: () => authors,
    allBooks: (_: never, { author, genre }: QueryArgsAllBooks) => {
      return books
        .filter(b => !author ? true : b.author === author)
        .filter(b => !genre ? true : b.genres.includes(genre))
    },
    authorCount: () => authors.length,
    bookCount: () => books.length
  },
  Mutation: {
    addBook: (_: never, { title, author, published, genres = [] }: MutationArgsAddBook) => {
      const newBook = { title, author, published, genres, id: uuid() }
      const existingAuthor = authors.find(a => a.name === author)
      if (!existingAuthor) {
        authors.push({ name: author, id: uuid() })
      }
      books.push(newBook)
      return newBook
    }
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
