import React from "react"
import { Link } from "react-router-dom"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useAppSelector } from "../store"

export const UserList = () => {
  const users = useAppSelector(({ users }) => Object.values(users.users))
  return (
    <div>
      <h3>Meet our gorgeous users</h3>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, name, blogs }) =>
              <TableRow
                className="user-entry"
                hover
                key={id}
              >
                <TableCell>
                  <Link to={`/users/${id}`}>{name}</Link>
                </TableCell>
                <TableCell>{blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
