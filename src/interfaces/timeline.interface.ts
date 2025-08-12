import type { IApiMeta } from './api.interface';

export interface ITimelineData {
  data: ITimeline[];
  meta: IApiMeta | null;
}

export interface ITimeline {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  active: boolean;
}
