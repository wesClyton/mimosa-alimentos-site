"use client"

import { useEffect, useState } from "react"
import HeaderPage from "../../../shared/components/ui/custom/header-page"
import { GetService, PatchService } from "@/app/painel/shared/services/api.service"
import { ProductForm } from "../../components/form-product"
import { IProductForm } from "../../interface/IProductForm.interface"
import { jsonToFormData, removeEmptyProperty } from "@/app/painel/shared/utils/utils"
import { toast } from "@/app/painel/shared/components/ui/use-toast"
import { MimeTypes } from "@/app/painel/shared/enum/mime-types.enum"
import { IProductGetResponse } from "../../interface/IProductGetResponse.interface"

export default function UserUpdatePage({ params }: { params: { id: string } }) {
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

  const [product, setProduct] = useState<IProductGetResponse>()
  const [disableForm, setDisableForm] = useState(true)

  const handleSubmit = (data: IProductForm) => {
    setDisableForm(true)
    const cleamData = removeEmptyProperty(data)
    const formData = jsonToFormData(cleamData)

    PatchService(`product/${params.id}`, formData, undefined).then(() => {
      toast({
        variant: "success",
        title: "Produto atualizado com sucesso!",
      })
      setDisableForm(false)
    })
  }

  useEffect(() => {
    GetService(`product/${params.id}`).then((data) => {
      setProduct(data)
      setDisableForm(false)
    })
  }, [params])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Editar produto" />
      <ProductForm handleSubmit={handleSubmit} defaultValues={product} disableForm={disableForm} />
    </div>
  )
}
