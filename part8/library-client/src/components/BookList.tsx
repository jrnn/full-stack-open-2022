import { FC } from "react"
import { Book } from "../types"

interface Props {
  books: ReadonlyArray<Book>
}

const BookList: FC<Props> = ({ books }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Published</th>
      </tr>
    </thead>
    <tbody>
      {books.map(book =>
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.published}</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default BookList
