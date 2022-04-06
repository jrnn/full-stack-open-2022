import React, { FormEvent, useEffect, useState } from "react"
import Entries from "./components/Entries"
import Filter from "./components/Filter"
import Form from "./components/Form"
import contactService from "./services/contacts"
import { Contact } from "./types"

const App = () => {
  const [ name, setName ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [ contacts, setContacts ] = useState([] as Array<Contact>)

  useEffect(() => {
    contactService
      .getAllContacts()
      .then(initialContacts => setContacts(initialContacts))
      .catch(error => console.error(error))
  }, [])

  const editName = (event: FormEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value)

  const editPhone = (event: FormEvent<HTMLInputElement>) =>
    setPhone(event.currentTarget.value)

  const editFilter = (event: FormEvent<HTMLInputElement>) =>
    setFilter(event.currentTarget.value)

  const addContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    contactService
      .createContact(name, phone)
      .then(newContact => {
        setContacts(contacts.concat(newContact))
        setName("")
        setPhone("")
      })
      .catch((error: Error) => {
        console.error(error)
        alert(error.message)
      })
  }
  const deleteContact = (id: number) => () => {
    const contactToDelete = contacts.find(contact => contact.id === id) as Contact
    const shouldDelete = window.confirm(`Are you sure you want to delete ${contactToDelete.name}?`)

    if (shouldDelete) {
      contactService
        .removeContact(id)
        .then(() => setContacts(contacts.filter(contact => contact.id !== id)))
        .catch(error => console.error(error))
    }
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
        deleteContact={deleteContact}
        filter={filter}
      />
    </div>
  )
}

export default App
