import { useAllBooks, useWhoAmI } from "../graphql"
import BookList from "./BookList"

const Recommendations = () => {
  const whoAmI = useWhoAmI()
  const favoriteGenre = whoAmI.data && whoAmI.data.whoAmI.favoriteGenre
  const allBooks = useAllBooks(favoriteGenre)

  if (whoAmI.loading || allBooks.loading) {
    return <div>... LEWDING ...</div>
  }
  return (
    <>
      <h2>Recommended for you</h2>
      {allBooks.data && <>
        <p>Books in your favorite genre <b>{favoriteGenre}</b></p>
        <BookList books={allBooks.data.allBooks} />
      </>}
    </>
  )
}

export default Recommendations
