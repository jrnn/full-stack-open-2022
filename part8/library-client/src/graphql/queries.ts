import { gql } from "@apollo/client"
import { Author, Book } from "../types"

export interface AllAuthorsResponse {
  allAuthors: ReadonlyArray<Author>
}

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export interface AllBooksResponse {
  allBooks: ReadonlyArray<Book>
}

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      published
    }
  }
`
