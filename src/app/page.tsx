import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import Banner from "../components/banner/banner.component"
import button from "./css/button/button.module.scss"
import style from "./page.module.scss"

export default function HomePage() {
  return (
    <>
      <Banner />

      <section className={style["section-produtos"]}>
        <Image
          width={1920}
          height={1200}
          src="/site/home/section-produtos.png"
          alt="Tudo fica mais gostoso com os alimentos Mimosa"
        ></Image>

        <div className={style.content}>
          <h2>Tudo fica mais gostoso com os alimentos Mimosa</h2>
          <Link href="produtos">
            <button type="button" className={classNames(`${button.btn}`, `${button["btn-primary"]}`)}>
              Configura os nossos produtos
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
