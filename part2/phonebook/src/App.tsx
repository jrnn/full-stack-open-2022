import React, { FormEvent, useEffect, useState } from "react"
import axios from "axios"
import Entries from "./components/Entries"
import Filter from "./components/Filter"
import Form from "./components/Form"
import { Contact } from "./types"

const SERVER_URI = "http://localhost:3001/contacts"

const App = () => {
  const [ name, setName ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [ contacts, setContacts ] = useState([] as Array<Contact>)

  useEffect(() => {
    axios
      .get<Array<Contact>>(SERVER_URI)
      .then(({ data }) => setContacts(data))
      .catch(error => console.error(error))
    },
  [])

  const editName = (event: FormEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value)

  const editPhone = (event: FormEvent<HTMLInputElement>) =>
    setPhone(event.currentTarget.value)

  const editFilter = (event: FormEvent<HTMLInputElement>) =>
    setFilter(event.currentTarget.value)

  const addContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const existingNames = contacts.map(contact => contact.name)

    if (!trimmedName) {
      alert("What kind of a name is that supposed to be?")
      return
    }
    if (existingNames.includes(trimmedName)) {
      alert(`${trimmedName} is already present in contacts`)
      return
    }
    const newContact: Contact = {
      id: contacts.length + 1,
      name: trimmedName,
      phone: phone.trim() || "N/A"
    }
    setContacts(contacts.concat(newContact))
    setName("")
    setPhone("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        editName={editName}
        editPhone={editPhone}
        handleSubmit={addContact}
        name={name}
        phone={phone}
      />
      <h2>Contacts</h2>
      <Filter
        handleChange={editFilter}
        value={filter}
      />
      <Entries
        contacts={contacts}
        filter={filter}
      />
    </div>
  )
}

export default App
