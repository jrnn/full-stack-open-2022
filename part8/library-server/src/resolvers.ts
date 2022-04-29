import { PASSWORD, SECRET_KEY } from "./config"
import { AuthenticationError, UserInputError } from "apollo-server"
import jwt from "jsonwebtoken"
import AuthorModel, { AuthorDocument } from "./models/author"
import BookModel, { BookDocument } from "./models/book"
import UserModel, { UserDocument } from "./models/user"

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

interface CreateUserArguments {
  username: string
  favoriteGenre: string
}

interface EditAuthorArguments {
  name: string
  setBornTo: number
}

interface LoginArguments {
  username: string
  password: string
}

interface Token {
  value: string
}

interface Context {
  currentUser: UserDocument | null
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
    },
    whoAmI: async (_: never, __: never, context: Context): Promise<UserDocument | null> => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async ({ name }: { name: string }): Promise<number> => {
      const { _id } = await AuthorModel.findOne({ name }) as AuthorDocument
      return BookModel.countDocuments({ author: _id })
    }
  },
  Mutation: {
    addBook: async (
      _: never,
      { author: name, ...args }: AddBookArguments,
      { currentUser }: Context
    ): Promise<BookDocument> => {
      if (!currentUser) {
        throw new AuthenticationError("You're not allowed to do that!")
      }
      try {
        const author = await AuthorModel.findOneAndUpdate({ name }, { name }, {
          new: true,
          upsert: true
        })
        const newBook = await new BookModel({ ...args, author: author._id }).save()
        return newBook.populate("author")
      } catch (error) {
        const message = error instanceof Error ? error.message : "Oops! Somehing went wrong. Too bad!"
        throw new UserInputError(message)
      }
    },
    createUser: async (_: never, args: CreateUserArguments): Promise<UserDocument> => {
      try {
        return new UserModel({ ...args }).save()
      } catch (error) {
        const message = error instanceof Error ? error.message : "Oops! Somehing went wrong. Too bad!"
        throw new UserInputError(message)
      }
    },
    editAuthor: async (
      _: never,
      { name, setBornTo }: EditAuthorArguments,
      { currentUser }: Context
    ): Promise<AuthorDocument | null> => {
      if (!currentUser) {
        throw new AuthenticationError("You're not allowed to do that!")
      }
      return AuthorModel.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
    },
    login: async (_: never, { username, password }: LoginArguments): Promise<Token> => {
      if (password !== PASSWORD) {
        throw new AuthenticationError("invalid username or password")
      }
      const user = await UserModel.findOne({ username })
      if (!user) {
        throw new AuthenticationError("invalid username or password")
      }
      const token = {
        id: user._id,
        username: user.username
      }
      return { value: jwt.sign(token, SECRET_KEY) }
    }
  }
}

export default resolvers
