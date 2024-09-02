import { InternalBanner } from "../components/banner/InternalBanner";

export default function DownloadsPage() {
  return (
    <>
      <div className="w-full h-screen">
        <InternalBanner title="Downloads" breadcrump="Home > Downloads" image="/site/banners/banner-downloads.png" />
        <h1>Downloads page</h1>
      </div>
    </>
  )
}
