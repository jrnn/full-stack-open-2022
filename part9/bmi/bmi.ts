import { calculateBmi, toCalculateBmiArgs } from "./src/bmiCalculator"

const parseArgs = (args: Array<string>) => {
  if (args.length !== 4) {
    throw new Error("Wrong number of arguments. Give exactly two arguments: (1) height in cm, (2) weight in kg")
  }
  return toCalculateBmiArgs(args[2], args[3])
}

const main = (args: Array<string>) => {
  try {
    console.log(calculateBmi(parseArgs(args)))
  } catch (error) {
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`)
    } else {
      console.error("Oops! Something went wrong =", error)
    }
    process.exit(1)
  }
}

main(process.argv)
