import type { IApiMeta } from './api.interface';

export interface ICatalogoProdutoData {
  data: ICatalogoProduto[];
  meta: IApiMeta | null;
}

export interface ICatalogoProduto {
  id: string;
  cod: string;
  description: string;
  brand: string;
  type: string;
  segment: string[];
  image: string;
  status: boolean;
}

export interface ICatalogoType {
  type: string;
  count: number;
}
