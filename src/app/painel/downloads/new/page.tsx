"use client"

import HeaderPage from "../../shared/components/ui/custom/header-page"
import { toast } from "../../shared/components/ui/use-toast"
import { Card, CardContent } from "../../shared/components/ui/card"
import { IDownloadForm } from "../interface/IDownloadForm.interface"
import { PostService } from "../../shared/services/api.service"
import { DownloadForm } from "../components/form-download"
import { useRouter } from "next/navigation"
import { MimeTypes } from "../../shared/enum/mime-types.enum"
import { useState } from "react"
import { jsonToFormData } from "../../shared/utils/utils"

export default function DownloadCadastroPage() {
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

  const [disableForm, setDisableForm] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: IDownloadForm) => {
    setDisableForm(true)
    const formData = jsonToFormData(data)

    await PostService("download", formData, undefined).then((data) => {
      if (data) {
        toast({
          variant: "success",
          title: "Download cadastrado com sucesso!",
        })
        setDisableForm(false)
        router.push("/painel/downloads")
      }
    })

    setDisableForm(false)
  }

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Cadastro de download" />

      <Card className="w-full pt-5">
        <CardContent>
          <DownloadForm handleSubmit={handleSubmit} disableForm={disableForm} />
        </CardContent>
      </Card>
    </div>
  )
}
