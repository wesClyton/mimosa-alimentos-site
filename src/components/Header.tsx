import type { IMenu } from '@interfaces/menu.interface';
import Menu from './Menu';

export default function Header(props: IMenu) {
  return (
    <header>
      <a href="/">
        <img src="/logo-mimosa-white.svg" alt="Logo Mimosa" />
      </a>

      <Menu
        items={props.items}
        showItemSejaUmCliente={props.showItemSejaUmCliente}
      />
    </header>
  );
}
