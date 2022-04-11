import logger from "../middleware/logger"

export const dummy = (blogs: Array<unknown>): number => {
  logger.info(blogs)
  return 1
}
