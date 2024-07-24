import { ITimelineForm } from "./ITimelineForm"

export interface ITimelineFormProps {
  defaultValues?: ITimelineForm
  handleSubmit: (data: any) => void
}
