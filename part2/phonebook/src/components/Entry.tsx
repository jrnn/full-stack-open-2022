import React, { FunctionComponent } from "react"
import { Person } from "../types"

interface Props {
  person: Person
}

const Entry: FunctionComponent<Props> = ({ person }) => (
  <p>
    {person.name}
  </p>
)

export default Entry
