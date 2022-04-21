import { FormEvent, useState } from "react"

export const useField = (type = "text") => {
  const [ value, setValue ] = useState("")
  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    setValue(currentTarget.value)

  const reset = () => setValue("")

  return {
    reset,
    onChange,
    type,
    value
  }
}
