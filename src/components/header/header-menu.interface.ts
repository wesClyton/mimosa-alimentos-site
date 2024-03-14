export interface HeaderMenuItem {
  id: string
  label: string
  href: string
  submenuItens?: HeaderSubmenuItem[]
}

export interface HeaderMenuItens {
  itens: HeaderMenuItem[]
}

export interface HeaderSubmenuItem extends Omit<HeaderMenuItem, "submenuItens"> {}
