import React, { FunctionComponent } from "react"
import { CountryData } from "../types"
import WeatherReport from "./WeatherReport"

interface Props {
  country: CountryData
}

const CountryDetails: FunctionComponent<Props> = ({ country }) => (
  <>
    <h2>{country.name}</h2>
    <h4>A few basic things</h4>
    <table>
      <tbody>
        <tr>
          <td>Capital:</td>
          <td>{country.capital}</td>
        </tr>
        <tr>
          <td>Area:</td>
          <td>{country.area} sqkm</td>
        </tr>
        <tr>
          <td>Population:</td>
          <td>{country.population}</td>
        </tr>
      </tbody>
    </table>
    <h4>Languages</h4>
    <ul>
      {country.languages.map(language =>
        <li key={language}>{language}</li>
      )}
    </ul>
    <img src={country.flagUri}/>
    <WeatherReport country={country} />
  </>
)

export default CountryDetails
