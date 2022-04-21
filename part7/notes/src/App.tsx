import React, { FormEvent, useState } from "react"

const useField = (type = "text") => {
  const [ value, setValue ] = useState("")
  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setValue(currentTarget.value)
  }
  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUri: string): [ any[], { create: (_: unknown) => void } ] => {
  console.log(baseUri)
  const [ resources, ] = useState([])

  // ...

  const create = (resource: unknown) => {
    console.log(resource)
    // ...
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export const App = () => {
  const content = useField()
  const name = useField()
  const number = useField()

  const [ notes, noteService ] = useResource("http://localhost:3005/notes")
  const [ persons, personService ] = useResource("http://localhost:3005/persons")

  const handleNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
  const handlePersonSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}
