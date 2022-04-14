import React, { useEffect, useState } from "react"
import { BlogMain } from "./components/BlogMain"
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
      <h2>Blogs</h2>
      {!user
        ? <LoginForm handleLogin={handleLogin} />
        : <BlogMain
          user={user}
          handleLogout={handleLogout}
        />
      }
    </>
  )
}
