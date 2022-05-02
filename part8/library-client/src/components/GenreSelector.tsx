import { ChangeEventHandler } from "react"
import { useAllGenres } from "../graphql"
import { useStore } from "../store"

const GenreSelector = () => {
  const { loading, data } = useAllGenres()
  const genre = useStore(store => store.selectedGenre)
  const setGenre = useStore(store => store.setSelectedGenre)

  const selectGenre: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    setGenre(target.value)
  }
  const clear = () => {
    setGenre("")
  }

  return (
    <div>
      {loading && <div>... LEWDING ...</div>}
      <label htmlFor="select-genre">Filter by genre:&nbsp;</label>
      <select
        id="select-genre"
        onChange={selectGenre}
        value={genre}
      >
        <option value="">--</option>
        {data && data.allGenres.map(genre =>
          <option
            key={genre}
            value={genre}
          >
            {genre}
          </option>
        )}
      </select>
      <button onClick={clear} type="button">Clear</button>
    </div>
  )
}

export default GenreSelector
