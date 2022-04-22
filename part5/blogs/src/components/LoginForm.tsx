import React, { FormEvent, FunctionComponent } from "react"
import { useFormInput } from "../hooks"
import { LoginCredentials } from "../types"
import { FormInput } from "./FormInput"

interface Props {
  handleLogin: (credentials: LoginCredentials, onSuccess: () => void) => Promise<void>
}

export const LoginForm: FunctionComponent<Props> = ({ handleLogin }) => {
  const username = useFormInput("Username")
  const password = useFormInput("Password", "password")
  const resetForm = () => {
    username.reset()
    password.reset()
  }
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleLogin({
      username: username.value,
      password: password.value
    }, resetForm)
  }

  return (
    <div>
      <h3>Please provide credentials</h3>
      <form onSubmit={onSubmit}>
        <FormInput { ...username } />
        <FormInput { ...password } />
        <div>
          <button
            id="login-button"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
