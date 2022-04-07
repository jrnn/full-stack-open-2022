import React, { FunctionComponent } from "react"
import { CountryData } from "../types"
import { sortCountriesByName } from "../utils"
import CountryDetails from "./CountryDetails"
import CountryList from "./CountryList"

interface Props {
  countries: Array<CountryData>
  filter: string
}

const Countries: FunctionComponent<Props> = ({ countries, filter }) => {
  const _filter = filter.trim().toLowerCase()
  const matchingCountries = countries.filter(({ name }) => name.toLowerCase().includes(_filter))

  if (matchingCountries.length > 10) {
    return <p>Too many matching countries, please give a more specific filter.</p>
  }
  if (matchingCountries.length > 1) {
    return <CountryList countries={matchingCountries.sort(sortCountriesByName)} />
  }
  if (matchingCountries.length === 1) {
    return <CountryDetails country={matchingCountries[0] as CountryData}/>
  }
  return <p>No countries to show!</p>
}

export default Countries
