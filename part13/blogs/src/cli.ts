import { config } from "dotenv"
import { CreationOptional, DataTypes, InferAttributes, Model, Sequelize } from "sequelize"

config()

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

const run = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await Blog.findAll()
    blogs
      .map(({ author, likes, title }) => `${author}: "${title}", ${likes} likes`)
      .forEach(result => console.log(result))
    sequelize.close()
  } catch (error) {
    console.error("Something went wrong, sahib:", error)
    process.exit(1)
  }
}

run()
