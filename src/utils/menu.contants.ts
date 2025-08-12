import type { IMenuItem } from '@interfaces/menu.interface';

type MenuKey =
  | 'home'
  | 'qualidade'
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
  | 'denuncie';

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
  denuncie: {
    label: 'Denuncie',
    href: '/denuncie',
  },
};
