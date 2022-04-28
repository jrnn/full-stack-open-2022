import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ADD_BOOK } from "../graphql/mutations"
import { ALL_AUTHORS, ALL_BOOKS } from "../graphql/queries"
import { useTextField } from "../hooks"
import TextField from "./TextField"

const AddBookForm = () => {
  const titleInput = useTextField("Title")
  const authorInput = useTextField("Author")
  const publishedInput = useTextField("Published", "number")
  const genreInput = useTextField("Genre")

  const [ genres, setGenres ] = useState<Array<string>>([])
  const [ addBook ] = useMutation(ADD_BOOK)

  const submit = () => {
    const variables = {
      title: titleInput.value,
      author: authorInput.value,
      published: Number(publishedInput.value),
      genres
    }
    const onCompleted = () => {
      titleInput.reset()
      authorInput.reset()
      publishedInput.reset()
      genreInput.reset()
      setGenres([])
    }
    const refetchQueries = [
      {
        query: ALL_AUTHORS
      },
      {
        query: ALL_BOOKS
      }
    ]
    addBook({ variables, onCompleted, refetchQueries })
  }

  const addGenre = () => {
    setGenres(prevGenres => prevGenres.concat(genreInput.value))
    genreInput.reset()
  }

  return (
    <>
      <h2>Add new book</h2>
      <form>
        <div>
          <TextField { ...titleInput } />
        </div>
        <div>
          <TextField { ...authorInput } />
        </div>
        <div>
          <TextField { ...publishedInput } />
        </div>
        <div>
          <TextField { ...genreInput } />
          <button onClick={addGenre} type="button">Add genre</button>
        </div>
        {genres.length > 0 && <b>Given genres:</b>}
        <ul>
          {genres.map(genre =>
            <li key={genre}>{genre}</li>
          )}
        </ul>
        <button onClick={submit} type="button">Create new book</button>
      </form>
    </>
  )
}

export default AddBookForm
