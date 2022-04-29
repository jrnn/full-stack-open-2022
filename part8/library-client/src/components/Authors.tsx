import { useEffect } from "react"
import { useAllAuthors } from "../graphql"
import { useStore } from "../store"
import AuthorList from "./AuthorList"
import YearOfBirthForm from "./YearOfBirthForm"

const Authors = () => {
  const { loading, data, error } = useAllAuthors()
  const notifyError = useStore(store => store.notifyError)

  useEffect(() => {
    if (error) {
      notifyError(error.message)
    }
  }, [ error, notifyError ])

  return (
    <>
      <h2>Authors</h2>
      {loading && <div>... LEWDING ...</div>}
      {data && <>
        <AuthorList authors={data.allAuthors} />
        <YearOfBirthForm />
      </>}
    </>
  )
}

export default Authors
