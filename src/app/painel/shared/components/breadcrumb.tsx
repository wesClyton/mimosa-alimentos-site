"use-client"

import Link from "next/link"
import { Card } from "./ui/card"
import { IBreadcrumbsProps } from "../interface/breadcrumb.interface"
import { BsChevronCompactRight } from "react-icons/bs"

export default function Breadcrumbs(props: IBreadcrumbsProps) {
  return (
    <Card className="p-4 mt-4">
      <nav>
        <ul className="flex gap-4">
          {props.breadcrumbs.map((breadcrumb, index) => {
            return (
              <li key={index} className="flex items-center gap-2">
                <Link href={breadcrumb.path || ""}>{breadcrumb.title}</Link>
                {props.breadcrumbs[props.breadcrumbs.length - 1] !== breadcrumb && <BsChevronCompactRight />}
              </li>
            )
          })}
        </ul>
      </nav>
    </Card>
  )
}
