import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../store"
import { UserAuth } from "../types"
import { maybe } from "../util"

export const useAuth = (): UserAuth => {
  const { user } = useAppSelector(state => state.auth)
  return maybe(user).orElseThrow()
}

export const useFormInput = (label: string, type?: HTMLInputTypeAttribute) => {
  const [ value, setValue ] = useState("")
  const reset = () => setValue("")
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
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

export const useParamsId = (): string => {
  const { id } = useParams<{ id: string }>()
  return maybe(id).orElseThrow()
}
