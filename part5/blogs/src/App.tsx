import React, { useEffect, useState } from "react"
import { BlogMain } from "./components/BlogMain"
import { LoginForm } from "./components/LoginForm"
import { Notification } from "./components/Notification"
import { getUserFromLocal, login, removeUserFromLocal } from "./services/login"
import { LoginCredentials, NotificationType, NotifyDispatch, UserAuth } from "./types"

export const App = () => {
  const [ user, setUser ] = useState<UserAuth>()
  const [ notification, setNotification ] = useState<NotificationType>({ type: "none" })

  const handleLogin = async (credentials: LoginCredentials, onSuccess: () => void) => {
    try {
      const loggedInUser = await login(credentials)
      setUser(loggedInUser)
      onSuccess()
      notify("You are now logged in, welcome!", "info")
    } catch (error) {
      console.error(error)
      notify("Invalid username or password", "error")
    }
  }
  const handleLogout = () => {
    setUser(undefined)
    removeUserFromLocal()
    notify("You are now logged out. We will miss you! :(", "info")
  }
  const notify: NotifyDispatch = (message, type) => {
    setTimeout(() => setNotification({ type: "none" }), 5000)
    setNotification({ message, type })
  }

  useEffect(() => setUser(getUserFromLocal()), [])

  return (
    <>
      <Notification {...notification} />
      <h2>Blogs</h2>
      {!user
        ? <LoginForm handleLogin={handleLogin} />
        : <BlogMain
          user={user}
          handleLogout={handleLogout}
          notify={notify}
        />
      }
    </>
  )
}
