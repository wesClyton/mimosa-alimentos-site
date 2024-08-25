import classNames from "classnames"
import Link from "next/link"
import { SOCIAL_MEDIA_HEADER } from "./social-media"
import styles from "./social-media.module.scss"

interface SocialMediaProps {
  locationRender: "header" | "footer"
}

export default function SocialMedia({ locationRender }: SocialMediaProps) {
  return (
    <ul className={classNames(styles["social-media"], styles[locationRender])}>
      {SOCIAL_MEDIA_HEADER.itens.map((item) => (
        <li key={item.id}>
          <Link
            className={classNames(styles["icon-" + item.type], styles.icon)}
            href={item.link}
            target="_blank"
          ></Link>
        </li>
      ))}
    </ul>
  )
}
