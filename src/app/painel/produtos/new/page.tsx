"use client"

import HeaderPage from "../../shared/components/ui/custom/header-page"
import { toast } from "../../shared/components/ui/use-toast"
import { Card, CardContent } from "../../shared/components/ui/card"
import { IProductForm } from "../interface/IProductForm.interface"
import { PostService } from "../../shared/services/api.service"
import { ProductForm } from "../components/form-product"
import { useRouter } from "next/navigation"
import { MimeTypes } from "../../shared/enum/mime-types.enum"
import { useState } from "react"
import { jsonToFormData } from "../../shared/utils/utils"

export default function ProductCadastroPage() {
  const breadcrumbs = [
    {
      title: "Home",
      path: "./",
    },
    {
      title: "Produtos",
      path: "../produtos",
    },
    {
      title: "Cadastro",
    },
  ]

  const [disableForm, setDisableForm] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: IProductForm) => {
    setDisableForm(true)
    const formData = jsonToFormData(data)

    await PostService("product", formData, undefined).then((data) => {
      if (data) {
        toast({
          variant: "success",
          title: "Produto cadastrado com sucesso!",
        })
        setDisableForm(false)
        router.push("/painel/produtos")
      }
    })

    setDisableForm(false)
  }

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Cadastro de produto" />

      <Card className="w-full pt-5">
        <CardContent>
          <ProductForm handleSubmit={handleSubmit} disableForm={disableForm} />
        </CardContent>
      </Card>
    </div>
  )
}
