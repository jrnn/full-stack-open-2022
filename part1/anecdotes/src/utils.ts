export const getRandomIndex = <T>(array: Array<T>): number => {
  return Math.floor(Math.random() * array.length)
}
