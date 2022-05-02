import { gql, useQuery } from "@apollo/client"
import { Book } from "../../types"

interface AllBooksResponse {
  allBooks: ReadonlyArray<Book>
}

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author {
        name
      }
      published
    }
  }
`

export const useAllBooks = () => {
  return useQuery<AllBooksResponse>(ALL_BOOKS)
}
