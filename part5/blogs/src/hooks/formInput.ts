import { FormEventHandler, HTMLInputTypeAttribute, useState } from "react"

export const useFormInput = (label: string, type?: HTMLInputTypeAttribute) => {
  const [ value, setValue ] = useState("")
  const reset = () => setValue("")
  const handleChange: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setValue(currentTarget.value)
  }
  return {
    handleChange,
    label,
    reset,
    type: type || "text",
    value
  }
}
