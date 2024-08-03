"use client"

import { DataTable } from "../shared/components/ui/custom/datatable/data-table"
import { DeleteService, GetService } from "@/app/painel/shared/services/api.service"

import HeaderPage from "../shared/components/ui/custom/header-page"
import { useEffect, useState } from "react"
import { DataTableColumnHeader } from "../shared/components/ui/custom/datatable/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { IDownloadList } from "./interface/IDownloadList.interface"
import { TableActionRows } from "./components/table-action-rows"

const breadcrumbs = [
  {
    title: "Home",
    path: "./",
  },
  {
    title: "Downloads",
  },
]

export default function DownloadPage() {
  const [downloads, setDownloads] = useState([])

  const columns: ColumnDef<IDownloadList>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Titulo" />,
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
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

  const getDownloads = async () => {
    GetService("download", { perPage: 999 }).then((data) => setDownloads(data.data))
  }

  const deleteUser = (id: string) => {
    DeleteService("download", id).then(() => {
      getDownloads()
    })
  }

  useEffect(() => {
    getDownloads()
  }, [])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Listagem de downloads" buttonNew={true} />

      <div className="w-full">
        <DataTable data={downloads} columns={columns} />
      </div>
    </div>
  )
}
