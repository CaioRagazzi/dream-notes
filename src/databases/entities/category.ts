export class CategoryDb {
  id: string
  name: string
  user_id: string
  constructor(name: string, userId: string) {
    this.name = name
    this.user_id = userId
  }
}
