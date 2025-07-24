export interface IMenu {
  items?: IMenuItem[];
  showItemSejaUmCliente?: boolean;
}

export interface IMenuItem {
  label: string;
  href: string;
}
