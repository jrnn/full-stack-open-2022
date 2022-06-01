import { DataTypes, QueryInterface } from "sequelize"
import { MigrationFn } from "umzug"

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.createTable("blogs", {
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
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: false
    }
  })
  await queryInterface.addConstraint("blogs", {
    fields: [
      "user_id"
    ],
    type: "foreign key",
    references: {
      table: "users",
      field: "id"
    },
    onUpdate: "cascade",
    onDelete: "set null"
  })
}

export const down: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("blogs")
}
