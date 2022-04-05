import React, { FunctionComponent } from "react"
import { Person } from "../types"

interface Props {
  person: Person
}

const Entry: FunctionComponent<Props> = ({ person }) => (
  <tr>
    <td>
      {person.name}
    </td>
    <td>
      {person.phone}
    </td>
  </tr>
)

export default Entry
