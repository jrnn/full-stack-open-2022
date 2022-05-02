import { ApolloError, gql, useMutation } from "@apollo/client"
import { doNothing } from "../../util"

interface LoginResponse {
  login: {
    value: string
  }
}

interface LoginVariables {
  username: string
  password: string
}

const LOGIN = gql`
  mutation(
    $username: String!,
    $password: String!
  ) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const useLogin = () => {
  const [ mutate, result ] = useMutation<LoginResponse, LoginVariables>(LOGIN)

  const execute = (
    variables: LoginVariables,
    onCompleted?: (data: LoginResponse) => void,
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
