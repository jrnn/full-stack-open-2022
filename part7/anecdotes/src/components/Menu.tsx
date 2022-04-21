import React from "react"
import { Link } from "react-router-dom"

const style = {
  paddingLeft: 4,
  paddingRight: 4
}

export const Menu = () => {
  return (
    <div>
      <Link style={style} to="/">anecdotes</Link>
      <Link style={style} to="/create">create new</Link>
      <Link style={style} to="/about">about</Link>
    </div>
  )
}
