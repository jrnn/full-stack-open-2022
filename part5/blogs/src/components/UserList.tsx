import React from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../store"

export const UserList = () => {
  const { users } = useAppSelector(state => state.users)
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
          {users.map(({ id, name, blogs }) =>
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{name}</Link>
              </td>
              <td>{blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
