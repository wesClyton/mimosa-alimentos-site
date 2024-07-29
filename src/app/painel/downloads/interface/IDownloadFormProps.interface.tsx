import { IDownloadGetResponse } from "./IDownloadGetResponse.interface"

export interface IDownloadFormProps {
  defaultValues?: IDownloadGetResponse
  disableForm?: boolean
  handleSubmit: (data: any) => void
}
