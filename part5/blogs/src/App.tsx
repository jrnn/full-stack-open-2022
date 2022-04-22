import React, { useEffect, useState } from "react"
import { BlogMain } from "./components/BlogMain"
import { LoginForm } from "./components/LoginForm"
import { Notification } from "./components/Notification"
import { getUserFromLocal, login, removeUserFromLocal } from "./services/login"
import { useAppDispatch } from "./store"
import { notifyError, notifySuccess } from "./store/notification"
import { LoginCredentials, UserAuth } from "./types"

export const App = () => {
  const dispatch = useAppDispatch()

  const [ user, setUser ] = useState<UserAuth>()

  const handleLogin = async (credentials: LoginCredentials, onSuccess: () => void) => {
    try {
      const loggedInUser = await login(credentials)
      setUser(loggedInUser)
      onSuccess()
      dispatch(notifySuccess("You are now logged in, welcome!"))
    } catch (error) {
      console.error(error)
      dispatch(notifyError("Invalid username or password"))
    }
  }
  const handleLogout = () => {
    setUser(undefined)
    removeUserFromLocal()
    dispatch(notifyError("You are now logged out. We will miss you! :("))
  }
  useEffect(() => setUser(getUserFromLocal()), [])

  return (
    <>
      <Notification />
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
