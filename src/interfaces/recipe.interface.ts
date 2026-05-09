import type { IApiMeta } from './api.interface';

export interface IRecipe {
  id: string;
  title: string;
  description: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRecipeData {
  data: IRecipe[];
  meta: IApiMeta | null;
}
