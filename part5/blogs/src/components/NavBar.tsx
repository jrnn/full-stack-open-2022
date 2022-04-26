import React from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks"
import { logout } from "../store/auth"
import { useAppDispatch } from "../store"

export const NavBar = () => {
  const { name } = useAuth()
  const dispatch = useAppDispatch()

  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/blogs">
          Blogs
        </Button>
        <Button component={Link} to="/users">
          Users
        </Button>
        <Typography align="center" sx={{ flexGrow: 1 }}>
          Logged in as {name}
        </Typography>
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}
