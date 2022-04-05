import React, { FormEvent, useState } from "react"
import Contacts from "./components/Contacts"
import Filter from "./components/Filter"
import Form from "./components/Form"
import { persons as initialPersons } from "./persons"
import { Person } from "./types"

const App = () => {
  const [ name, setName ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [ persons, setPersons ] = useState(initialPersons)

  const editName = (event: FormEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value)

  const editPhone = (event: FormEvent<HTMLInputElement>) =>
    setPhone(event.currentTarget.value)

  const editFilter = (event: FormEvent<HTMLInputElement>) =>
    setFilter(event.currentTarget.value)

  const addPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const existingNames = persons.map(person => person.name)

    if (!trimmedName) {
      alert("What kind of a name is that supposed to be?")
      return
    }
    if (existingNames.includes(trimmedName)) {
      alert(`${trimmedName} is already present in contacts`)
      return
    }
    const newPerson: Person = {
      name: trimmedName,
      phone: phone.trim() || "N/A"
    }
    setPersons(persons.concat(newPerson))
    setName("")
    setPhone("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        editName={editName}
        editPhone={editPhone}
        handleSubmit={addPerson}
        name={name}
        phone={phone}
      />
      <h2>Contacts</h2>
      <Filter
        handleChange={editFilter}
        value={filter}
      />
      <Contacts
        filter={filter}
        persons={persons}
      />
    </div>
  )
}

export default App
