import { gql, useSubscription } from "@apollo/client"
import { Book } from "../../types"

interface BookAddedResponse {
  bookAdded: Book
}

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const useBookAdded = () => {
  return useSubscription<BookAddedResponse>(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        window.alert(`New book "${subscriptionData.data.bookAdded.title}" has just been added to the library!`)
      }
    }
  })
}
