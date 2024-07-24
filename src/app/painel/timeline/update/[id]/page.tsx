"use client"

import { useEffect, useState } from "react"
import HeaderPage from "../../../shared/components/ui/custom/header-page"
import { GetService, PatchService } from "@/app/painel/shared/services/api.service"
import { TimelineForm } from "../../components/form-timeline"
import { ITimelineForm } from "../../interface/ITimelineForm"
import { jsonToFormData, removeEmptyProperty } from "@/app/painel/shared/utils/utils"
import { toast } from "@/app/painel/shared/components/ui/use-toast"

export default function TimelineUpdatePage({ params }: { params: { id: string } }) {
  const breadcrumbs = [
    {
      title: "Home",
      path: "./",
    },
    {
      title: "Timeline",
      path: "../timeline",
    },
    {
      title: "Cadastro",
    },
  ]

  const [timeline, setTimeline] = useState<ITimelineForm>()

  const handleSubmit = (data: ITimelineForm) => {
    const cleamData = removeEmptyProperty(data)
    const FormatedDate = new Date(data.date).toISOString()
    cleamData.date = FormatedDate
    const formData = jsonToFormData(cleamData)

    PatchService(`timeline/${params.id}`, formData, undefined).then(() => {
      toast({
        variant: "success",
        title: "Timeline atualizado com sucesso!",
      })
    })
  }

  useEffect(() => {
    GetService(`timeline/${params.id}`).then((data) => setTimeline(data))
  }, [params])

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Editar Timeline" />
      <TimelineForm handleSubmit={handleSubmit} defaultValues={timeline} />
    </div>
  )
}
