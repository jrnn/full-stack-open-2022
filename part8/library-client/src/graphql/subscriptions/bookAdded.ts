import { gql, useSubscription } from "@apollo/client"
import { Author, Book } from "../../types"
import { ALL_AUTHORS } from "../queries/allAuthors"
import { ALL_BOOKS } from "../queries/allBooks"
import { ALL_GENRES } from "../queries/allGenres"

interface BookAddedResponse {
  bookAdded: Book
}

interface AllAuthorsCache {
  allAuthors: ReadonlyArray<Author>
}

interface AllBooksCache {
  allBooks: ReadonlyArray<Book>
}

interface AllGenresCache {
  allGenres: ReadonlyArray<string>
}

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        id
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

// Pretty much all updates are handled with this one subscription, by manually
// fiddling with the cache. Yes, it's quite horrible. Too bad!
//
export const useBookAdded = () => {
  return useSubscription<BookAddedResponse>(BOOK_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data) {
        const { cache } = client
        const { bookAdded } = subscriptionData.data

        // add the new book to the ALL_BOOKS cache with no genre filter
        //
        cache.updateQuery<AllBooksCache>({
          query: ALL_BOOKS,
          variables: {
            genre: ""
          }
        }, data => {
          return !data
            ? data
            : ({
              ...data,
              allBooks: data.allBooks.concat(bookAdded)
            })
        })

        // add/update the new book's author to/in the ALL_AUTHORS cache
        //
        cache.updateQuery<AllAuthorsCache>({ query: ALL_AUTHORS }, data => {
          if (!data) {
            return data
          }
          const { author } = bookAdded
          const { allAuthors } = data
          return {
            ...data,
            allAuthors: allAuthors.map(a => a.id).includes(author.id)
              ? allAuthors.map(a => a.id === author.id ? author : a)
              : allAuthors.concat(author)
          }
        })

        // let's try and keep genres up to date too, shall we? (sigh...)
        //
        bookAdded.genres.forEach(genre => {

          // add any previously unknown genres to the ALL_GENRES cache
          //
          cache.updateQuery<AllGenresCache>({ query: ALL_GENRES }, data => {
            if (!data) {
              return data
            }
            const { allGenres } = data
            return {
              ...data,
              allGenres: allGenres.includes(genre)
                ? allGenres
                : allGenres.concat(genre).sort()
            }
          })

          // add the new book to each genre-specific ALL_BOOKS cache
          //
          cache.updateQuery<AllBooksCache>({
            query: ALL_BOOKS,
            variables: {
              genre
            }
          }, data => {
            return !data
              ? data
              : ({
                ...data,
                allBooks: data.allBooks.concat(bookAdded)
              })
          })
        })
      }
    }
  })
}
