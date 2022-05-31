import { CreationOptional, DataTypes, InferAttributes, Model } from "sequelize"
import { sequelize } from "./sequelize"

export class User extends Model<InferAttributes<User>> {
  declare id: CreationOptional<number>
  declare name: string
  declare username: string
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  underscored: true,
  modelName: "user"
})
