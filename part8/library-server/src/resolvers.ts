import AuthorModel, { AuthorDocument } from "./models/author"
import BookModel, { BookDocument } from "./models/book"

/*
interface AllBooks {
  author?: string
  genre?: string
}
*/

interface AddBookArguments {
  title: string
  author: string
  published: number
  genres?: Array<string>
}

/*
interface EditAuthor {
  name: string
  setBornTo: number
}
*/

const resolvers = {
  Query: {
    allAuthors: async (): Promise<Array<AuthorDocument>> => {
      return AuthorModel.find({})
    },
    /*
    allBooks: (_: never, { author, genre }: AllBooks): Array<Book> => {
      return books
        .filter(book => !author ? true : book.author === author)
        .filter(book => !genre ? true : book.genres.includes(genre))
    },
    */
    allBooks: async (): Promise<Array<BookDocument>> => {
      return BookModel.find({}).populate("author")
    },
    authorCount: async (): Promise<number> => {
      return AuthorModel.countDocuments()
    },
    bookCount: async (): Promise<number> => {
      return BookModel.countDocuments()
    }
  },
  Author: {
    /*
    bookCount: ({ name }: { name: string }): number => {
      return books.filter(b => b.author === name).length
    }
    */
    bookCount: async (): Promise<number> => 1337
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
    /*
    editAuthor: (_: never, { name, setBornTo }: EditAuthor): Author | null => {
      const author = authors.find(a => a.name === name)
      if (!author) {
        return null
      }
      author.born = setBornTo
      return author
    }
    */
    editAuthor: async (): Promise<null> => null
  }
}

export default resolvers
