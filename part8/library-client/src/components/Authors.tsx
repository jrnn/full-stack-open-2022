import { useQuery } from "@apollo/client"
import { AllAuthorsResponse, ALL_AUTHORS } from "../graphql/queries"

const Authors = () => {
  const { loading, data } = useQuery<AllAuthorsResponse>(ALL_AUTHORS)

  if (loading) {
    return <div>... LEWDING ...</div>
  }
  return (
    <>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year of birth</th>
            <th>Number of books</th>
          </tr>
        </thead>
        <tbody>
          {data && data.allAuthors.map(author =>
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born || "--"}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Authors
