import React, { FormEvent, useState } from "react"
import { CountryDetails } from "./components/CountryDetails"
import { useCountry, useField } from "./hooks"

export const App = () => {
  const [ name, setName ] = useState("")
  const nameInput = useField()
  const country = useCountry(name)

  const fetch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setName(nameInput.value)
  }
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      {!country
        ? <div>not found...</div>
        : <CountryDetails country={country} />
      }
    </div>
  )
}
