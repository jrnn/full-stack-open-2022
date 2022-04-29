import { FormEventHandler } from "react"
import { useEditAuthor } from "../graphql"
import { useTextField } from "../hooks"
import { useStore } from "../store"
import TextField from "./TextField"

const YearOfBirthForm = () => {
  const { execute } = useEditAuthor()
  const notifySuccess = useStore(store => store.notifySuccess)
  const notifyError = useStore(store => store.notifyError)

  const nameInput = useTextField("Name")
  const yearInput = useTextField("Year of birth", "number")

  const editAuthor: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const variables = {
      name: nameInput.value,
      setBornTo: Number(yearInput.value)
    }
    execute(variables, (data) => {
      if (!data.editAuthor) {
        notifyError("No such author!")
      } else {
        nameInput.reset()
        yearInput.reset()
        notifySuccess("Year of birth updated!")
      }
    }, (error) => {
      notifyError(error.message)
    })
  }

  return (
    <>
      <h3>Set year of birth</h3>
      <form onSubmit={editAuthor}>
        <div>
          <TextField { ...nameInput } />
        </div>
        <div>
          <TextField { ...yearInput } />
        </div>
        <div>
          <button type="submit">Update author</button>
        </div>
      </form>
    </>
  )
}

export default YearOfBirthForm
