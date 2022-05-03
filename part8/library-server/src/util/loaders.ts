import DataLoader from "dataloader"
import { Types } from "mongoose"
import AuthorModel, { AuthorDocument } from "../models/author"
import BookModel, { BookDocument } from "../models/book"

export type AuthorByNameLoader = DataLoader<string, AuthorDocument>
export type BooksByAuthorLoader = DataLoader<Types.ObjectId, Array<BookDocument>>

export const createAuthorByNameLoader = () => new DataLoader<string, AuthorDocument>(async names => {
  const authors = await AuthorModel.find({ name: { $in: names }})
  return names.map(name => authors.find(author => author.name === name) || new Error())
})

interface BooksByAuthorResult {
  _id: Types.ObjectId
  books: Array<BookDocument>
}

export const createBooksByAuthorLoader = () => new DataLoader<Types.ObjectId, Array<BookDocument>>(async authorIds => {
  const aggregate: Array<BooksByAuthorResult> = await BookModel.aggregate([{
    $group: {
      _id: "$author",
      books: {
        $push: "$$ROOT"
      }
    }
  }])
  const booksByAuthor: Record<string, Array<BookDocument>> = aggregate
    .reduce((acc, { _id, books }) => {
      return {
        ...acc,
        [_id.toString()]: books
      }
    }, {})

  return authorIds.map(id => id.toString()).map(id => booksByAuthor[id] || new Error())
})
