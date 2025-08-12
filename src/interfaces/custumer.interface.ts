import type { IApiMeta } from './api.interface';

export interface ICustumerData {
  data: ICustumer[];
  meta: IApiMeta | null;
}

export interface ICustumer {
  id: string;
  cityid: number;
  corporateName: string;
  businessName: string;
  latitude: string;
  longitude: string;
  zipCode: string;
  address: string;
  district: string;
  phone: string;
  active: boolean;
  city: ICustumerCity;
}

export interface ICustumerCity {
  id: number;
  stateid: number;
  name: string;
  state: ICustumerState;
}

export interface ICustumerState {
  id: number;
  name: string;
  uf: string;
}
