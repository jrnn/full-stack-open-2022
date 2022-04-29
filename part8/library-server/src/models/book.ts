import { HydratedDocument, model, Model, Schema, Types } from "mongoose"

interface BookSchema {
  title: string
  author: string
  published: number
  genres: Array<string>
}

const schema = new Schema({
  title: {
    type: String,
    required: [
      true,
      "Property 'title' cannot be empty"
    ],
    unique: true,
    minlength: 2
  },
  author: {
    type: Types.ObjectId,
    ref: "Author",
    required: [
      true,
      "Property 'author' cannot be empty"
    ]
  },
  published: {
    type: Number,
    required: [
      true,
      "Property 'published' cannot be empty"
    ]
  },
  genres: [
    {
      type: String
    }
  ]
})

const BookModel: Model<BookSchema> = model("Book", schema)

export type BookDocument = HydratedDocument<BookSchema>

export default BookModel
