import React from "react"
import { useParamsId } from "../hooks"
import { useAppSelector } from "../store"

export const UserEntry = () => {
  const id = useParamsId()
  const user = useAppSelector(({ users }) => users.users[id])

  if (!user) {
    return (
      <h2>No user found with id {id}!</h2>
    )
  }
  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Has added the following blogs:</h4>
      <ul>
        {user.blogs.map(({ id, title }) =>
          <li key={id}>{title}</li>
        )}
      </ul>
    </div>
  )
}
