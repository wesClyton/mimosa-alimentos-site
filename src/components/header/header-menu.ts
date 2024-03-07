import { HeaderMenuItens } from "./header-menu.interface"

const ID = "header-menu"

export const HEADER_MENU: HeaderMenuItens = {
  itens: [
    {
      id: `${ID}-institucional`,
      label: "Institucional",
      href: "/institucional",
    },
    {
      id: `${ID}-produtos`,
      label: "Produtos",
      href: "/produtos",
      submenuItens: [
        {
          id: `${ID}-linguicas`,
          label: "Linguiças",
          href: "/produtos/linguicas",
        },
        {
          id: `${ID}-downloads`,
          label: "Downloads",
          href: "/produtos/downloads",
        },
      ],
    },
    {
      id: `${ID}-onde-encontrar`,
      label: "Onde Encontrar",
      href: "/onde-encontrar",
    },
    {
      id: `${ID}-contato`,
      label: "Contato",
      href: "/contato",
    },
    {
      id: `${ID}-seja-um-cliente`,
      label: "Seja um Cliente",
      href: "/seja-um-cliente",
    },
  ],
}
