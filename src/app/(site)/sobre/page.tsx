import { InternalBanner } from "../components/banner/InternalBanner";

export default function SobrePage() {
  return (
    <div>
      <InternalBanner title="Produtos" breadcrump="Home > Produtos" image="/site/banners/banner-produtos.png" />
      <div className="w-full h-screen">
        <h1>Sobre page</h1>
      </div>
    </div>
  )
}
