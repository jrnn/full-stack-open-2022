import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { fetchUsers } from "../store/users"

export const UserList = () => {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [ dispatch ])

  return (
    <div>
      <h3>Meet our gorgeous users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
