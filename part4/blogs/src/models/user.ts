import { HydratedDocument, model, Model, Schema } from "mongoose"

export interface User {
  username: string
  name: string
}

export interface UserRequest extends User {
  password: string
}

export interface UserResponse extends User {
  id: string
}

export interface UserSchema extends User {
  pwHash: string
}

export type UserDocument = HydratedDocument<UserSchema>

const schema = new Schema({
  username: String,
  name: String,
  pwHash: String
})

schema.set("toJSON", {
  versionKey: false,
  transform: (doc: UserDocument, ret: Partial<UserDocument>) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.pwHash
  }
})

export const UserModel: Model<UserSchema> = model("User", schema)
