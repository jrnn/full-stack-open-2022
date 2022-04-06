import React, { FormEvent, useEffect, useState } from "react"
import Entries from "./components/Entries"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Notification from "./components/Notification"
import contactService from "./services/contacts"
import { Contact, Message } from "./types"

const App = () => {
  const [ name, setName ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [ contacts, setContacts ] = useState([] as Array<Contact>)
  const [ message, setMessage ] = useState({ type: "none" } as Message)

  const notify = (text: string, type: "success" | "error") => {
    setTimeout(() => setMessage({ type: "none" }), 5000)
    setMessage({ text, type })
  }

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

  const addContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName) {
      notify("What kind of a name is that supposed to be?", "error")
      return
    }
    const existingContact = await contactService.getByName(trimmedName)

    if (existingContact) {
      const shouldReplace = window.confirm(`${trimmedName} is already present in contacts, replace the existing number?`)
      if (shouldReplace) {
        contactService
          .updateContact({
            ...existingContact,
            phone: phone.trim() || "N/A"
          })
          .then(updatedContact => {
            setContacts(contacts.map(contact => contact.id !== updatedContact.id ? contact : updatedContact))
            setName("")
            setPhone("")
            notify(`${updatedContact.name}'s number has been updated`, "success")
          })
      }
    } else {
      contactService
        .createContact(trimmedName, phone)
        .then(newContact => {
          setContacts(contacts.concat(newContact))
          setName("")
          setPhone("")
          notify(`${newContact.name} added to contacts`, "success")
        })
        .catch(error => console.error(error))
    }
  }

  const deleteContact = (id: number) => () => {
    const { name: nameToDelete } = contacts.find(contact => contact.id === id) as Contact
    const shouldDelete = window.confirm(`Are you sure you want to delete ${nameToDelete}?`)

    if (shouldDelete) {
      contactService
        .removeContact(id)
        .then(() => {
          setContacts(contacts.filter(contact => contact.id !== id))
          notify(`${nameToDelete} deleted from contacts`, "success")
        })
        .catch(error => console.error(error))
    }
  }

  return (
    <div>
      <Notification {...message} />
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
