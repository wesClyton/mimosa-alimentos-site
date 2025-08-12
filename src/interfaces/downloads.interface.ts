import type { IApiMeta } from './api.interface';

export enum DownloadTabKey {
  Linguicas = 'LINGUIÇAS',
  Frios = 'FRIOS',
  Diversos = 'DIVERSOS',
}

export type TabKey = 'linguicas' | 'frios' | 'diversos';

export interface IDownloadTab {
  label: string;
  key: DownloadTabKey;
}

export interface IDownloadContent {
  id: string;
  title: string;
  category: string;
  image: string;
  file: string;
  active: boolean;
}

export interface IDownloadData {
  data: IDownloadContent[];
  meta: IApiMeta | null;
}
