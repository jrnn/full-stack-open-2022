import { useEffect } from "react"
import { useAllBooks } from "../graphql"
import { useStore } from "../store"
import BookList from "./BookList"

const Books = () => {
  const { loading, data, error } = useAllBooks()
  const notifyError = useStore(store => store.notifyError)

  useEffect(() => {
    if (error) {
      notifyError(error.message)
    }
  }, [ error, notifyError ])

  return (
    <>
      <h2>Books</h2>
      {loading && <div>... LEWDING ...</div>}
      {data && <BookList books={data.allBooks} />}
    </>
  )
}

export default Books
