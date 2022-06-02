import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../db"

export class Reading extends Model<InferAttributes<Reading>, InferCreationAttributes<Reading>> {
  declare blogId: number
  declare userId: number
  declare hasBeenRead: CreationOptional<boolean>
}

Reading.init({
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  hasBeenRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  modelName: "reading"
})
