import { MODE, PORT } from "./config"
import { app } from "./app"
import { setupDatabase } from "./models"

const run = async () => {
  await setupDatabase()
  app.listen(PORT, () => {
    console.log(`Now running on port ${PORT} in ${MODE} mode.`)
  })
}

run()
