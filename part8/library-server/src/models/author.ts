import { HydratedDocument, model, Model, Schema } from "mongoose"

interface AuthorSchema {
  name: string
  born?: number
}

const schema = new Schema({
  name: {
    type: String,
    required: [
      true,
      "Property 'name' cannot be empty"
    ],
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  }
})

const AuthorModel: Model<AuthorSchema> = model("Author", schema)

export type AuthorDocument = HydratedDocument<AuthorSchema>

export default AuthorModel
