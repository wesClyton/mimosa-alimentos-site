export interface IProductForm {
  id?: string
  category: string
  name: string
  size: string
  description: string
  image?: File | string
  active?: boolean
}
