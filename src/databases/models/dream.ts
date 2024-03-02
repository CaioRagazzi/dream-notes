export class Dream {
  id: number
  title: string
  description?: string
  categoryId?: number
  constructor(
    id: number,
    title: string,
    description?: string,
    categoryId?: number,
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.categoryId = categoryId
  }
}
