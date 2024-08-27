import Image from "next/image"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import TitleHgroup from "../../components/title-hgroup/title-hgroup.component"
import TitleSection from "../../components/title-section/title-section.component"
import style from "./page.module.scss"

export default function InstitucionalPage() {
  return (
    <>
      <Header />

      <header className={style.header}>
        <video className={style.video} autoPlay muted loop playsInline>
          <source src="/site/videos/01.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={style.video__content}>
          <h1 className="title">Institucional</h1>
        </div>
      </header>

      <section className={style.mimosa}>
        <TitleHgroup texth2="Mimosa Alimentos" texth3="Há 21 anos trazendo sabor para sua família." variant="primary" />

        <Image
          width={1514}
          height={580}
          src="/site/institucional/linguicas.png"
          alt="Linguiças - Mimosa Alimentos"
        ></Image>

        <p>
          A história da Mimosa Alimentos é marcada por muito trabalho, dedicação e esforço continuo por produtos com
          sabor irresistível e qualidade inquestionável.
        </p>

        <div>
          <div>
            <p>
              A Mimosa Alimentos nasceu em 2001 atuando na distribuição de leite de saquinho em Umuarama no estado do
              Paraná, inicialmente no sistema em domicílio e posteriormente ampliando o atendimento a pequenos
              supermercados e panificadoras, onde se consolidou neste segmento.
            </p>
            <p>
              O amor em produzir alimentos sempre foi muito forte na vida dos seus fundadores, Rosângela e José
              Aparecido. Como uma forma de criar um diferencial, eles começaram a produzir linguiça frescal caseira e
              presentear os clientes da Mimosa.
            </p>
            <p>
              A aceitação foi tão grande, que os clientes passaram a fazer encomendas das linguiças. Em 2006 surgiu a
              ideia de produzir linguiça frescal em escala industrial, que se tornou o principal produto da Mimosa
              Alimentos.
            </p>
          </div>
          <div>
            <p>
              Com um amplo mix de produtos, a Mimosa Alimentos se tornou uma das mais importantes indústrias do segmento
              do Paraná, sendo a primeira fabrica de conservas a produzir linguiça com a certificação SISBI/POA -
              Sistema Brasileiro de Inspeção de Produtos de Origem Animal, e a décima do Brasil com esta certificação, o
              que a credencia, distribuir seus produtos para todo o Brasil.
            </p>
            <p>
              A marca conta com um mix próprio de 20 itens, entre linguiça Toscana, Toscana com Queijo, linguiça fina na
              tripa de carneiro - a famosa churrasquita - e a linha Churrasco, além de também realizar o fracionamento
              de frios com certificação SISBI.
            </p>
          </div>
        </div>
      </section>

      <section className={style.conheca}>
        <TitleSection text="Conheça nossa história" variant="primary" />
      </section>

      <Footer />
    </>
  )
}
