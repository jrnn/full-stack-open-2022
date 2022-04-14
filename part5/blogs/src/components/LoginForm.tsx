import React, { FormEvent, FunctionComponent, useState } from "react"
import { LoginCredentials } from "../types"
import { FormInput } from "./FormInput"

interface Props {
  handleLogin: (credentials: LoginCredentials, onSuccess: () => void) => Promise<void>
}

export const LoginForm: FunctionComponent<Props> = ({ handleLogin }) => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  const editUsername = ({ currentTarget }: FormEvent<HTMLInputElement>) => setUsername(currentTarget.value)
  const editPassword = ({ currentTarget }: FormEvent<HTMLInputElement>) => setPassword(currentTarget.value)
  const resetForm = () => {
    setUsername("")
    setPassword("")
  }
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleLogin({ username, password }, resetForm)
  }

  return (
    <div>
      <h3>Please provide credentials</h3>
      <form onSubmit={onSubmit}>
        <FormInput
          label="Username"
          handleChange={editUsername}
          value={username}
        />
        <FormInput
          label="Password"
          handleChange={editPassword}
          value={password}
          type="password"
        />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
