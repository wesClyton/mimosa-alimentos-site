import HeaderPage from "../../shared/components/ui/custom/headerPage"

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
      <div className="w-full">formulario de cadastro</div>
    </div>
  )
}
