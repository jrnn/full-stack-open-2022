import { gql, useQuery } from "@apollo/client"

interface WhoAmIResponse {
  whoAmI: {
    favoriteGenre: string
  }
}

const WHO_AM_I = gql`
  query {
    whoAmI {
      favoriteGenre
    }
  }
`

export const useWhoAmI = () => {
  return useQuery<WhoAmIResponse>(WHO_AM_I)
}
