import React from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from "../hooks"
import { useAppDispatch } from "../store"
import { logout } from "../store/auth"
import { BlogList } from "./BlogList"
import { UserList } from "./UserList"

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
          element={<UserList />}
        />
        <Route
          path="/"
          element={<BlogList />}
        />
      </Routes>
    </div>
  )
}
