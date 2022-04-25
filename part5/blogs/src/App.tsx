import React, { useEffect } from "react"
import { Link, Navigate, Route, Routes } from "react-router-dom"
import { BlogEntry } from "./components/BlogEntry"
import { BlogList } from "./components/BlogList"
import { BlogMain } from "./components/BlogMain"
import { LoginForm } from "./components/LoginForm"
import { NavBar } from "./components/NavBar"
import { Notification } from "./components/Notification"
import { UserEntry } from "./components/UserEntry"
import { UserList } from "./components/UserList"
import { UserMain } from "./components/UserMain"
import { useAuth } from "./hooks"
import { useAppDispatch } from "./store"
import { checkForAuthInLocal } from "./store/auth"

const UnknownRoute = () => (
  <div>
    <h2>Where are you trying to go?</h2>
    <h3>
      <Link to="/">Please just go home?</Link>
    </h3>
  </div>
)

export const App = () => {
  const { user } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkForAuthInLocal())
  }, [ dispatch ])

  return (
    <>
      <Notification />
      <h1>Best-of-breed Blogs Galore</h1>
      {user.isEmpty()
        ? <LoginForm />
        : <>
          <NavBar />
          <Routes>
            <Route path="/users" element={<UserMain />}>
              <Route index element={<UserList />} />
              <Route path=":id" element={<UserEntry />} />
            </Route>
            <Route path="/blogs" element={<BlogMain />}>
              <Route index element={<BlogList />} />
              <Route path=":id" element={<BlogEntry />} />
            </Route>
            <Route path="/" element={<Navigate replace to="/blogs" />} />
            <Route path="*" element={<UnknownRoute />} />
          </Routes>
        </>
      }
    </>
  )
}
