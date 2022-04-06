import React, { FunctionComponent } from "react"
import { Contact } from "../types"
import Entry from "./Entry"

interface Props {
  contacts: Array<Contact>
  deleteContact: (id: number) => () => void
  filter: string
}

const Entries: FunctionComponent<Props> = ({ contacts, deleteContact, filter }) => {
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
            handleClick={deleteContact(contact.id)}
          />
        )}
      </tbody>
    </table>
  )
}

export default Entries
