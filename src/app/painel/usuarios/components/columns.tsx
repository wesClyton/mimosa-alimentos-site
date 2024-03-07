"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "../../shared/components/ui/custom/datatable/data-table-column-header"
import { DataTableRowActions } from "../../shared/components/ui/custom/datatable/data-table-row-actions"
import { IUSerList } from "../interface/IUserList.interface"

export const columns: ColumnDef<IUSerList>[] = [
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
        <DataTableRowActions row={row} />
      </div>
    ),
  },
]
