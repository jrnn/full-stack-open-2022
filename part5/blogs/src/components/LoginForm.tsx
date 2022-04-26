import React, { FormEventHandler } from "react"
import { useFormInput } from "../hooks"
import { useAppDispatch, useAppSelector } from "../store"
import { login } from "../store/auth"
import { Button } from "./Button"
import { FormInput } from "./FormInput"

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(({ auth }) => auth.status === "loggingIn")
  const username = useFormInput("Username")
  const password = useFormInput("Password", "password")

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value
    }
    dispatch(login(credentials))
  }

  return (
    <div>
      <h3>Please provide credentials</h3>
      <form onSubmit={onSubmit}>
        <FormInput { ...username } loading={isLoading} />
        <FormInput { ...password } loading={isLoading} />
        <Button label="Login" loading={isLoading} type="submit" />
      </form>
    </div>
  )
}
