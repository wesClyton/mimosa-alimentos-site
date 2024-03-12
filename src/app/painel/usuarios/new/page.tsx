"use client"

import HeaderPage from "../../shared/components/ui/custom/header-page"
import { toast } from "../../shared/components/ui/use-toast"
import { Card, CardContent } from "../../shared/components/ui/card"
import UserForm from "../components/form-user"
import { IUserForm } from "../interface/IUserForm"
import { PostService } from "../../shared/services/api.service"

export default function UserCadastroPage() {
  const breadcrumbs = [
    {
      title: "Home",
      path: "./",
    },
    {
      title: "Usuarios",
      path: "../usuarios",
    },
    {
      title: "Cadastro",
    },
  ]

  const handleSubmit = async (data: IUserForm) => {
    await PostService("users", data)

    toast({
      title: "Usuário cadastrado com sucesso!",
      description: "data: " + JSON.stringify(data),
    })
  }

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Cadastro de usuário" />

      <Card className="w-full pt-5">
        <CardContent>
          <UserForm handleSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}
