"use client"

import { useEffect, useState } from "react"
import HeaderPage from "../../../shared/components/ui/custom/header-page"
import { GetService, PatchService } from "@/app/painel/shared/services/api.service"
import { DownloadForm } from "../../components/form-download"
import { IDownloadForm } from "../../interface/IDownloadForm.interface"
import { jsonToFormData, removeEmptyProperty } from "@/app/painel/shared/utils/utils"
import { toast } from "@/app/painel/shared/components/ui/use-toast"
import { IDownloadGetResponse } from "../../interface/IDownloadGetResponse.interface"

export default function UserUpdatePage({ params }: { params: { id: string } }) {
  const breadcrumbs = [
    {
      title: "Home",
      path: "./",
    },
    {
      title: "Downloads",
      path: "../downloads",
    },
    {
      title: "Cadastro",
    },
  ]

  const [download, setDownload] = useState<IDownloadGetResponse>()
  const [disableForm, setDisableForm] = useState(true)

  const handleSubmit = (data: IDownloadForm) => {
    setDisableForm(true)
    const cleamData = removeEmptyProperty(data)
    const formData = jsonToFormData(cleamData)

    PatchService(`download/${params.id}`, formData, undefined).then(() => {
      toast({
        variant: "success",
        title: "Download atualizado com sucesso!",
      })
      setDisableForm(false)
    })
  }

  useEffect(() => {
    GetService(`download/${params.id}`).then((data) => {
      setDownload(data)
      setDisableForm(false)
    })
  }, [params])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Editar download" />
      <DownloadForm handleSubmit={handleSubmit} defaultValues={download} disableForm={disableForm} />
    </div>
  )
}
