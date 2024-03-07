"use client"

import { BsPlusCircle } from "react-icons/bs"
import { IBreadcrumb } from "../../../interface/breadcrumb.interface"
import Breadcrumbs from "../../breadcrumb"
import { Button } from "../button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface IHeaderPageProps {
  title: string
  breadcrumbs: IBreadcrumb[]
  buttonNew?: boolean
}

export default function HeaderPage({ title, breadcrumbs, buttonNew = false }: IHeaderPageProps) {
  const currentPage = usePathname()

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex justify-between items-center py-10">
        <h2 className="text-3xl font-bold tracking-tight my-4">{title}</h2>
        {buttonNew && (
          <Link href={`${currentPage}/new`}>
            <Button variant="outline">
              <BsPlusCircle className="mr-4" /> Novo
            </Button>
          </Link>
        )}
      </div>
    </>
  )
}
