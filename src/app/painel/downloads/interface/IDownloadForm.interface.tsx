export interface IDownloadForm {
  id?: string
  category: string
  title: string
  image?: File | string
  file?: File | string
  active?: boolean
}
