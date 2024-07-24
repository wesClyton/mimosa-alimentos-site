"use client"

import { useEffect, useState } from "react"
import HeaderPage from "../../../shared/components/ui/custom/header-page"
import { GetService, PatchService } from "@/app/painel/shared/services/api.service"
import { CustomerForm } from "../../components/form-cliente"
import { ICustomerForm } from "../../interface/ICustomerForm.interface"
import { removeEmptyProperty } from "@/app/painel/shared/utils/utils"
import { toast } from "@/app/painel/shared/components/ui/use-toast"
import { MimeTypes } from "@/app/painel/shared/enum/mime-types.enum"
import { ICustomerGetResponse } from "../../interface/ICustomerGetResponse.interface"

export default function UserUpdatePage({ params }: { params: { id: string } }) {
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

  const [customer, setCustomer] = useState<ICustomerGetResponse>()
  const [disableForm, setDisableForm] = useState(true)

  const handleSubmit = (data: ICustomerForm) => {
    setDisableForm(true)
    const cleamData = removeEmptyProperty(data)
    PatchService(`customer/${params.id}`, cleamData, MimeTypes.Json).then(() => {
      toast({
        variant: "success",
        title: "Cliente atualizado com sucesso!",
      })
      console.log(`diableForm: `, disableForm)
      setDisableForm(false)
    })
  }

  useEffect(() => {
    GetService(`customer/${params.id}`).then((data) => {
      setCustomer(data)
      setDisableForm(false)
    })
  }, [params])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Editar cliente" />
      <CustomerForm handleSubmit={handleSubmit} defaultValues={customer} disableForm={disableForm} />
    </div>
  )
}
