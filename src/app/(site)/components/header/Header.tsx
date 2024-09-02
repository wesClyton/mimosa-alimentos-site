"use client"

import { useState } from "react"
import Image from "next/image"
import { MobileMenuButton } from "./MobileMenuButton"
import { Navbar } from "./Navbar"
import { SocialMedia } from "./SocialMedia"
import Link from "next/link"

export function Header() {
  const menuLinks = [
    { id: 1, name: "Institucional", url: "/sobre" },
    { id: 2, name: "Produtos", url: "/produtos" },
    { id: 3, name: "Onde Encontrar", url: "/onde-encontrar" },
    { id: 4, name: "Contato", url: "/contato" },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed w-full">
      <div className="container w-auto">
        <nav className="flex items-center justify-between flex-wrap bg-red-500 rounded-2xl m-4 lg:max-w-screen-lg lg:mx-auto xl:max-w-screen-xl 2xl:max-w-[1400px] p-6">
        <div className="flex items-center flex-shrink-0 text-white mx-auto lg:mx-0 lg:mr-7 xl:mr-20">
          <Link href="/">
            <Image src="/site/logo-header.svg" width={155} height={52} className="mr-2" alt="Logo Mimosa Alimentos" />
          </Link>
        </div>
        <div className="block lg:hidden">
          <MobileMenuButton setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
          <Navbar menuLinks={menuLinks} />

          <div className="flex flex-col items-center lg:flex-row">
            <Link
              href="/seja-um-cliente"
              className="inline-block py-3 px-8 leading-none text-sm text-center w-auto bg-red-600 rounded-lg text-white hover:bg-red-700 hover:text-yellow-500 font-semibold my-4 lg:mr-10"
            >
              Seja um Cliente
            </Link>
            <SocialMedia />
          </div>
        </div>
      </nav>
      </div>
    </header>
  )
}
