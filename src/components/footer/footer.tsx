import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import SocialMedia from "../social-media/social-media.component"
import FooterMenu from "./footer-menu.component"
import styles from "./footer.module.scss"

export default function Footer() {
  return (
    <footer className={classNames(`${styles.footer}`, `p-10`, `lg:py-20`)}>
      <div className={styles.content}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 2xl:grid-cols-4">
          <div className="lg:col-span-2 2xl:col-span-1">
            <FooterMenu />
          </div>

          <div className={classNames(`flex`, `flex-col`, `${styles.address}`)}>
            <strong className="mb-3">Mimosa Alimentos Ltda.</strong>
            <address>
              Avenida Umuarama, 3416 <br /> 87507-055 | Umuarama-PR
            </address>
          </div>

          <div className={classNames(`flex`, `flex-col`, `${styles.sac}`)}>
            <strong className="mb-3">SAC Mimosa:</strong>
            <p className="flex justify-center gap-2 mb-4">
              <Image src="/site/footer/whatsapp.svg" width={20} height={24} alt="WhatsApp"></Image>
              <span>(44) 3626-7484</span>
            </p>

            <p>
              Horário de atendimento: <br />
              Segunda à sexta: 08:00h às 18:00h <br />
              Sábado: 08:00h AO 12:00h
            </p>
          </div>

          <div className="flex flex-col gap-5 items-center">
            <Link href={"./"}>
              <Image
                width={224}
                height={74}
                src={"/site/mimosa-alimentos-logo-yellow.svg"}
                alt="Mimosa Alimentos"
              ></Image>
            </Link>

            <SocialMedia locationRender="footer" />
          </div>
        </div>
      </div>
    </footer>
  )
}
