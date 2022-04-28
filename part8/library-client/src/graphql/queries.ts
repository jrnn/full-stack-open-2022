import { gql } from "@apollo/client"
import { Author } from "../types"

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
