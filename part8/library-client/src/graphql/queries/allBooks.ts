import { gql, useQuery } from "@apollo/client"
import { Book } from "../../types"

interface AllBooksResponse {
  allBooks: ReadonlyArray<Book>
}

interface AllBooksVariables {
  genre: string | undefined
}

export const ALL_BOOKS = gql`
  query(
    $genre: String
  ) {
    allBooks(
      genre: $genre
    ) {
      id
      title
      author {
        name
      }
      published
    }
  }
`

export const useAllBooks = (genre?: string) => {
  const opts = {
    variables: {
      genre
    }
  }
  return useQuery<AllBooksResponse, AllBooksVariables>(ALL_BOOKS, opts)
}
