import { Maybe } from "../types"

export const maybe = <T>(t: T | null | undefined): Maybe<T> => {
  return {
    isEmpty: () => !t,
    isPresent: () => !!t,
    orElseThrow: () => {
      if (!t) {
        throw new Error("You're trying to unwrap an empty 'Maybe'. Don't do that.")
      }
      return t
    }
  }
}
