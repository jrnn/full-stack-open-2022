import React, { FormEvent, useState } from "react"
import Entry from "./components/Entry"
import Form from "./components/Form"
import { Person } from "./types"

const initialPersons: Array<Person> = [
  {
    name: "Chuck Norris",
    phone: "+1-42-666-1337"
  },
  {
    name: "Spongebob Squarepants",
    phone: "+13-313-1337"
  }
]

const App = () => {
  const [ name, setName ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ persons, setPersons ] = useState(initialPersons)

  const editName = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setName(value)
  }
  const editPhone = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setPhone(value)
  }
  const addPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const existingNames = persons.map(person => person.name)

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
      <table>
        <tbody>
          {persons.map(person =>
            <Entry
              key={person.name}
              person={person}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
