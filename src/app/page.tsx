import { Poppins } from "next/font/google"
import { Header } from "./(site)/components/header/Header"
import "./globals.css"
import { Footer } from "./(site)/components/footer/Footer"
import { HomeBanner } from "./(site)/components/banner/homeBanner"
import Image from "next/image"
import { ButtonBase } from "./(site)/components/buttonBase/ButtonBase"
import { ImageBg } from "./(site)/components/imageBg/ImageBg"

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full">
        <HomeBanner
          image="/site/banners/home-first"
          title="Não dá para explicar, <br/> tem que experimentar"
          button={{ title: "Saiba mais", href: "/" }}
        />
        <HomeBanner
          image="/site/banners/home-produtos"
          title="Tudo fica <br/> mais gostoso <br /> com os produtos mimosa"
          button={{ title: "Conheça nossos produtos", href: "/" }}
        />

        <div className="py-16 h-[400px] md:py-0 bg-red-500 text-yellow-500">
          <div className="container h-full flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2 flex justify-end">
              <h2 className="text-center md:text-right md:w-2/3 text-3xl">
                Lorem ipsum dolor sit amet consectetur eget amet at metus nunc eu in blandit.
              </h2>
            </div>
            <div className=" md:w-1/2">
              <ButtonBase title="Torne-se um cliente Mimosa" href="" bg="bg-yellow-500" color="text-red-500" />
            </div>
          </div>
        </div>

        <div className="relative h-screen md:h-[700px] -mt-14">
          <ImageBg
            image="/site/banners/home-conheca-nossa-historia"
            className="lg:bg-image w-full h-[700px] flex items-center lg:bg-top z-10 relative"
          >
            <div className="container grid grid-cols-10">
              <div className="lg:col-start-2 col-span-10 lg:col-span-3">
                <h2 className="text-6xl text-red-500 font-bold">
                  Mimosa <br /> Alimentos
                </h2>
                <p className="text-3xl text-neutral-50 pt-6 pb-14">Uma história de amor e dedicação!</p>
                <ButtonBase title="Conheça nossa história" href="" />
              </div>
            </div>
          </ImageBg>
          <div className="absolute w-full h-[644px] bg-yellow-600 bottom-0"></div>
        </div>

        <ImageBg
          image="/site/banners/home-leve-qualidade-dos-produtos-mimosa"
          className="w-full h-screen bg-no-repeat bg-cover lg:bg-center mt-0"
        >
          <div className="container grid grid-cols-12 h-full">
            <div className="col-span-12 lg:col-start-7 lg:col-span-5">
              <div className="flex flex-col h-full w-full justify-center items-center text-4xl lg:text-5xl text-neutral-50 uppercase text-center">
                <Image
                  src="/site/banners/vector-linguica.png"
                  width={161}
                  height={56}
                  className="mb-10"
                  alt="Linguiças Mimosa"
                />
                <h2 className="tusker_700">
                  Leve a{" "}
                  <span className="text-yellow-500 text-6xl lg:text-8xl block py-2 leading-tight">qualidade</span> dos
                  produtos <span className="block">Mimosa até você!</span>
                </h2>
                <ButtonBase title="Conheça nossos produtos" href="/" bg="bg-yellow-500" color="text-neutral-950" />
              </div>
            </div>
          </div>
        </ImageBg>

        <section className="relative overflow-hidden h-screen lg:h-[42rem] bg-yellow-500">
          <div className="flex h-full">
            <video
              className="absolute w-full lg:static lg:w-1/2 h-full object-cover -translate-1/2 opacity-25 z-10"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/site/videos/04.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="text-center w-full lg:bg-yellow-500 flex justify-center items-center z-30">
              <div className="p-4 lg:p-0">
                <Image
                  width={168}
                  height={265}
                  src="/site/home/pin.svg"
                  alt="Onde encontrar Mimosa!"
                  className="text-red-500 inline-block"
                />
                <h3 className="text-3xl lg:text-6xl text-red-500 tusker_700">
                  Onde encontrar <br /> Mimosa!
                </h3>
                <p className="text-base lg:text-lg py-8">Descubra um fornecedor Mimosa mais próximo de você!</p>
                <ButtonBase href="" title="Encontre os nossos fornecedores" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
