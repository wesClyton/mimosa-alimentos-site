export interface IUserForm {
  id?: string
  name: string
  email: string
  password?: string
  confirmPassword?: string
  active: boolean
  changePassword?: boolean
}
