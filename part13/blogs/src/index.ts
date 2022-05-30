import cors from "cors"
import { config } from "dotenv"
import express from "express"
import { CreationOptional, DataTypes, InferAttributes, Model, Sequelize } from "sequelize"

config()

const MODE = process.env["NODE_ENV"] || "development"
const PORT = process.env["PORT"] || 3001
const DATABASE_URL = process.env["DATABASE_URL"]

if (!DATABASE_URL) {
  console.error("Where's your DATABASE_URL, sahib?")
  process.exit(1)
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

class Blog extends Model<InferAttributes<Blog>> {
  declare id: CreationOptional<number>
  declare author?: string
  declare url: string
  declare title: string
  declare likes: number
}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: "blog"
})

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/ping", (_, response) => response.status(200).send("pong"))

app.get("/api/blogs", async (_, response) => {
  const blogs = await Blog.findAll()
  const blogsJson = blogs.map(blog => blog.toJSON())
  return response.status(200).json(blogsJson)
})

app.post("/api/blogs", async ({ body }, response) => {
  try {
    const blog = await Blog.create(body)
    return response.status(201).json(blog)
  } catch (error) {
    return response.status(400).json({ error })
  }
})

app.delete("/api/blogs/:id", async ({ params }, response) => {
  const blog = await Blog.findByPk(params.id)
  if (!blog) {
    return response.status(404).end()
  }
  await blog.destroy()
  return response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Now running on port ${PORT} in ${MODE} mode.`)
})
