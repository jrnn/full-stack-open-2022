import React from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from "../hooks"
import { useAppDispatch } from "../store"
import { logout } from "../store/auth"
import { BlogList } from "./BlogList"
import { UserEntry } from "./UserEntry"
import { UserList } from "./UserList"
import { UserMain } from "./UserMain"

export const Main = () => {
  const dispatch = useAppDispatch()
  const { name } = useAuth()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div>
      <p>Logged in as {name}</p>
      <button onClick={handleLogout}>Logout</button>
      <Routes>
        <Route
          path="/users"
          element={<UserMain />}
        >
          <Route
            index
            element={<UserList />}
          />
          <Route
            path=":id"
            element={<UserEntry />}
          />
        </Route>
        <Route
          path="/"
          element={<BlogList />}
        />
      </Routes>
    </div>
  )
}
