import { FC, PropsWithChildren } from "react"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000"
  })
})

const GraphQLProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      { children }
    </ApolloProvider>
  )
}

export default GraphQLProvider
