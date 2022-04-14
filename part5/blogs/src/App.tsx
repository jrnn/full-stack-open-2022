import React, { useState } from "react"
import { BlogList } from "./components/BlogList"
import { LoginForm } from "./components/LoginForm"
import { login } from "./services/login"
import { UserAuth } from "./types"

export const App = () => {
  const [ user, setUser ] = useState<UserAuth>()
  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const _user = await login(username, password)
      setUser(_user)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return (
    <>
      {!user
        ? <LoginForm handleLogin={handleLogin} />
        : <BlogList user={user} />
      }
    </>
  )
}
