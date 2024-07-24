"use client"

import HeaderPage from "../../shared/components/ui/custom/header-page"
import { toast } from "../../shared/components/ui/use-toast"
import { Card, CardContent } from "../../shared/components/ui/card"
import { ITimelineForm } from "../interface/ITimelineForm"
import { PostService } from "../../shared/services/api.service"
import { TimelineForm } from "../components/form-timeline"
import { useRouter } from "next/navigation"
import { jsonToFormData } from "../../shared/utils/utils"

export default function UserCadastroPage() {
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

  const router = useRouter()

  const handleSubmit = async ({ active, date, description, title, image }: ITimelineForm) => {
    const FormatedDate = new Date(date).toISOString()
    const formData = jsonToFormData({ active, date: FormatedDate, description, title, image })

    await PostService("timeline", formData, undefined).then((data) => {
      if (data) {
        toast({
          variant: "success",
          title: "Timeline cadastrada com sucesso!",
        })

        router.push("/painel/timeline")
      }
    })
  }

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Cadastro de timeline" />

      <Card className="w-full pt-5">
        <CardContent>
          <TimelineForm handleSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}
