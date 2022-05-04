import express, { Request } from "express"
import { calculateBmi, toCalculateBmiArgs } from "./bmiCalculator"

const PORT = 3000

const app = express()

app.get("/hello", (_, response) => {
  response.send("Hello Full Stack!")
})

interface GetBmiQueryParams {
  height?: string
  weight?: string
}

type GetBmiRequest = Request<unknown, unknown, unknown, GetBmiQueryParams>

app.get("/bmi", ({ query }: GetBmiRequest, response) => {
  const { height, weight } = query
  try {
    const args = toCalculateBmiArgs(height, weight)
    const bmi = calculateBmi(args)
    return response.status(200).json({
      height: args.heightInCm,
      weight: args.weightInKg,
      bmi
    })
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message })
    }
    return response.status(500).json({ error: "Oops! I have no idea what just happened. Sorry!" })
  }
})

app.listen(PORT, () => {
  console.log(`Now running at http://localhost:${PORT}`)
})
