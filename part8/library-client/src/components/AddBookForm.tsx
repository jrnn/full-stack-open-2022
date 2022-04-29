import { useState } from "react"
import { useAddBook } from "../graphql"
import { useTextField } from "../hooks"
import { useStore } from "../store"
import TextField from "./TextField"

const AddBookForm = () => {
  const { execute } = useAddBook()
  const notifySuccess = useStore(store => store.notifySuccess)
  const notifyError = useStore(store => store.notifyError)

  const titleInput = useTextField("Title")
  const authorInput = useTextField("Author")
  const publishedInput = useTextField("Published", "number")
  const genreInput = useTextField("Genre")
  const [ genres, setGenres ] = useState<Array<string>>([])

  const submit = () => {
    const variables = {
      title: titleInput.value,
      author: authorInput.value,
      published: Number(publishedInput.value),
      genres
    }
    execute(variables, (data) => {
      titleInput.reset()
      authorInput.reset()
      publishedInput.reset()
      genreInput.reset()
      setGenres([])
      notifySuccess(`New book "${data.addBook.title}" added to library!`)
    }, (error) => {
      notifyError(error.message)
    })
  }

  const addGenre = () => {
    setGenres(prevGenres => prevGenres.concat(genreInput.value))
    genreInput.reset()
  }

  return (
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
  )
}

export default AddBookForm
