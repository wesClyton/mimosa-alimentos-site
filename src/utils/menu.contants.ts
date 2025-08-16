import type { IMenuItem } from '@interfaces/menu.interface';

type MenuKey =
  | 'home'
  | 'downloads'
  | 'institucional'
  | 'produtos'
  | 'ondeEncontrar'
  | 'contato'
  | 'sejaUmCliente'
  | 'clienteVantagens'
  | 'clienteCadastreSe'
  | 'clienteComoRealizarPedidos'
  | 'clienteContato'
  | 'denuncie'
  | 'catalogo'
  | 'trabalheConosco';

export const MENU_ITEMS: Record<MenuKey, IMenuItem> = {
  home: {
    label: 'Home',
    href: '/',
  },
  denuncie: {
    label: 'Denuncie',
    href: '/denuncie',
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
    href: '/fale-conosco',
  },
  sejaUmCliente: {
    label: 'Seja um Cliente',
    href: '/seja-um-cliente',
  },
  downloads: {
    label: 'Downloads',
    href: '/downloads',
  },
  clienteCadastreSe: {
    label: 'Cadastre-se',
    href: '/seja-um-cliente#cadastre-se',
  },
  clienteComoRealizarPedidos: {
    label: 'Como realizar pedidos',
    href: '/seja-um-cliente#como-realizar-pedidos',
  },
  clienteVantagens: {
    label: 'Vantagens',
    href: '/seja-um-cliente#vantagens',
  },
  clienteContato: {
    label: 'Contato',
    href: '/seja-um-cliente#contato',
  },
  catalogo: {
    label: 'Catálogo',
    href: '/catalogo',
  },
  trabalheConosco: {
    label: 'Trabalhe Conosco',
    href: '/trabalhe-conosco',
  },
};
