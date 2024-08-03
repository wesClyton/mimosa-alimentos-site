import { ICustomerGetResponse } from "./ICustomerGetResponse.interface"

export interface ICustomerFormProps {
  defaultValues?: ICustomerGetResponse
  disableForm?: boolean
  handleSubmit: (data: any) => void
}
