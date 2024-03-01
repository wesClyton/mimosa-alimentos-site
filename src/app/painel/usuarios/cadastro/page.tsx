import Breadcrumbs from "../../components/breadcrumb"

export default function UserCadastroPage() {
  const breadcrumbs = [
    {
      title: "Home",
      path: "./",
    },
    {
      title: "Usuarios",
      path: "../usuarios",
    },
    {
      title: "Cadastro",
    },
  ]

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="text-3xl font-bold tracking-tight my-4">Cadastro de Usuário</h2>
    </div>
  )
}
