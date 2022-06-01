import { MODE, PORT } from "./config"
import { app } from "./app"
import { connectToDatabase } from "./db"

const run = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Now running on port ${PORT} in ${MODE} mode.`)
  })
}

run()
