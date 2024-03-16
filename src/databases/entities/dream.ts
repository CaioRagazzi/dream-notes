export class DreamDb {
  id: string
  title: string
  description?: string
  category_id?: number
  constructor(title: string, description?: string, categoryId?: number) {
    this.title = title
    this.description = description
    this.category_id = categoryId
  }
}
