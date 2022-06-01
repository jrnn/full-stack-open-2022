import { SequelizeStorage, Umzug } from "umzug"
import { sequelize } from "."

const migrator = new Umzug({
  context: sequelize.getQueryInterface(),
  logger: console,
  migrations: {
    // migrations are run after compiling TS to JS, so this is the folder to look at
    glob: "dist/db/migrations/*.js"
  },
  storage: new SequelizeStorage({
    sequelize,
    tableName: "migrations"
  })
})

const runMigrations = async () => {
  console.log(">>>>  running pending migrations, if any")
  const migrations = await migrator.up()
  if (migrations.length === 0) {
    console.log("<<<<  no pending migrations, everything up to date")
  } else {
    console.log("<<<<  migrations run:", migrations.map(m => m.name))
  }
}

const rollback = async () => {
  console.log(">>>>  rolling back latest migration")
  const migrations = await migrator.down()
  if (migrations.length === 0) {
    console.log("<<<<  nothing to roll back!")
  } else {
    console.log("<<<<  migrations rolled back:", migrations.map(m => m.name))
  }
}

const main = () => {
  const isRollback = process.argv[2]?.toLowerCase() === "rollback"
  if (isRollback) {
    rollback()
  } else {
    runMigrations()
  }
}

main()
