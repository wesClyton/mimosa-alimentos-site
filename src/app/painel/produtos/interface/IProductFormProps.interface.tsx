import { IProductGetResponse } from "./IProductGetResponse.interface"

export interface IProductFormProps {
  defaultValues?: IProductGetResponse
  disableForm?: boolean
  handleSubmit: (data: any) => void
}
