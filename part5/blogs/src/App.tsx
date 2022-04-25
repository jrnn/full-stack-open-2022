import React from "react"
import { Link, Navigate, Route, Routes } from "react-router-dom"
import { BlogEntry } from "./components/BlogEntry"
import { BlogList } from "./components/BlogList"
import { BlogMain } from "./components/BlogMain"
import { LoginForm } from "./components/LoginForm"
import { Notification } from "./components/Notification"
import { UserEntry } from "./components/UserEntry"
import { UserList } from "./components/UserList"
import { UserMain } from "./components/UserMain"
import { useAuth } from "./hooks"

const WhoAmI = () => {
  const { user, logout } = useAuth()
  return user.isEmpty()
    ? null
    :
    <div>
      <p>Logged in as <em>{user.orElseThrow().name}</em></p>
      <button onClick={logout}>Logout</button>
    </div>
}

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
  return (
    <>
      <Notification />
      <h1>Best-of-breed Blogs Galore</h1>
      <WhoAmI />
      {user.isEmpty()
        ? <LoginForm />
        :
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
      }
    </>
  )
}
