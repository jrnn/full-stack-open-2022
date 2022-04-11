import app from "./app"
import { DB_URI, MODE, PORT } from "./config"
import db from "./db"
import logger from "./middleware/logger"

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${MODE} mode.`)
  db.connect(DB_URI)
})
  .on("close", () => {
    logger.info("Closing down ...")
    db.disconnect()
  })
