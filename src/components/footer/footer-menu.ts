import { FooterMenuItens } from "./footer-menu.interface"

const ID = "footer-menu"

export const FOOTER_MENU: FooterMenuItens = {
  itens: {
    col1: [
      {
        id: `${ID}-home`,
        label: "Home",
        href: "/",
      },
      {
        id: `${ID}-a-mimosa`,
        label: "A Mimosa",
        href: "/institucional",
      },
      {
        id: `${ID}-qualidade`,
        label: "Qualidade",
        href: "/qualidade",
      },
      {
        id: `${ID}-produtos`,
        label: "Produtos",
        href: "/produtos",
      },
    ],
    col2: [
      {
        id: `${ID}-Downloads`,
        label: "Downloads",
        href: "/downloads",
      },
      {
        id: `${ID}-onde-encontrar`,
        label: "Onde encontrar",
        href: "/onde-encontrar",
      },
      {
        id: `${ID}-seja-um-cliente`,
        label: "Seja um cliente",
        href: "/seja-um-cliente",
      },
      {
        id: `${ID}-contato`,
        label: "Contato",
        href: "/produtos",
      },
    ],
  },
}
