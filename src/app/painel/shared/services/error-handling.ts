import { toast } from "../components/ui/use-toast"
import { HttpStatusCode } from "../enum/http-status-code.enum"
import { signOut } from "next-auth/react"

export default function errorHandling(response: any): void {
  if (response.statusCode === HttpStatusCode.NotFound) {
    toast({
      title: "Erro!",
      description: `#${response.statusCode} - Requisição não encontrada.`,
      variant: "destructive",
    })
    return
  }

  if (response.statusCode === HttpStatusCode.InternalServerError) {
    toast({
      title: "Erro!",
      description: `#${response.statusCode} - Erro interno.`,
      variant: "destructive",
    })
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

    response.message instanceof Array
      ? response.message.map((erro: string) => {
          errors += "-" + erro + "\n"
        })
      : (errors = response.message)

    toast({
      title: "Ouve um erro na requisição",
      description: errors,
      variant: "warning",
    })

    return
  }

  toast({
    title: "Erro!",
    description: `Erro generico`,
  })
}
