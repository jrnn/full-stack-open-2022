import { FC, PropsWithChildren } from "react"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { useStore } from "../store"

const GRAPHQL_URI = "http://localhost:4000"

const cache = new InMemoryCache()
const httpLink = new HttpLink({
  uri: GRAPHQL_URI
})
const authLink = (token: string) => setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `bearer ${token}`
    }
  }
})

const createClient = (token?: string) => {
  const link = !token
    ? httpLink
    : authLink(token).concat(httpLink)

  return new ApolloClient({
    cache,
    link
  })
}

const GraphQLProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const token = useStore(store => store.token)
  const client = createClient(token)
  return (
    <ApolloProvider client={client}>
      { children }
    </ApolloProvider>
  )
}

export { useAllAuthors } from "./queries/allAuthors"
export { useAllBooks } from "./queries/allBooks"
export { useAllGenres } from "./queries/allGenres"

export { useAddBook } from "./mutations/addBook"
export { useEditAuthor } from "./mutations/editAuthor"
export { useLogin } from "./mutations/login"

export default GraphQLProvider
