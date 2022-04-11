import React, { FunctionComponent } from "react"
import { CountryData } from "../types"

interface Props {
  countries: Array<CountryData>
  selectCountry: (country: CountryData) => void
}

const CountryList: FunctionComponent<Props> = ({ countries, selectCountry }) => (
  <>
    <h2>Countries</h2>
    <table>
      <tbody>
        {countries.map(country =>
          <tr key={country.name}>
            <td>{country.name}</td>
            <td>
              <button onClick={() => selectCountry(country)}>Show</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </>
)

export default CountryList
