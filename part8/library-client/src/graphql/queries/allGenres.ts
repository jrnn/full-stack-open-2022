import { gql, useQuery } from "@apollo/client"

interface AllGenresResponse {
  allGenres: ReadonlyArray<string>
}

const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const useAllGenres = () => {
  return useQuery<AllGenresResponse>(ALL_GENRES)
}
