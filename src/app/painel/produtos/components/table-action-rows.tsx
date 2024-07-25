"use client"

import { Row } from "@tanstack/react-table"

import { BsThreeDots } from "react-icons/bs"

import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../shared/components/ui/dropdown-menu"

import { Button } from "../../shared/components/ui/button"
import { Alert } from "../../shared/components/ui/custom/alert"
import { usePathname, useRouter } from "next/navigation"

interface TableActionRowsProps<TData> {
  row: Row<TData>
  handleDelete: (id: string) => void
}

export function TableActionRows<TData>({ row, handleDelete }: TableActionRowsProps<TData>) {
  const dataRow: any = row.original
  const currentPage = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <BsThreeDots className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href={`${currentPage}/update/${dataRow?.id}`}>Editar</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Alert
          title="Excluir Timeline"
          triggerElm={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Excluir <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          }
          onConfirm={() => handleDelete(dataRow.id)}
        ></Alert>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
