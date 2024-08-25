import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import Banner from "../components/banner/banner.component"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import button from "./css/button/button.module.scss"
import style from "./page.module.scss"

export default function HomePage() {
  return (
    <>
      <Header />
      <Banner />

      <section className={style["section-produtos"]}>
        <Image
          width={1920}
          height={1374}
          src="/site/home/section-produtos.png"
          alt="Tudo fica mais gostoso com os alimentos Mimosa"
        ></Image>

        <div className={style.content}>
          <Link href="produtos">
            <button type="button" className={classNames(`${button.btn}`, `${button["btn-primary"]}`)}>
              Confira os nossos produtos
            </button>
          </Link>
        </div>
      </section>

      <section className={style["section-cliente"]}>
        <div
          className={classNames(
            `${style.content}`,
            `flex`,
            `flex-col`,
            `gap-10`,
            `p-10`,
            `md:py-20`,
            `md:gap-20`,
            `md:flex-row`,
            `md:justify-center`,
            `lg:gap-40`,
            `lg:py-40`,
          )}
        >
          <h3 className="text-center md:w-2/4 md:text-right">
            Lorem ipsum dolor sit amet consectetur eget amet at metus nunc eu in blandit.
          </h3>
          <button type="button" className={classNames(`${button.btn}`, `${button["btn-secondary"]}`)}>
            Torne-se um cliente da Mimosa
          </button>
        </div>
      </section>

      <section className={style["section-nossa-historia"]}>
        <div
          className={classNames(
            `${style.content}`,
            `flex`,
            `flex-col`,
            `pt-10`,
            `items-end`,
            `md:flex-row`,
            `md:items-center`,
            `md:pl-20`,
          )}
        >
          <div className="w-full text-center mb-10 md:mb-0 md:text-left xl:pl-50 2xl:pl-80">
            <h3>Mimosa Alimentos</h3>
            <p>Uma história de amor e dedicação!</p>
            <button type="button" className={classNames(`${button.btn}`, `${button["btn-primary"]}`)}>
              Conheça nossa história
            </button>
          </div>
          <Image
            src="/site/home/section-nossa-historia-mulher.png"
            alt="Mimosa Alimentos - Uma história de amor e dedicação!"
            width={1089}
            height={751}
          ></Image>
        </div>
      </section>

      <section className={classNames(`${style["section-qualidade"]}`)}>
        <div className={classNames(`${style.content}`, `p-10`, `flex`, `flex-row`, `justify-end`)}>
          <div className="w-2/4">
            <Image
              width={472}
              height={341}
              src="/site/home/section-qualidade-text.png"
              alt="Leve a qualidade dos produtos Mimosa até você!"
            ></Image>

            <p className="py-5 text-center">Solicite a visa de um representante!</p>

            <button type="button" className={classNames(`${button.btn}`, `${button["btn-secondary"]}`)}>
              Agende uma visita
            </button>
          </div>
        </div>
      </section>

      <section className={style["section-onde-encontrar"]}>
        <div className={classNames(`${style.content}`)}></div>
      </section>
      <Footer />
    </>
  )
}
