import { useEffect } from "react"
import { useAllBooks } from "../graphql"
import { useStore } from "../store"
import BookList from "./BookList"
import GenreSelector from "./GenreSelector"

const Books = () => {
  const selectedGenre = useStore(store => store.selectedGenre)
  const notifyError = useStore(store => store.notifyError)
  const { loading, data, error } = useAllBooks(selectedGenre)

  useEffect(() => {
    if (error) {
      notifyError(error.message)
    }
  }, [ error, notifyError ])

  return (
    <>
      <h2>Books</h2>
      {loading && <div>... LEWDING ...</div>}
      {data && <>
        <GenreSelector />
        <BookList books={data.allBooks} />
      </>}
    </>
  )
}

export default Books
