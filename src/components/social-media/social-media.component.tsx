import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { SOCIAL_MEDIA_HEADER } from "./social-media"
import styles from "./social-media.module.scss"

interface SocialMediaProps {
  locationRender: "header" | "footer"
}

export default function SocialMedia({ locationRender }: SocialMediaProps) {
  const ICON_COLOR = locationRender === "header" ? "white" : "red"

  return (
    <ul className={classNames(styles["social-media"], styles[locationRender])}>
      {SOCIAL_MEDIA_HEADER.itens.map((item) => (
        <li key={item.id}>
          <Link href={item.link} target="_blank">
            <Image src={`site/social/${item.type}-${ICON_COLOR}.svg`} alt={item.type} width={20} height={22}></Image>
          </Link>
        </li>
      ))}
    </ul>
  )
}
