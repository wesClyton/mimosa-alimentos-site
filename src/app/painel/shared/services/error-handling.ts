import { toast } from "../components/ui/use-toast"
import { HttpStatusCode } from "../enum/http-status-code.enum"
import { signOut } from "next-auth/react"

export default function errorHandling(response: any): void {
  if (response.statusCode === HttpStatusCode.NotFound) {
    toast({
      title: "Erro!",
      description: `#${response.status} - Requisição não encontrada.`,
      variant: "destructive",
    })
    return
  }

  if (response.statusCode === HttpStatusCode.InternalServerError) {
    console.log(`bora redirecionar`)
    return
  }

  if (response.statusText === "Unknown Error") {
    toast({
      title: "Erro!",
      description: `Erro desconhecido.`,
      variant: "destructive",
    })
    return
  }

  if (
    response.statusCode === HttpStatusCode.Unauthorized ||
    response.statusText === "Unauthorized" ||
    response.statusCode === HttpStatusCode.Forbidden ||
    response.statusText === "Forbidden"
  ) {
    signOut()
    return
  }

  if (response.error && response) {
    let errors = ""

    response.message.map((erro: string) => {
      errors += "-" + erro + "\n"
    })

    toast({
      title: "Ouve um erro na requisição",
      description: errors,
      className: "border-2 border-rose-500",
    })

    return
  }

  toast({
    title: "Erro!",
    description: `Erro generico`,
  })
}
