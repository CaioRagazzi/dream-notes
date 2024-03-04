import { SQLiteDatabase } from "expo-sqlite"

import { DatabaseConnection } from "./databaseConnection"

let db: SQLiteDatabase = null
export default class DatabaseInit {
  constructor() {
    db = DatabaseConnection.getConnection()
    db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
      console.log("Foreign keys turned on"),
    )
    this.InitDb()
    // db.closeSync()
  }
  private InitDb() {
    const sql = [
      // `DROP TABLE IF EXISTS dreams;`,
      // `DROP TABLE IF EXISTS categories;`,
      `create table if not exists categories (
        id integer primary key autoincrement,
        name text
        );`,
      `create table if not exists dreams (
        id integer primary key autoincrement,
        title text,
        description text,
        category_id integer,
        FOREIGN KEY(category_id) REFERENCES categories(id)
        );`,
    ]

    db.transaction(
      (tx) => {
        for (let i = 0; i < sql.length; i++) {
          console.log("execute sql : " + sql[i])
          tx.executeSql(sql[i])
        }
      },
      (error) => {
        console.log("error call back : " + JSON.stringify(error))
        console.log(error)
      },
      () => {
        console.log("transaction complete call back ")
      },
    )
  }
}
