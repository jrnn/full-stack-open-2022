import { BelongsToGetAssociationMixin, DataTypes, ForeignKey, InferAttributes, Model } from "sequelize"
import { sequelize } from "../db"
import { User } from "./user"

export class Session extends Model<InferAttributes<Session>> {
  declare token: string
  declare userId: ForeignKey<number>
  declare getUser: BelongsToGetAssociationMixin<User>
}

Session.init({
  token: {
    type: DataTypes.STRING,
    primaryKey: true
  }
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  modelName: "session"
})
