import AuthorModel, { AuthorDocument } from "./models/author"
import BookModel, { BookDocument } from "./models/book"

interface AllBooksArguments {
  author?: string
  genre?: string
}

interface AddBookArguments {
  title: string
  author: string
  published: number
  genres?: Array<string>
}

interface EditAuthorArguments {
  name: string
  setBornTo: number
}

const resolvers = {
  Query: {
    allAuthors: async (): Promise<Array<AuthorDocument>> => {
      return AuthorModel.find({})
    },
    allBooks: async (_: never, { author: name, genre }: AllBooksArguments): Promise<Array<BookDocument>> => {
      const genreSelector = !genre ? {} : { genres: { $in: [ genre ] }}
      if (!name) {
        return BookModel.find(genreSelector).populate("author")
      }
      const author = await AuthorModel.findOne({ name })
      return !author
        ? []
        : BookModel.find({ ...genreSelector, author: author._id }).populate("author")
    },
    authorCount: async (): Promise<number> => {
      return AuthorModel.countDocuments()
    },
    bookCount: async (): Promise<number> => {
      return BookModel.countDocuments()
    }
  },
  Author: {
    bookCount: async ({ name }: { name: string }): Promise<number> => {
      const { _id } = await AuthorModel.findOne({ name }) as AuthorDocument
      return BookModel.countDocuments({ author: _id })
    }
  },
  Mutation: {
    addBook: async (_: never, { author: name, ...args }: AddBookArguments): Promise<BookDocument> => {
      const author = await AuthorModel.findOneAndUpdate({ name }, { name }, {
        new: true,
        upsert: true
      })
      const newBook = await new BookModel({ ...args, author: author._id }).save()
      return newBook.populate("author")
    },
    editAuthor: async (_: never, { name, setBornTo }: EditAuthorArguments): Promise<AuthorDocument | null> => {
      return AuthorModel.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
    }
  }
}

export default resolvers
