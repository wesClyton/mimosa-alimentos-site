"use client"

import { DataTable } from "../shared/components/ui/custom/datatable/data-table"
import { DeleteService, GetService } from "@/app/painel/shared/services/api.service"

import HeaderPage from "../shared/components/ui/custom/header-page"
import { useEffect, useState } from "react"
import { TableActionRows } from "./components/table-action-rows"
import { DataTableColumnHeader } from "../shared/components/ui/custom/datatable/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { ITimelineList } from "./interface/ITimelineList.interface"

const breadcrumbs = [
  {
    title: "Home",
    path: "./",
  },
  {
    title: "Timeline",
  },
]

export default function UserPage() {
  const [timelines, setTimelines] = useState([])

  const columns: ColumnDef<ITimelineList>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "date",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
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
          <TableActionRows row={row} handleDelete={deleteTimeline} />
        </div>
      ),
    },
  ]

  const getTimelines = async () => {
    GetService("timeline", { perPage: 999 }).then((data) => setTimelines(data.data))
  }

  const deleteTimeline = (id: string) => {
    DeleteService("timeline", id).then(() => {
      getTimelines()
    })
  }

  useEffect(() => {
    getTimelines()
  }, [])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Listagem de timelines" buttonNew={true} />

      <div className="w-full">
        <DataTable data={timelines} columns={columns} />
      </div>
    </div>
  )
}
