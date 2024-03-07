import Image from "next/image"
import Link from "next/link"
import { HEADER_MENU } from "./header-menu"

export default function HeaderMenu() {
  return (
    <nav id="header-menu-nav">
      <ul>
        <li>
          <Link href={"./"}>
            <Image width={155} height={51} src={"./site/mimosa-alimentos-logo.svg"} alt="Mimosa Alimentos"></Image>
          </Link>
        </li>

        {HEADER_MENU.itens.map((item) => (
          <li key={item.id} id={item.id}>
            <Link href={item.href}>{item.label}</Link>

            {item.submenuItens?.length ? (
              <ul className="header-submenu">
                {item.submenuItens?.map((submenuItem) => (
                  <li key={submenuItem.id} id={item.id}>
                    <Link href={submenuItem.href}>{submenuItem.label}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
