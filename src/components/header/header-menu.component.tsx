import { HEADER_MENU_CONTEXT } from "@/context/context.util"
import Link from "next/link"
import { useContext, useState } from "react"
import { HEADER_MENU } from "./header-menu"
import { HeaderSubmenuItem } from "./header-menu.interface"
import styles from "./header.module.scss"

export default function HeaderMenu() {
  let collapsed = useContext(HEADER_MENU_CONTEXT)

  const [shouldShowSubmenu, setShouldShowSubmenu] = useState(false)

  function hasSubmenu(submenuItens: HeaderSubmenuItem[] | undefined): boolean {
    return submenuItens?.length! > 0
  }

  const showSubmenu = (hasSubmenu: boolean) => {
    if (hasSubmenu) setShouldShowSubmenu(!shouldShowSubmenu)
  }

  return (
    <>
      <nav className={`${styles["nav"]} ${collapsed === "true" ? styles["nav-active"] : ""}`}>
        <ul>
          {HEADER_MENU.itens.map((item) => (
            <li key={item.id} className={hasSubmenu(item.submenuItens) ? styles["has-submenu"] : ""}>
              <Link
                className={`${shouldShowSubmenu ? styles["link-submenu-active"] : ""}`}
                onClick={() => showSubmenu(hasSubmenu(item.submenuItens))}
                href={hasSubmenu(item.submenuItens) ? "#" : item.href}
              >
                {item.label}
              </Link>

              {hasSubmenu(item.submenuItens) ? (
                <ul className={`${styles["submenu"]} ${shouldShowSubmenu ? styles["submenu-active"] : ""}`}>
                  {item.submenuItens?.map((submenuItem) => (
                    <li key={submenuItem.id} id={item.id}>
                      <Link href={submenuItem.href}>{submenuItem.label}</Link>
                    </li>
                  ))}
                </ul>
              ) : undefined}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
