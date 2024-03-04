import { SideNavItemGroup } from "@/app/painel/shared/types/type"
import {
  BsBuildingFill,
  BsClockHistory,
  BsCloudArrowDownFill,
  BsFillBoxSeamFill,
  BsFillPeopleFill,
  BsKanban,
} from "react-icons/bs"

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    title: "Inicio",
    menuList: [
      {
        title: "Dashboard",
        path: "/painel/dashboard",
        icon: <BsKanban size={20} />,
      },
    ],
  },
  {
    title: "Site",
    menuList: [
      {
        title: "Clientes",
        path: "/clientes",
        icon: <BsBuildingFill size={20} />,
      },
      {
        title: "Dowloads",
        path: "/downloads",
        icon: <BsCloudArrowDownFill size={20} />,
      },
      {
        title: "Produtos",
        path: "/produtos",
        icon: <BsFillBoxSeamFill size={20} />,
      },
      {
        title: "Linha do tempo",
        path: "/timeline",
        icon: <BsClockHistory size={20} />,
      },
    ],
  },
  {
    title: "Manage",
    menuList: [
      {
        title: "Usuarios",
        path: "/painel/usuarios",
        icon: <BsFillPeopleFill size={20} />,
        // submenu: true,
        // subMenuItems: [
        //     { title: 'All', path: '/products' },
        //     { title: 'New', path: '/products/new' },
        // ],
      },
    ],
  },
]
