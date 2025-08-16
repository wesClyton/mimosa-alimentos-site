import type { IBreadcrumbItem } from './breadcrumb.interface';

export interface IVideo {
  showButtonPlay?: boolean;
  title?: string;
  description?: string;
  videoUrl?: string;
  videoUrlYoutube?: string;
  breadcrumbs?: IBreadcrumbItem[];
}
