import { Router } from "express"
import { QueryTypes } from "sequelize"
import { sequelize } from "../db"
import { throwsError } from "../errors"

const SELECT_AUTHORS = `
  SELECT b.author, COUNT(*) as blogs, SUM(b.likes) as likes
  FROM blogs b
  GROUP BY b.author
  ORDER BY likes DESC
`

export const authorsRouter = Router()

authorsRouter.get("/", throwsError(async (_, response) => {
  const authors = await sequelize.query(SELECT_AUTHORS, {
    type: QueryTypes.SELECT
  })
  return response.status(200).json(authors)
}))
