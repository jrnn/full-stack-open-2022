import { ApolloError, gql, useMutation } from "@apollo/client"
import { Author } from "../../types"
import { doNothing } from "../../util"

interface EditAuthorResponse {
  editAuthor: Author | null
}

interface EditAuthorVariables {
  name: string
  setBornTo: number
}

const EDIT_AUTHOR = gql`
  mutation updateAuthor(
    $name: String!,
    $setBornTo: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      id
      name
      born
      bookCount
    }
  }
`

export const useEditAuthor = () => {
  const [ mutate, result ] = useMutation<EditAuthorResponse, EditAuthorVariables>(EDIT_AUTHOR)

  const execute = (
    variables: EditAuthorVariables,
    onCompleted?: (data: EditAuthorResponse) => void,
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
