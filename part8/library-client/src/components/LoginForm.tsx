import { FormEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../graphql"
import { useTextField } from "../hooks"
import { useStore } from "../store"
import TextField from "./TextField"

const LoginForm = () => {
  const { execute } = useLogin()
  const navigate = useNavigate()
  const setToken = useStore(store => store.setToken)
  const notifySuccess = useStore(store => store.notifySuccess)
  const notifyError = useStore(store => store.notifyError)

  const usernameInput = useTextField("Username")
  const passwordInput = useTextField("Password", "password")

  const submit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const variables = {
      username: usernameInput.value,
      password: passwordInput.value
    }
    execute(variables, (data) => {
      setToken(data.login.value)
      navigate("/", { replace: true })
      notifySuccess("You're now logged in. Welcome!")
    }, (error) => {
      notifyError(error.message)
    })
  }

  return (
    <>
      <h2>Please provide credentials</h2>
      <form onSubmit={submit}>
        <div>
          <TextField { ...usernameInput } />
        </div>
        <div>
          <TextField { ...passwordInput } />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm
