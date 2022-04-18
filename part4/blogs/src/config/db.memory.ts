import { MongoMemoryServer } from "mongodb-memory-server"
import { bonaFideConnection } from "./db"
import { DatabaseConnection } from "../types"

let dbServer: MongoMemoryServer

export const inMemoryConnection: DatabaseConnection = {
  connect: async () => {
    dbServer = await MongoMemoryServer.create()
    await bonaFideConnection.connect(dbServer.getUri())
  },
  disconnect: async () => {
    await bonaFideConnection.disconnect()
    await dbServer.stop()
  }
}
