import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import button from "../../app/css/button/button.module.scss"
import { generateId } from "../../lib/utils"
import styles from "./banner.module.scss"

interface Banner {
  id: string
  imagePath: string
  imageText: string
  alt: string
  link: string
  btnLabel: string
}

export default function Banner() {
  const BTN_CLASS_NAMES = classNames(button.btn, button["btn-primary"])

  const PATH_BANNERS = "/site/home/banners"

  const BANNERS: Banner[] = [
    {
      alt: "Não dá para explicar, tem que experimentar. Saiba mais",
      id: generateId(),
      imagePath: "banner-01/image.png",
      imageText: "banner-01/text.png",
      link: "google.com.br",
      btnLabel: "Saiba mais",
    },
    // {
    //   alt: "Conheça nossa linha de produtos e se surpreenda com a qualidade Mimosa. Veja mais",
    //   id: generateId(),
    //   imagePath: "banner-02/image.png",
    //   imageText: "banner-02/text.png",
    //   link: "google.com.br",
    //   btnLabel: "Veja mais",
    // },
  ]

  return (
    <>
      <section className={styles.banners}>
        {BANNERS.map((banner) => (
          <Link key={banner.id} href={banner.link} target="_self">
            <div className={styles.content}>
              <Image
                className={styles["content-image"]}
                width={1920}
                height={960}
                src={`${PATH_BANNERS}/${banner.imagePath}`}
                alt={banner.alt}
              ></Image>
              <div className={styles["content-text"]}>
                <Image width={687} height={513} alt={banner.alt} src={`${PATH_BANNERS}/${banner.imageText}`}></Image>
                <button className={BTN_CLASS_NAMES}>{banner.btnLabel}</button>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}
