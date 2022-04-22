import React, { useEffect } from "react"
import { BlogMain } from "./components/BlogMain"
import { LoginForm } from "./components/LoginForm"
import { Notification } from "./components/Notification"
import { useAppDispatch, useAppSelector } from "./store"
import { checkForAuthInLocal } from "./store/auth"

export const App = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => dispatch(checkForAuthInLocal()), [ dispatch ])

  return (
    <>
      <Notification />
      <h2>Blogs</h2>
      {!user
        ? <LoginForm />
        : <BlogMain />
      }
    </>
  )
}
