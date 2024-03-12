"use client"

import { DataTable } from "../shared/components/ui/custom/datatable/data-table"
import { GetService } from "@/app/painel/shared/services/api.service"

import { columns } from "./components/columns"
import HeaderPage from "../shared/components/ui/custom/header-page"
import { useEffect, useState } from "react"

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

  useEffect(() => {
    GetService("user", { perPage: 999 }).then((data) => setUsers(data.data))
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
