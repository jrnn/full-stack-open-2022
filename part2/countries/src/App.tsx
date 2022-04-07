import React, { FormEvent, useEffect, useState } from "react"
import Countries from "./components/Countries"
import Filter from "./components/Filter"
import { getCountries } from "./services/countries"
import { CountryData } from "./types"

const App = () => {
  const [ countries, setCountries ] = useState<Array<CountryData>>([])
  const [ filter, setFilter ] = useState("")

  useEffect(() => {
    getCountries()
      .then(setCountries)
      .catch(error => console.error(error))
  }, [])

  const editFilter = (event: FormEvent<HTMLInputElement>) =>
    setFilter(event.currentTarget.value)

  return (
    <>
      <h1>Country Finder</h1>
      <Filter
        handleChange={editFilter}
        value={filter}
      />
      <Countries
        countries={countries}
        filter={filter}
      />
    </>
  )
}

export default App
