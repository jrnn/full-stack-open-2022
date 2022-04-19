import React, { FormEvent, useEffect, useState } from "react"
import Countries from "./components/Countries"
import Filter from "./components/Filter"
import { getCountries } from "./services/countries"
import { CountryData } from "./types"

const App = () => {
  const [ filter, setFilter ] = useState("")
  const [ allCountries, setAllCountries ] = useState<Array<CountryData>>([])
  const [ matchingCountries, setMatchingCountries ] = useState<Array<CountryData>>([])

  useEffect(() => {
    getCountries()
      .then(countries => {
        setAllCountries(countries)
        setMatchingCountries(countries)
      })
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    const _filter = filter.trim().toLowerCase()
    const countries = allCountries.filter(({ name }) => name.toLowerCase().includes(_filter))
    setMatchingCountries(countries)
  }, [ allCountries, filter ])

  const editFilter = (event: FormEvent<HTMLInputElement>) =>
    setFilter(event.currentTarget.value)

  const selectCountry = (country: CountryData) =>
    setMatchingCountries([ country ])

  return (
    <>
      <h1>Country Finder</h1>
      <Filter
        handleChange={editFilter}
        value={filter}
      />
      <Countries
        countries={matchingCountries}
        selectCountry={selectCountry}
      />
    </>
  )
}

export default App
