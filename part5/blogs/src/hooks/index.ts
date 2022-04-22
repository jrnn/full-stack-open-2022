import { FormEventHandler, HTMLInputTypeAttribute, useState } from "react"
import { useAppSelector } from "../store"
import { UserAuth } from "../types"

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

export const useAuth = (): UserAuth => {
  const { user } = useAppSelector(state => state.auth)
  if (!user) {
    throw new Error("Oops! You're supposed to be logged in. How did this happen?!")
  }
  return user
}
