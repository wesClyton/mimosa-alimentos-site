"use client"

import HeaderPage from "../../shared/components/ui/custom/header-page"
import { toast } from "../../shared/components/ui/use-toast"
import { Card, CardContent } from "../../shared/components/ui/card"
import { ICustomerForm } from "../interface/ICustomerForm.interface"
import { PostService } from "../../shared/services/api.service"
import { CustomerForm } from "../components/form-cliente"
import { useRouter } from "next/navigation"
import { MimeTypes } from "../../shared/enum/mime-types.enum"
import { useState } from "react"

export default function CustomerCadastroPage() {
  const breadcrumbs = [
    {
      title: "Home",
      path: "./",
    },
    {
      title: "Clientes",
      path: "../clientes",
    },
    {
      title: "Cadastro",
    },
  ]

  const [disableForm, setDisableForm] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: ICustomerForm) => {
    setDisableForm(true)
    await PostService("customer", data, MimeTypes.Json).then((data) => {
      if (data) {
        toast({
          variant: "success",
          title: "Cliente cadastrado com sucesso!",
        })
        setDisableForm(false)
        router.push("/painel/clientes")
      }
    })
  }

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Cadastro de cliente" />

      <Card className="w-full pt-5">
        <CardContent>
          <CustomerForm handleSubmit={handleSubmit} disableForm={disableForm} />
        </CardContent>
      </Card>
    </div>
  )
}
