import { ApolloError, gql, useMutation } from "@apollo/client"
import { ALL_AUTHORS } from "../queries/allAuthors"
import { ALL_BOOKS } from "../queries/allBooks"
import { Book } from "../../types"
import { doNothing } from "../../util"

interface AddBookResponse {
  addBook: Book
}

interface AddBookVariables {
  title: string
  author: string
  published: number
  genres?: Array<string>
}

const ADD_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
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

const refetchQueries = [
  {
    query: ALL_AUTHORS
  },
  {
    query: ALL_BOOKS
  }
]

export const useAddBook = () => {
  const [ mutate, result ] = useMutation<AddBookResponse, AddBookVariables>(ADD_BOOK)

  const execute = (
    variables: AddBookVariables,
    onCompleted?: (data: AddBookResponse) => void,
    onError?: (error: ApolloError) => void
  ) => {
    mutate({
      variables,
      onCompleted: onCompleted || doNothing,
      onError: onError || doNothing,
      refetchQueries
    })
  }

  return { execute, result }
}
