"use client"

import { DataTable } from "../shared/components/ui/custom/datatable/data-table"
import { DeleteService, GetService } from "@/app/painel/shared/services/api.service"

import HeaderPage from "../shared/components/ui/custom/header-page"
import { useEffect, useState } from "react"
import { DataTableColumnHeader } from "../shared/components/ui/custom/datatable/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { ICustomerList } from "./interface/ICustomerList.interface"
import { TableActionRows } from "./components/table-action-rows"
import { ICustomerGetResponse } from "./interface/ICustomerGetResponse.interface"

const breadcrumbs = [
  {
    title: "Home",
    path: "./",
  },
  {
    title: "Clientes",
  },
]

export default function CustomerPage() {
  const [customers, setCustomers] = useState([])

  const formatCustomersList = (): ICustomerList[] => {
    return customers.map((customer: ICustomerGetResponse) => ({
      ...customer,
      city: customer.city.name,
      uf: customer.city.state.uf,
    }))
  }

  const columns: ColumnDef<ICustomerList>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "corporateName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
      cell: ({ row }) => <div>{row.getValue("corporateName")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "city",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cidade" />,
      cell: ({ row }) => {
        return <div>{row.getValue("city")}</div>
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "uf",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
      cell: ({ row }) => {
        return <div>{row.getValue("uf")}</div>
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

  const getCustomers = async () => {
    GetService("customer", { perPage: 999 }).then((data) => setCustomers(data.data))
  }

  const deleteUser = (id: string) => {
    DeleteService("customer", id).then(() => {
      getCustomers()
    })
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Listagem de clientes" buttonNew={true} />

      <div className="w-full">
        <DataTable data={formatCustomersList()} columns={columns} />
      </div>
    </div>
  )
}
