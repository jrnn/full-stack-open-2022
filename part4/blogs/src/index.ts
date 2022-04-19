import app from "./app"
import { DB_URI, MODE, PORT, db } from "./config"
import logger from "./middleware/logger"

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT} in ${MODE} mode.`)
  await db.connect(DB_URI)
})
  .on("close", async () => {
    logger.info("Closing down ...")
    await db.disconnect()
  })
