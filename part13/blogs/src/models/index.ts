import { Blog } from "./blog"
import { Reading } from "./reading"
import { User } from "./user"

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, {
  through: Reading,
  as: "readings"
})
User.belongsToMany(Blog, {
  through: Reading,
  as: "readings"
})

export { Blog, Reading, User }
