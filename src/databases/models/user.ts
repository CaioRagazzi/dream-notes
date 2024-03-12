export class User {
  id: number
  name: string
  email: string
  password: string
  isLogged: boolean
  constructor(
    name: string,
    email: string,
    password: string,
    isLogged: boolean,
  ) {
    this.name = name
    this.email = email
    this.password = password
    this.isLogged = isLogged
  }
}
