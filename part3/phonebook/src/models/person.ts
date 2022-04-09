import { model, Model, Schema, Types } from "mongoose"
import { Person } from "../types"

interface Document {
  _id: Types.ObjectId
  id: string
}

const schema = new Schema({
  name: {
    type: String,
    required: [
      true,
      "Property 'name' cannot be empty"
    ],
    trim: true
  },
  phone: {
    type: String,
    required: [
      true,
      "Property 'phone' cannot be empty"
    ],
    trim: true
  }
})

schema.set("toJSON", {
  versionKey: false,
  transform: (doc: Document, ret: Partial<Document>) => {
    ret.id = doc._id.toString()
    delete ret._id
  }
})

export const PersonModel: Model<Person> = model("Person", schema)
