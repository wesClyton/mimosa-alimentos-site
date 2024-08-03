"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { HEADER_MENU_CONTEXT } from "../../context/context.util"
import SocialMedia from "../social-media/social-media.component"
import HeaderMenu from "./header-menu.component"
import styles from "./header.module.scss"

export default function Header() {
  const [collapsed, setCollapsed] = useState(false)

  function collapse() {
    setCollapsed(!collapsed)
  }

  return (
    <HEADER_MENU_CONTEXT.Provider value={collapsed.toString()}>
      <button
        type="button"
        className={collapsed ? styles["hamburger-active"] : styles.hamburger}
        aria-label={collapsed ? "Esconder menu" : "Mostrar menu"}
        onClick={collapse}
      ></button>

      <div className={styles["header-container"]}>
        <header className={styles.header}>
          <Link href={"./"}>
            <Image width={155} height={51} src={"/site/mimosa-alimentos-logo.svg"} alt="Mimosa Alimentos"></Image>
          </Link>

          <HeaderMenu />

          <SocialMedia locationRender="header" />
        </header>
      </div>
    </HEADER_MENU_CONTEXT.Provider>
  )
}
21219272
