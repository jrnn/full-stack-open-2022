import { gql } from "apollo-server"

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
    authorCount: Int!
    bookCount: Int!
    whoAmI: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]
    ): Book!
    createUser(
      username: String!,
      favoriteGenre: String!
    ): User!
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    login(
      username: String!,
      password: String!
    ): Token!
  }
`

export default typeDefs
