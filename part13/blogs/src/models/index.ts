import { Blog } from "./blog"
import { Reading } from "./reading"
import { Session } from "./session"
import { User } from "./user"

User.hasMany(Blog)
Blog.belongsTo(User)
Session.belongsTo(User)

Blog.belongsToMany(User, {
  through: Reading,
  as: "readings"
})
User.belongsToMany(Blog, {
  through: Reading,
  as: "readings"
})

export { Blog, Reading, Session, User }
