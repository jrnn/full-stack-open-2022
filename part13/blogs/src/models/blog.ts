import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../db"

const currentYear = new Date().getFullYear()

export class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>
  declare author?: string
  declare url: string
  declare title: string
  declare likes: CreationOptional<number>
  declare year?: number
  declare userId: ForeignKey<number>
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
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true,
      min: {
        args: [ 1991 ],
        msg: "'year' cannot be earlier than 1991"
      },
      max: {
        args: [ currentYear ],
        msg: "'year' cannot be in the future"
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  modelName: "blog"
})
