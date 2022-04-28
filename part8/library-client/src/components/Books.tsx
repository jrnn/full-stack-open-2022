import { useQuery } from "@apollo/client"
import { AllBooksResponse, ALL_BOOKS } from "../graphql/queries"

const Books = () => {
  const { loading, data } = useQuery<AllBooksResponse>(ALL_BOOKS)

  if (loading) {
    return <div>... LEWDING ...</div>
  }
  return (
    <>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {data && data.allBooks.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Books
