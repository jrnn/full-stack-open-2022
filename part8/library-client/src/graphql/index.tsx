import { FC, PropsWithChildren } from "react"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"

const GRAPHQL_URI = "http://localhost:4000"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GRAPHQL_URI
  })
})

const GraphQLProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      { children }
    </ApolloProvider>
  )
}

export { useAllAuthors } from "./queries/allAuthors"
export { useAllBooks } from "./queries/allBooks"

export { useAddBook } from "./mutations/addBook"
export { useEditAuthor } from "./mutations/editAuthor"

export default GraphQLProvider
