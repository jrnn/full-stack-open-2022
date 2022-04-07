import React, { FunctionComponent } from "react"
import { CountryData } from "../types"

interface Props {
  countries: Array<CountryData>
}

const CountryList: FunctionComponent<Props> = ({ countries }) => (
  <>
    <h2>Countries</h2>
    <table>
      <tbody>
        {countries.map(({ name }) =>
          <tr key={name}>
            <td>{name}</td>
          </tr>
        )}
      </tbody>
    </table>
  </>
)

export default CountryList
