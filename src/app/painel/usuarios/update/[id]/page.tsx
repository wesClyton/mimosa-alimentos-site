"use client"

import { useEffect, useState } from "react"
import HeaderPage from "../../../shared/components/ui/custom/header-page"
import { GetService } from "@/app/painel/shared/services/api.service"
import { UserForm } from "../../components/form-user"
import { IUserForm } from "../../interface/IUserForm"

export default function UserUpdatePage({ params }: { params: { id: string } }) {
  const breadcrumbs = [
    {
      title: "Home",
      path: "./",
    },
    {
      title: "Usuarios",
      path: "../",
    },
    {
      title: "Edição",
    },
  ]

  const [user, setUser] = useState<Array<IUserForm>>([])

  const handleSubmit = (e: any) => {
    console.log(e)
  }

  useEffect(() => {
    GetService("user", { id: params.id }).then((data) => setUser(data.data))
  }, [params])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Editar Usuário" />

      <UserForm handleSubmit={handleSubmit} defaultValues={user[0]} />

      <div className="w-full">
        Editar Usuário: <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  )
}
