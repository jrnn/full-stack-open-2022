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
    minlength: 3,
    trim: true
  },
  phone: {
    type: String,
    required: [
      true,
      "Property 'phone' cannot be empty"
    ],
    trim: true,
    validate: {
      validator: (value: string) => /(^\d{2}-\d{6,}$)|(^\d{3}-\d{5,}$)/.test(value),
      message: () => "Phone must have two or three leading numbers separated with a dash"
    }
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
