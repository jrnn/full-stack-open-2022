import { DataTypes, QueryInterface } from "sequelize"
import { MigrationFn } from "umzug"

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("blogs", "year", {
    type: DataTypes.INTEGER
  })
}

export const down: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("blogs", "year")
}
