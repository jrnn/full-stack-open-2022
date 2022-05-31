import { CreationOptional, DataTypes, InferAttributes, Model } from "sequelize"
import { sequelize } from "./sequelize"

export class Blog extends Model<InferAttributes<Blog>> {
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
    defaultValue: 0,
    validate: {
      isInt: true
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: "blog"
})
