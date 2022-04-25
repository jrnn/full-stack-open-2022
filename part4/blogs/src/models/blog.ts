import { HydratedDocument, model, Model, Schema, Types } from "mongoose"
import { UserResponse } from "./user"

interface Blog {
  title: string
  author: string
  url: string
}

export interface BlogRequest extends Blog {
  likes?: number | undefined
}

export interface BlogResponse extends Blog {
  id: string
  likes: number
  user: UserResponse
  comments: Array<string>
}

export interface BlogSchema extends Blog {
  likes: number
  user?: Types.ObjectId
  comments: Array<string>
}

export type BlogDocument = HydratedDocument<BlogSchema>

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
  },
  user: {
    type: Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: String
    }
  ]
})

schema.set("toJSON", {
  versionKey: false,
  transform: (doc: BlogDocument, ret: Partial<BlogDocument>) => {
    ret.id = doc._id.toString()
    delete ret._id
  }
})

export const BlogModel: Model<BlogSchema> = model("Blog", schema)
