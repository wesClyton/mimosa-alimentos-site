"use client"

import { DataTable } from "../shared/components/ui/custom/datatable/data-table"
import { DeleteService, GetService } from "@/app/painel/shared/services/api.service"

import HeaderPage from "../shared/components/ui/custom/header-page"
import { useEffect, useState } from "react"
import { DataTableColumnHeader } from "../shared/components/ui/custom/datatable/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { IProductList } from "./interface/IProductList.interface"
import { TableActionRows } from "./components/table-action-rows"

const breadcrumbs = [
  {
    title: "Home",
    path: "./",
  },
  {
    title: "Produtos",
  },
]

export default function ProductPage() {
  const [products, setProducts] = useState([])

  const columns: ColumnDef<IProductList>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "category",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Categoria" />,
      cell: ({ row }) => {
        return <div>{row.getValue("category")}</div>
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "size",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tamanho" />,
      cell: ({ row }) => {
        return <div>{row.getValue("size")}</div>
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("active") ? "Ativo" : "Inativo"}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="w-[20px]">
          <TableActionRows row={row} handleDelete={deleteUser} />
        </div>
      ),
    },
  ]

  const getProducts = async () => {
    GetService("product", { perPage: 999 }).then((data) => setProducts(data.data))
  }

  const deleteUser = (id: string) => {
    DeleteService("product", id).then(() => {
      getProducts()
    })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Listagem de produtos" buttonNew={true} />

      <div className="w-full">
        <DataTable data={products} columns={columns} />
      </div>
    </div>
  )
}
