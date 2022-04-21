import { FormEvent, useEffect, useState } from "react"
import { fetchCountry } from "../services/countries"
import { Country } from "../types"

export const useField = (type = "text") => {
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

export const useCountry = (name: string) => {
  const [ country, setCountry ] = useState<Country>()

  useEffect(() => {
    fetchCountry(name).then(setCountry)
  }, [ name ])

  return country
}
