import React, { FunctionComponent } from "react"
import { useAppSelector } from "../store"
import { UserAuth } from "../types"
import { BlogEntry } from "./BlogEntry"

interface Props {
  user: UserAuth
}

export const BlogList: FunctionComponent<Props> = ({ user }) => {
  const blogs = useAppSelector(state => [ ...state.blogs.blogs ]
    .sort((p, q) => q.likes - p.likes))

  return (
    <div>
      <h3>Please peruse blogs</h3>
      {blogs.map(blog =>
        <BlogEntry
          key={blog.id}
          user={user}
          blog={blog}
        />
      )}
    </div>
  )
}
