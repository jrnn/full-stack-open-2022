import { v4 as uuid } from "uuid"
import { authors, books } from "./data"
import { Author, Book } from "./types"

interface AllBooks {
  author?: string
  genre?: string
}

interface AddBook {
  title: string
  author: string
  published: number
  genres?: Array<string>
}

interface EditAuthor {
  name: string
  setBornTo: number
}

const resolvers = {
  Query: {
    allAuthors: (): Array<Author> => authors,
    allBooks: (_: never, { author, genre }: AllBooks): Array<Book> => {
      return books
        .filter(book => !author ? true : book.author === author)
        .filter(book => !genre ? true : book.genres.includes(genre))
    },
    authorCount: (): number => authors.length,
    bookCount: (): number => books.length
  },
  Author: {
    bookCount: ({ name }: { name: string }): number => {
      return books.filter(b => b.author === name).length
    }
  },
  Mutation: {
    addBook: (_: never, { title, author, published, genres = [] }: AddBook): Book => {
      const newBook = { title, author, published, genres, id: uuid() }
      const existingAuthor = authors.find(a => a.name === author)
      if (!existingAuthor) {
        authors.push({ name: author, id: uuid() })
      }
      books.push(newBook)
      return newBook
    },
    editAuthor: (_: never, { name, setBornTo }: EditAuthor): Author | null => {
      const author = authors.find(a => a.name === name)
      if (!author) {
        return null
      }
      author.born = setBornTo
      return author
    }
  }
}

export default resolvers
