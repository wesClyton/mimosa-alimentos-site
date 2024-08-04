import classNames from "classnames"
import Link from "next/link"
import { FOOTER_MENU } from "./footer-menu"
import styles from "./footer.module.scss"

export default function FooterMenu() {
  return (
    <nav className={classNames(`${styles["nav"]}`, `flex`, `flex-col`, `lg:flex-row`, `lg:gap-10`, `xl:gap-20`)}>
      <ul className="flex flex-col gap-3 mb-3 lg:mb-0">
        {FOOTER_MENU.itens.col1.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-3">
        {FOOTER_MENU.itens.col2.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
