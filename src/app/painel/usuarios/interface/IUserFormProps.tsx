import { IUserForm } from "./IUserForm"

export interface IUserFormProps {
  defaultValues?: IUserForm
  handleSubmit: (data: any) => void
}
