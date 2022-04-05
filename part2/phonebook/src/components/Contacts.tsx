import React, { FunctionComponent } from "react"
import { Person } from "../types"
import Entry from "./Entry"

interface Props {
  filter: string
  persons: Array<Person>
}

const Contacts: FunctionComponent<Props> = ({ filter, persons }) => {
  const trimmedFilter = filter.trim().toLowerCase()
  const personsToShow = !trimmedFilter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(trimmedFilter))

  return (
    <table>
      <tbody>
        {personsToShow.map(person =>
          <Entry
            key={person.name}
            person={person}
          />
        )}
      </tbody>
    </table>
  )
}

export default Contacts
