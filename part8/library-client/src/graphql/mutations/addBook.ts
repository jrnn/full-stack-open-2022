import { ApolloError, gql, useMutation } from "@apollo/client"
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
      genres
    }
  }
`

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
      onError: onError || doNothing
    })
  }

  return { execute, result }
}
