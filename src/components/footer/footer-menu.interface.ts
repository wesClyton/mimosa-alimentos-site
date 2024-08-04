export interface FooterMenuItem {
  id: string
  label: string
  href: string
}

export interface FooterMenuItens {
  itens: {
    col1: FooterMenuItem[]
    col2: FooterMenuItem[]
  }
}
