import { DataTable } from "../shared/components/ui/custom/datatable/data-table"
import { GetService } from "@/app/painel/shared/services/api.service"

import { columns } from "./components/columns"
import HeaderPage from "../shared/components/ui/custom/header-page"

const breadcrumbs = [
  {
    title: "Home",
    path: "./",
  },
  {
    title: "Usuarios",
  },
]

export default async function UserPage() {
  const users = await GetService("user", { perPage: 999 })

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Listagem de usuários" buttonNew={true} />

      <div className="w-full">
        <DataTable data={users.data} columns={columns} />
      </div>
    </div>
  )
}
