import { DatabaseConnection } from "../databaseConnection"
import { CategoryDb } from "../entities/category"

const table = "categories"
const db = DatabaseConnection.getConnection()

export default class CategoryService {
  addData(param: CategoryDb) {
    console.log("service", param)

    return new Promise<number>((resolve, reject) =>
      db.transaction(
        (tx) =>
          tx.executeSql(
            `insert into ${table} (id, name, user_id) 
              values (?, ?, ?)`,
            [param.id, param.name, param.user_id],
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

  updateById(param: CategoryDb) {
    return new Promise<boolean>((resolve, reject) =>
      db.transaction(
        (tx) =>
          tx.executeSql(
            `update ${table} set name = ? where id = ?;`,
            [param.name, param.id],
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
    return new Promise<CategoryDb[]>((resolve, reject) =>
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
    return new Promise<CategoryDb[]>((resolve, reject) =>
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

  findByName(categoryName: string) {
    return new Promise<CategoryDb[]>((resolve, reject) =>
      db.transaction((tx) =>
        tx.executeSql(
          `select * from ${table} where name like '%${categoryName}%'`,
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

  getCategoriesToUpload() {
    return new Promise<CategoryDb[]>((resolve, reject) =>
      db.transaction((tx) =>
        tx.executeSql(
          `select * from ${table} where uploaded_at is null`,
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
