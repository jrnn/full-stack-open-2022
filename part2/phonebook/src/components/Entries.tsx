import React, { FunctionComponent } from "react"
import { Contact } from "../types"
import Entry from "./Entry"

interface Props {
  contacts: Array<Contact>
  filter: string
}

const Entries: FunctionComponent<Props> = ({ contacts, filter }) => {
  const trimmedFilter = filter.trim().toLowerCase()
  const contactsToShow = !trimmedFilter
    ? contacts
    : contacts.filter(({ name }) => name.toLowerCase().includes(trimmedFilter))

  return (
    <table>
      <tbody>
        {contactsToShow.map(contact =>
          <Entry
            key={contact.id}
            contact={contact}
          />
        )}
      </tbody>
    </table>
  )
}

export default Entries
