import { DataTypes, QueryInterface } from "sequelize"
import { MigrationFn } from "umzug"

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.createTable("sessions", {
    token: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  await queryInterface.addConstraint("sessions", {
    fields: [
      "user_id"
    ],
    type: "foreign key",
    references: {
      table: "users",
      field: "id"
    },
    onUpdate: "cascade",
    onDelete: "cascade"
  })
}

export const down: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("sessions")
}
