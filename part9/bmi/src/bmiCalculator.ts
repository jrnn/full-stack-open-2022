interface CalculateBmiArguments {
  heightInCm: number
  weightInKg: number
}

enum BmiCategory {
  UNDERWEIGHT_SEVERE = "Severely underweight",
  UNDERWEIGHT_MODERATE = "Moderately underweight",
  UNDERWEIGHT_MILD = "Mildly underweight",
  NORMAL = "Normal weight",
  OVERWEIGHT = "Overweight",
  OBESE_MILD = "Obese (Class I)",
  OBESE_MODERATE = "Obese (Class II)",
  OBESE_SEVERE = "Obese (Class III)"
}

const toBmiCategory = (bmi: number): BmiCategory => {
  switch (true) {
    case (bmi < 16):
      return BmiCategory.UNDERWEIGHT_SEVERE
    case (bmi < 17):
      return BmiCategory.UNDERWEIGHT_MODERATE
    case (bmi < 18.5):
      return BmiCategory.UNDERWEIGHT_MILD
    case (bmi < 25):
      return BmiCategory.NORMAL
    case (bmi < 30):
      return BmiCategory.OVERWEIGHT
    case (bmi < 35):
      return BmiCategory.OBESE_MILD
    case (bmi < 40):
      return BmiCategory.OBESE_MODERATE
    default:
      return BmiCategory.OBESE_SEVERE
  }
}

const calculateBmi = ({ heightInCm, weightInKg }: CalculateBmiArguments): BmiCategory => {
  const bmi = weightInKg / Math.pow(0.01 * heightInCm, 2)
  return toBmiCategory(bmi)
}

const toPositiveNumber = (s: string): number => {
  const n = Number(s)
  if (isNaN(n) || n <= 0) {
    throw new Error(`Invalid argument '${s}'. Only positive numbers, please.`)
  }
  return n
}

const parseArgs = (args: Array<string>): CalculateBmiArguments => {
  if (args.length !== 4) {
    throw new Error("Wrong number of arguments. Give exactly two arguments: (1) height in cm, (2) weight in kg")
  }
  return {
    heightInCm: toPositiveNumber(args[2]),
    weightInKg: toPositiveNumber(args[3])
  }
}

const main = (args: Array<string>) => {
  try {
    console.log(calculateBmi(parseArgs(args)))
  } catch (error) {
    if (error instanceof Error) {
      console.error(`${error.name} -- ${error.message}`)
    } else {
      console.error("Oops! Something went wrong =", error)
    }
    process.exit(1)
  }
}

main(process.argv)

export {}
