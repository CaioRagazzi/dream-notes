export class Dream {
  id: number
  title: string
  description?: string
  categoryId?: number
  constructor(title: string, description?: string, categoryId?: number) {
    this.title = title
    this.description = description
    this.categoryId = categoryId
  }
}
