import Image from "next/image"
import Link from "next/link"
import HeaderSite from "../components/header/header-site"
import styles from "./page.module.scss"

export default function HomePage() {
  return (
    <>
      <HeaderSite />
      <section className={styles.introduction}>
        <Link href={"./"}>
          <Image
            width={1920}
            height={960}
            src={"/site/home/banner.jpg"}
            alt="Não dá para explicar, tem que experimentar. Saiba mais"
          ></Image>
        </Link>
      </section>
    </>
  )
}
