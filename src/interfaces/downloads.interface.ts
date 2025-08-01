export type TabKey = 'linguicas' | 'frios' | 'diversos';

export interface IDownloadTab {
  label: string;
  key: TabKey;
}

export interface IDownloadContent {
  id: string;
  title: string;
  url: string;
}
