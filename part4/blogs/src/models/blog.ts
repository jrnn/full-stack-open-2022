import { model, Model, Schema } from "mongoose"

export interface Blog {
  title?: string
  author?: string
  url?: string
  likes?: number
}

const schema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

export const BlogModel: Model<Blog> = model("Blog", schema)
