export const getRandomElement = <T>(array: Array<T>): T => {
  const randomElement = array[Math.floor(Math.random() * array.length)]
  if (!randomElement) {
    throw new Error("Cannot pick a random element from an empty array")
  }
  return randomElement
}
