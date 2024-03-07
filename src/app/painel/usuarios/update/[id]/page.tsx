import HeaderPage from "../../../shared/components/ui/custom/header-page"

export default function UserUpdatePage({ params }: { params: { id: string } }) {
  const breadcrumbs = [
    {
      title: "Home",
      path: "./",
    },
    {
      title: "Usuarios",
      path: "../",
    },
    {
      title: "Edição",
    },
  ]

  console.log(`params`, params)

  return (
    <div>
      <HeaderPage breadcrumbs={breadcrumbs} title="Editar Usuário" />
      <div className="w-full">Editar Usuário: {params.id}</div>
    </div>
  )
}
