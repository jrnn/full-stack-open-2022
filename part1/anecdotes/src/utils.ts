export const getRandomIndex = <T>(array: Array<T>): number => {
  return Math.floor(Math.random() * array.length)
}

export const getIndexOfMaxValue = (array: Array<number>): number => {
  const maxValue = array.reduce((prev, next) => Math.max(prev, next), 0)
  return array.indexOf(maxValue)
}
