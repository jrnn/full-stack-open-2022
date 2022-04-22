import React, { FunctionComponent } from "react"
import { BlogEntity, UserAuth } from "../types"
import { BlogEntry } from "./BlogEntry"

interface Props {
  user: UserAuth
  blogs: ReadonlyArray<BlogEntity>
  incrementLikes: (blog: BlogEntity) => void
  removeBlog: (blog: BlogEntity) => void
}

const sortByLikes = (p: BlogEntity, q: BlogEntity) => q.likes - p.likes

export const BlogList: FunctionComponent<Props> = ({ user, blogs, incrementLikes, removeBlog }) => {
  return (
    <div>
      <h3>Please peruse blogs</h3>
      {[ ...blogs ].sort(sortByLikes).map(blog =>
        <BlogEntry
          key={blog.id}
          user={user}
          blog={blog}
          incrementLikes={incrementLikes}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}
