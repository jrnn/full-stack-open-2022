import React from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../store"
import { UserEntity } from "../types"

const notFound = (id: string) => (
  <h2>No user found with id {id}!</h2>
)

const showDetails = (user: UserEntity) => (
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

export const UserEntry = () => {
  const params = useParams<{ id: string }>()
  const id = params.id as string
  const user = useAppSelector(state => state.users.users
    .find(user => user.id === id))

  return !user
    ? notFound(id)
    : showDetails(user)
}
