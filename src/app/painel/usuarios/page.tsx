"use client"

import { DataTable } from "../shared/components/ui/custom/datatable/data-table"
import { DeleteService, GetService } from "@/app/painel/shared/services/api.service"

import HeaderPage from "../shared/components/ui/custom/header-page"
import { useEffect, useState } from "react"
import { DataTableColumnHeader } from "../shared/components/ui/custom/datatable/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { IUSerList } from "./interface/IUserList.interface"
import { TableActionRows } from "./components/table-action-rows"

const breadcrumbs = [
  {
    title: "Home",
    path: "./",
  },
  {
    title: "Usuarios",
  },
]

export default function UserPage() {
  const [users, setUsers] = useState([])

  const columns: ColumnDef<IUSerList>[] = [
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
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
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

  const getUsers = async () => {
    GetService("user", { perPage: 999 }).then((data) => setUsers(data.data))
  }

  const deleteUser = (id: string) => {
    DeleteService("user", id).then(() => {
      getUsers()
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Listagem de usuários" buttonNew={true} />

      <div className="w-full">
        <DataTable data={users} columns={columns} />
      </div>
    </div>
  )
}
