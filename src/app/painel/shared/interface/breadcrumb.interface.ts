import { IconType } from "react-icons"

export interface IBreadcrumb {
  icon?: IconType
  title: string
  path?: string
}

export interface IBreadcrumbsProps {
  breadcrumbs: IBreadcrumb[]
}
