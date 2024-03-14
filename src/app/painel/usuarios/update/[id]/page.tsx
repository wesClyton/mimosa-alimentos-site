"use client"

import { useEffect, useState } from "react"
import HeaderPage from "../../../shared/components/ui/custom/header-page"
import { GetService, PatchService } from "@/app/painel/shared/services/api.service"
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

  const [user, setUser] = useState<IUserForm>()

  const handleSubmit = (data: IUserForm) => {
    PatchService(`user/${params.id}`, data).then((data) => console.log(`data update`, data))
  }

  useEffect(() => {
    GetService(`user/${params.id}`).then((data) => setUser(data))
  }, [params])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Editar Usuário" />

      <UserForm handleSubmit={handleSubmit} defaultValues={user} />

      <div className="w-full mt-20">
        Editar Usuário: <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  )
}
