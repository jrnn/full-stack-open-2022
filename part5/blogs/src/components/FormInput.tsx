import React, { FormEventHandler, FunctionComponent, HTMLInputTypeAttribute } from "react"

interface Props {
  label: string
  value: string
  handleChange: FormEventHandler<HTMLInputElement>
  type?: HTMLInputTypeAttribute
}

export const FormInput: FunctionComponent<Props> = ({ label, value, handleChange, type }) => {
  const id = `${label.toLowerCase()}-input`
  return (
    <div>
      <label htmlFor={id}>{label} </label>
      <input
        id={id}
        onChange={handleChange}
        type={type || "text"}
        value={value}
      />
    </div>
  )
}
