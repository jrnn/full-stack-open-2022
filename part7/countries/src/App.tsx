import React, { FormEvent, useState, useEffect } from "react"

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

const useCountry = (name: string) => {
  console.log("useCountry =", name)
  const [ country, ] = useState(null)

  useEffect(() => {
    // do something
  }, [])

  return country
}

const Country = ({ country }: any) => {
  if (!country) {
    return <div>not found...</div>
  }
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>
    </div>
  )
}

export const App = () => {
  const nameInput = useField()
  const [ name, setName ] = useState("")
  const country = useCountry(name)

  const fetch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}
