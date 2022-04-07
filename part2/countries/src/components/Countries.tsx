import React, { FunctionComponent } from "react"
import { CountryData } from "../types"
import { sortCountriesByName } from "../utils"
import CountryDetails from "./CountryDetails"
import CountryList from "./CountryList"

interface Props {
  countries: Array<CountryData>
  selectCountry: (country: CountryData) => void
}

const Countries: FunctionComponent<Props> = ({ countries, selectCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matching countries, please give a more specific filter.</p>
  }
  if (countries.length > 1) {
    return <CountryList
      countries={countries.sort(sortCountriesByName)}
      selectCountry={selectCountry}
    />
  }
  if (countries.length === 1) {
    return <CountryDetails country={countries[0] as CountryData}/>
  }
  return <p>No countries to show!</p>
}

export default Countries
