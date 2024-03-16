import { CategoryDb } from "../databases/entities/category"

export class Category {
  id: string
  name: string
  userId: string
  constructor(name: string) {
    this.name = name
  }

  convert(): CategoryDb {
    const categoryDb = new CategoryDb(this.name, this.userId)

    return categoryDb
  }
}
