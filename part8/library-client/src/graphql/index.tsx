import { FC, PropsWithChildren } from "react"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient as createWsClient } from "graphql-ws"
import { useStore } from "../store"

const cache = new InMemoryCache()
const httpLink = new HttpLink({
  uri: "http://localhost:4000"
})
const wsLink = new GraphQLWsLink(createWsClient({
  url: "ws://localhost:4000"
}))
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.kind === "OperationDefinition" && def.operation === "subscription"
  },
  wsLink,
  httpLink
)
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
    ? splitLink
    : authLink(token).concat(splitLink)

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
export { useWhoAmI } from "./queries/whoAmI"

export { useAddBook } from "./mutations/addBook"
export { useEditAuthor } from "./mutations/editAuthor"
export { useLogin } from "./mutations/login"

export { useBookAdded } from "./subscriptions/bookAdded"

export default GraphQLProvider
