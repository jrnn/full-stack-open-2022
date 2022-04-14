import React, { FormEvent, FunctionComponent, useState } from "react"

interface Props {
  handleLogin: (username: string, password: string) => Promise<boolean>
}

export const LoginForm: FunctionComponent<Props> = ({ handleLogin }) => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  const editUsername = ({ currentTarget }: FormEvent<HTMLInputElement>) => setUsername(currentTarget.value)
  const editPassword = ({ currentTarget }: FormEvent<HTMLInputElement>) => setPassword(currentTarget.value)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isSuccessful = await handleLogin(username, password)
    if (isSuccessful) {
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div>
      <h3>Please provide credentials</h3>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            onChange={editUsername}
            value={username}
          />
        </section>
        <section>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            onChange={editPassword}
            type="password"
            value={password}
          />
        </section>
        <section>
          <button type="submit">Login</button>
        </section>
      </form>
    </div>
  )
}
