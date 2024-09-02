interface IInternalBannerProps {
  title: string;
  breadcrump: string;
  image: string;
}

export function InternalBanner({ title, breadcrump, image }: IInternalBannerProps) {
  return (
    <div style={{ backgroundImage: `url(${image})` }} className={`w-full h-[280px] md:h-[280px] lg:h-[400px] xl:h-[480px] bg-no-repeat bg-cover bg-bottom flex flex-col justify-end items-center pb-8 md:pb-10 lg:pb-20`}>
      <h1 className="text-4xl md:text-4xl lg:text-6xl text-neutral-50 font-semibold mb-2">{title}</h1>
      <p className="text-xs lg:text-sm text-neutral-50 uppercase">{breadcrump}</p>
    </div>
  )
}