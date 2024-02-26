import { DatabaseConnection } from "../databaseConnection"
import { Dream } from "../models/dream"

const table = "dreams"
const db = DatabaseConnection.getConnection()

export default class DreamService {
  addData(param: Dream) {
    return new Promise<number>((resolve, reject) =>
      db.transaction(
        (tx) =>
          tx.executeSql(
            `insert into ${table} (title, description) 
              values (?, ?)`,
            [param.title, param.description],
            (_, { insertId, rows }) => {
              resolve(insertId)
            },
          ),
        (sqlError) => {
          reject(sqlError)
        },
      ),
    )
  }

  deleteById(id: number) {
    return new Promise<boolean>((resolve, reject) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            `delete from ${table} where id = ?;`,
            [id],
            (_, { rows }) => {
              resolve(true)
            },
          ),
        (sqlError) => {
          reject(sqlError)
        },
      )
    })
  }

  updateById(param: Dream) {
    return new Promise<boolean>((resolve, reject) =>
      db.transaction(
        (tx) =>
          tx.executeSql(
            `update ${table} set title = ?, description = ? where id = ?;`,
            [param.title, param.description, param.id],
            () => {
              resolve(true)
            },
          ),
        (sqlError) => {
          reject(sqlError)
        },
      ),
    )
  }

  findById(id: number) {
    return new Promise<Dream>((resolve, reject) =>
      db.transaction((tx) =>
        tx.executeSql(
          `select * from ${table} where id=?`,
          [id],
          (_, result) => {
            resolve(result.rows._array[0])
          },
          (_, error): boolean => {
            reject(error)
            return false
          },
        ),
      ),
    )
  }

  findAll() {
    return new Promise<Dream[]>((resolve, reject) =>
      db.transaction((tx) =>
        tx.executeSql(
          `select * from ${table}`,
          [],
          (_, result) => {
            resolve(result.rows._array)
          },
          (_, error): boolean => {
            console.warn(error)
            reject(error)
            return false
          },
        ),
      ),
    )
  }
}