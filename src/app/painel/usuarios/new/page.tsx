import HeaderPage from "../../shared/components/ui/custom/header-page"

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
      <HeaderPage breadcrumbs={breadcrumbs} title="Cadastro de usuário" />
      <div className="w-full">Cadastrar Usuário</div>
    </div>
  )
}
