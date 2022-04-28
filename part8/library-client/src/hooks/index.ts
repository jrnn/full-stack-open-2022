import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react"

interface UseTextFieldHook {
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  reset: () => void
  type: HTMLInputTypeAttribute
  value: string
}

export const useTextField = (label: string, type?: HTMLInputTypeAttribute): UseTextFieldHook => {
  const [ value, setValue ] = useState("")
  return {
    label,
    onChange: ({ target }) => {
      setValue(target.value)
    },
    reset: () => {
      setValue("")
    },
    type: type || "text",
    value
  }
}
