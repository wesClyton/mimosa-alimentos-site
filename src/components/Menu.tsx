import type { IMenu, IMenuItem } from '@interfaces/menu.interface';

const defaultMenuItems: IMenuItem[] = [
  {
    label: 'Institucional',
    href: '/',
  },
  {
    label: 'Produtos',
    href: '/',
  },
  {
    label: 'Onde Encontrar',
    href: '/',
  },
  {
    label: 'Contato',
    href: '/',
  },
];

export default function Menu({
  items = defaultMenuItems,
  showItemSejaUmCliente = true,
}: IMenu) {
  return (
    <nav>
      <ul>
        {items?.map((item) => (
          <li>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
        {showItemSejaUmCliente && (
          <li>
            <a href="/">Seja um Cliente</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
