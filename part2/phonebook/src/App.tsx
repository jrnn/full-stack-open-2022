import React, { FormEvent, useState } from "react"
import Entry from "./components/Entry"
import Form from "./components/Form"
import { Person } from "./types"

const initialPersons: Array<Person> = [
  {
    name: "Chuck Norris"
  },
  {
    name: "Spongebob Squarepants"
  }
]

const App = () => {
  const [ name, setName ] = useState("")
  const [ persons, setPersons ] = useState(initialPersons)

  const editName = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setName(value)
  }
  const addPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newPerson: Person = {
      name
    }
    setPersons(persons.concat(newPerson))
    setName("")
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        handleChange={editName}
        handleSubmit={addPerson}
        inputValue={name}
      />
      <h2>Numbers</h2>
      {persons.map(person =>
        <Entry
          key={person.name}
          person={person}
        />
      )}
    </div>
  )
}

export default App
