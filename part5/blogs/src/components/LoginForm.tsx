import React, { FormEvent } from "react"
import { useFormInput } from "../hooks"
import { useAppDispatch } from "../store"
import { login } from "../store/auth"
import { FormInput } from "./FormInput"

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const username = useFormInput("Username")
  const password = useFormInput("Password", "password")

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(login({
      username: username.value,
      password: password.value
    }))
  }
  return (
    <div>
      <h3>Please provide credentials</h3>
      <form onSubmit={onSubmit}>
        <FormInput { ...username } />
        <FormInput { ...password } />
        <div>
          <button id="login-button">Login</button>
        </div>
      </form>
    </div>
  )
}
