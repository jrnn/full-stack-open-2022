import { DataTypes, QueryInterface } from "sequelize"
import { MigrationFn } from "umzug"

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.createTable("readings", {
    blogId: {
      field: "blog_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hasBeenRead: {
      field: "has_been_read",
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  await queryInterface.addConstraint("readings", {
    fields: [
      "blog_id"
    ],
    type: "foreign key",
    references: {
      table: "blogs",
      field: "id"
    },
    onUpdate: "cascade",
    onDelete: "restrict"
  })
  await queryInterface.addConstraint("readings", {
    fields: [
      "user_id"
    ],
    type: "foreign key",
    references: {
      table: "users",
      field: "id"
    },
    onUpdate: "cascade",
    onDelete: "restrict"
  })
}

export const down: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("readings")
}
