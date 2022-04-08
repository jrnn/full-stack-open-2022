import { model, Model, Schema, Types } from "mongoose"
import { Person } from "../types"

interface Document {
  _id: Types.ObjectId
  id: string
}

const schema = new Schema({
  name: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
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
