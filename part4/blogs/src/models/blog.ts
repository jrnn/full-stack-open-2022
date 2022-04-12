import { model, Model, Schema, Types } from "mongoose"

interface Document {
  _id: Types.ObjectId
  id: string
}

export interface Blog {
  title?: string
  author: string
  url?: string
  likes: number
}

export interface BlogDocument extends Blog {
  id: string
}

const schema = new Schema({
  title: {
    type: String,
    required: [
      true,
      "Property 'title' cannot be empty"
    ],
    trim: true
  },
  author: {
    type: String,
    required: [
      true,
      "Property 'author' cannot be empty"
    ],
    trim: true
  },
  url: {
    type: String,
    required: [
      true,
      "Property 'author' cannot be empty"
    ],
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

schema.set("toJSON", {
  versionKey: false,
  transform: (doc: Document, ret: Partial<Document>) => {
    ret.id = doc._id.toString()
    delete ret._id
  }
})

export const BlogModel: Model<Blog> = model("Blog", schema)
