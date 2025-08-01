export interface IMenu {
  items?: IMenuItem[];
  menuSejaCliente?: boolean;
}

export interface IMenuItem {
  label: string;
  href: string;
}
