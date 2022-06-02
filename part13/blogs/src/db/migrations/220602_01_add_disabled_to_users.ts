import { DataTypes, QueryInterface } from "sequelize"
import { MigrationFn } from "umzug"

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("users", "disabled", {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  })
}

export const down: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("users", "disabled")
}
