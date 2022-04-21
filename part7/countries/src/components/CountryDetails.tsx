import React, { FunctionComponent } from "react"
import { Country } from "../types"

interface Props {
  country: Country
}

export const CountryDetails: FunctionComponent<Props> = ({ country }) => (
  <div>
    <h3>{country.name.common}</h3>
    <div>population {country.population}</div>
    <div>capital {country.capital}</div>
    <img
      src={country.flags.png}
      height='100'
      alt={`flag of ${country.name.common}`}
    />
  </div>
)
