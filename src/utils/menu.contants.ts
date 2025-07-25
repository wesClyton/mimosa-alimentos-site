import type { IMenuItem } from '@interfaces/menu.interface';

type MenuKey =
  | 'home'
  | 'qualidade'
  | 'downloads'
  | 'institucional'
  | 'produtos'
  | 'ondeEncontrar'
  | 'contato'
  | 'sejaUmCliente';

export const MENU_ITEMS: Record<MenuKey, IMenuItem> = {
  home: {
    label: 'Home',
    href: '/',
  },
  qualidade: {
    label: 'Qualidade',
    href: '/institucional#qualidade',
  },
  institucional: {
    label: 'Institucional',
    href: '/institucional',
  },
  produtos: {
    label: 'Produtos',
    href: '/produtos',
  },
  ondeEncontrar: {
    label: 'Onde Encontrar',
    href: '/onde-encontrar',
  },
  contato: {
    label: 'Contato',
    href: '/contato',
  },
  sejaUmCliente: {
    label: 'Seja um Cliente',
    href: '/seja-um-cliente',
  },
  downloads: {
    label: 'Downloads',
    href: '/downloads',
  },
};
