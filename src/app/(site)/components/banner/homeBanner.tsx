import { ButtonBase } from "../buttonBase/ButtonBase"
import { ImageBg } from "../imageBg/ImageBg"

interface HomeBannerProps {
  image: string
  title: string | TrustedHTML
  button?: {
    title: string
    href: string
  }
}

export function HomeBanner({ image, title, button }: HomeBannerProps) {
  return (
    <ImageBg image={image} className="data-bg w-full h-screen bg-no-repeat bg-cover bg-center">
      <div className="container grid grid-cols-12 h-full">
        <div className="col-span-12 md:col-start-7 md:col-span-5">
          <div className="flex flex-col h-full w-full justify-center text-neutral-50 uppercase text-5xl md:text-8xl">
            <h2 dangerouslySetInnerHTML={{ __html: title }} className="tusker_700 " />
            {button && <ButtonBase title={button.title} href={button.href} />}
          </div>
        </div>
      </div>
    </ImageBg>
  )
}
