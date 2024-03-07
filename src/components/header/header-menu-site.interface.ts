interface HeaderMenuItem {
  id: string
  label: string
  href: string
  submenuItens?: HeaderSubMenuItem[]
}

export interface HeaderMenuItens {
  itens: HeaderMenuItem[]
}

interface HeaderSubMenuItem extends Omit<HeaderMenuItem, "submenuItens"> {}
