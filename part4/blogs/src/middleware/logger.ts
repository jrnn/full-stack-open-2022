const error = (...args: unknown[]): void => {
  console.error(...args)
}

const info = (...args: unknown[]): void => {
  console.log(...args)
}

export default { error, info }
