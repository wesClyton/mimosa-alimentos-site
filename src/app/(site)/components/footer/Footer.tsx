import { FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import { SocialMedia } from "./SocialMedia"
import { NavFooter } from "./NavFooter"

export function Footer() {
  const menuLinks1 = [
    { id: 1, name: "Início", url: "/" },
    { id: 1, name: "Institucional", url: "/sobre" },
    { id: 2, name: "Produtos", url: "/produtos" },
    { id: 3, name: "Onde Encontrar", url: "/onde-encontrar" },
  ]

  const menuLinks2 = [
    { id: 4, name: "Downloads", url: "/downloads" },
    { id: 4, name: "Seja um Cliente", url: "/seja-um-cliente" },
    { id: 4, name: "Contato", url: "/contato" },
  ]

  return (
    <footer className="w-full bg-red-500 py-10">
      <div className="container sm:flex sm:flex-wrap sm:gap-20 sm:justify-center md:flex-nowrap md:gap-0 md:justify-between items-center lg:items-start md:max-w-screen-md lg:max-w-screen-lg lg:mx-auto xl:max-w-screen-xl xl:px-20 2xl:max-w-[1400px]">
        <div className="lg:flex lg:gap-5 xl:gap-10">
          <NavFooter menuLinks={menuLinks1} className="mb-4 text-center sm:text-left" />
          <NavFooter menuLinks={menuLinks2} className="text-center sm:text-left" />
        </div>
        <div className="lg:flex lg:gap-5 xl:gap-20">
          <div className="my-8 text-center sm:text-left sm:mt-0">
            <h2 className="text-yellow-500 uppercase font-semibold pb-2">Mimosa Alimentos LTDA.</h2>
            <p className="text-neutral-50 text-sm uppercase">
              Avenida Umuarama, 3416 <br /> 87507-055 | Umuarama - PR
            </p>
          </div>

          <div className="text-center sm:text-left ">
            <h2 className="text-yellow-500 uppercase font-semibold pb-2">SAC Mimosa:</h2>
            <div className="flex items-center mb-4 justify-center sm:justify-normal">
              <FaWhatsapp size={20} className="text-neutral-50" />
              <Link href="/" className="font-semibold text-neutral-50 ml-1">
                (44) 3621-1234
              </Link>
            </div>
            <div>
              <p className="text-neutral-50 text-sm md:text-xs xl:text-sm uppercase">HORÁRIO DE ATENDIMENTO:</p>
              <p className="text-neutral-50 text-sm md:text-xs xl:text-sm uppercase">SEGUNDA À SEXTA: 08:00H ÀS 18:00H</p>
              <p className="text-neutral-50 text-sm md:text-xs xl:text-sm uppercase">SÁBADO: 08:00H AO 12:00H </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8 md:mt-0">
          <Link href="/">
            <Image src="/site/logo-footer.svg" alt="Mimosa Alimentos" className="lg:w-[160px] xl:w-[224px]" width={224} height={74} />
          </Link>
          <SocialMedia />
        </div>
      </div>
    </footer>
  )
}
