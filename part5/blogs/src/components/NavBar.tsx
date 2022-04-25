import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks"

export const NavBar = () => {
  const { logout, user } = useAuth()
  return (
    <nav>
      <Link to="/blogs">Blogs</Link>
      <span> | </span>
      <Link to="/users">Users</Link>
      <span> | Logged in as <em>{user.orElseThrow().name}</em> </span>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}
