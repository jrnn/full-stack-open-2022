import { HydratedDocument, model, Model, Schema, Types } from "mongoose"
import { BlogResponse } from "./blog"

interface User {
  username: string
  name: string
}

export interface UserRequest extends User {
  password: string
}

export interface UserResponse extends User {
  id: string
  blogs: Array<BlogResponse>
}

export interface UserSchema extends User {
  pwHash: string
  blogs: Array<Types.ObjectId>
}

export type UserDocument = HydratedDocument<UserSchema>

const schema = new Schema({
  username: {
    type: String,
    required: [
      true,
      "Property 'username' cannot be empty"
    ],
    minlength: 3,
    trim: true
  },
  name: {
    type: String,
    default: ""
  },
  pwHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: Types.ObjectId,
      ref: "Blog"
    }
  ]
})

schema.set("toJSON", {
  versionKey: false,
  transform: (doc: UserDocument, ret: Partial<UserDocument>) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.pwHash
  }
})

schema.pre<UserDocument>("validate", async function(next) {
  const countOfUsersWithSameUsername = await this.model("User")
    .countDocuments({ username: this.username })
    .where({ _id: { $ne: this._id }})

  if (countOfUsersWithSameUsername > 0) {
    this.invalidate("username", "Username is already in use", this.username)
  }
  next()
})

export const UserModel: Model<UserSchema> = model("User", schema)
