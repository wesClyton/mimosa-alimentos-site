export interface ICustomerGetResponse {
  id: string
  cityid: number
  corporateName: string
  businessName: string
  latitude: string
  longitude: string
  zipCode: string
  address: string
  district: string
  phone: string
  active: boolean
  createdAt: string
  updatedAt: string
  city: {
    id: number
    stateid: number
    name: string
    state: {
      id: number
      name: string
      uf: string
    }
  }
}
