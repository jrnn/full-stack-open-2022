import React from "react"
import { Link } from "react-router-dom"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useAppSelector } from "../store"
import { TogglableBlogForm } from "./BlogForm"

export const BlogList = () => {
  const blogs = useAppSelector(({ blogs }) => Object
    .values(blogs.blogs)
    .sort((p, q) => q.likes - p.likes))

  return (
    <div>
      <TogglableBlogForm label="Click here to add new blog" />
      <h3>Please peruse blogs</h3>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog =>
              <TableRow
                className="blog-entry"
                hover
                key={blog.id}
              >
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
