import { InternalBanner } from "../components/banner/InternalBanner";

export default function ContatoPage() {
  return (
    <>
      <div className="w-full h-screen">
        <InternalBanner title="Contato" breadcrump="Home > Contato" image="/site/banners/banner-contato.png" />
        <h1>Contato page</h1>
      </div>
    </>
  )
}
