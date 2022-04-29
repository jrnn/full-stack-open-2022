import { HydratedDocument, model, Model, Schema } from "mongoose"

interface UserSchema {
  username: string
  favoriteGenre: string
}

const schema = new Schema({
  username: {
    type: String,
    required: [
      true,
      "Property 'username' cannot be empty"
    ],
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: [
      true,
      "Property 'favoriteGenre' cannot be empty"
    ]
  }
})

const UserModel: Model<UserSchema> = model("User", schema)

export type UserDocument = HydratedDocument<UserSchema>

export default UserModel
