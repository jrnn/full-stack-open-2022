import { FC } from "react"
import { Author } from "../types"

interface Props {
  authors: ReadonlyArray<Author>
}

const AuthorList: FC<Props> = ({ authors }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Year of birth</th>
        <th>Number of books</th>
      </tr>
    </thead>
    <tbody>
      {authors.map(author =>
        <tr key={author.id}>
          <td>{author.name}</td>
          <td>{author.born || "--"}</td>
          <td>{author.bookCount}</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default AuthorList
