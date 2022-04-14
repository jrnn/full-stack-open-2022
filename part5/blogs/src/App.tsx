import React, { useEffect, useState } from "react"
import { BlogList } from "./components/BlogList"
import { LoginForm } from "./components/LoginForm"
import { getUserFromLocal, login, removeUserFromLocal } from "./services/login"
import { UserAuth } from "./types"

export const App = () => {
  useEffect(() => {
    setUser(getUserFromLocal())
  }, [])

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
  const handleLogout = () => {
    setUser(undefined)
    removeUserFromLocal()
  }

  return (
    <>
      {!user
        ? <LoginForm handleLogin={handleLogin} />
        : <BlogList
          user={user}
          handleLogout={handleLogout}
        />
      }
    </>
  )
}
