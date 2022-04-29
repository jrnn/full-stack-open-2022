import { gql, useQuery } from "@apollo/client"
import { Author } from "../../types"

interface AllAuthorsResponse {
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

export const useAllAuthors = () => {
  return useQuery<AllAuthorsResponse>(ALL_AUTHORS)
}
