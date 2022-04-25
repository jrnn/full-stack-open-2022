import React, { useEffect } from "react"
import { LoginForm } from "./components/LoginForm"
import { Main } from "./components/Main"
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
      <h1>Blogs</h1>
      {!user
        ? <LoginForm />
        : <Main />
      }
    </>
  )
}
