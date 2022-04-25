import React, { FormEvent } from "react"
import { useAuth, useFormInput } from "../hooks"
import { useAppSelector } from "../store"
import { FormInput } from "./FormInput"

export const LoginForm = () => {
  const { login } = useAuth()
  const { status } = useAppSelector(state => state.auth)
  const username = useFormInput("Username")
  const password = useFormInput("Password", "password")

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(username.value, password.value)
  }
  return (
    <div>
      <h3>Please provide credentials</h3>
      {status === "posting" && <div>TRYING TO LOG YOU IN, HOLD ON...</div>}
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
