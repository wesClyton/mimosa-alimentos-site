import { InternalBanner } from "../components/banner/InternalBanner";

export default function ProdutosPage() {
  return (
    <>
      <div className="w-full h-screen">
        <InternalBanner title="Produtos" breadcrump="Home > Produtos" image="/site/banners/banner-produtos.png" />
        <h1>Produtos page</h1>
      </div>
    </>
  )
}
