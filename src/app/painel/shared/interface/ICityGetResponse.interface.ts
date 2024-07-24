export interface ICityGetResponse {
  id: number
  stateid: number
  name: string
  state: {
    id: number
    name: string
    uf: string
  }
}
