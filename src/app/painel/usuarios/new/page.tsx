"use client"

import HeaderPage from "../../shared/components/ui/custom/header-page"
import { toast } from "../../shared/components/ui/use-toast"
import { Card, CardContent } from "../../shared/components/ui/card"
import { IUserForm } from "../interface/IUserForm"
import { PostService } from "../../shared/services/api.service"
import { UserForm } from "../components/form-user"
import { useRouter } from "next/navigation"
import { MimeTypes } from "../../shared/enum/mime-types.enum"

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

  const router = useRouter()

  const handleSubmit = async (data: IUserForm) => {
    const { active, email, name, password } = data

    await PostService("user", { active, email, name, password }, MimeTypes.Json).then((data) => {
      if (data) {
        toast({
          variant: "success",
          title: "Usuário cadastrado com sucesso!",
        })

        router.push("/painel/usuarios")
      }
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
