import { SideNavItemGroup } from "@/app/painel/types/type";
import { BsEnvelope, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestionCircle } from "react-icons/bs";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboards",
        menuList: [{
            title: 'Dashboard',
            path: '/painel/dashboard',
            icon: <BsHouseDoor size={20} />,
        }]
    },
    {
        title: "Manage",
        menuList: [
            {
                title: 'Usuarios',
                path: '/painel/usuarios',
                icon: <BsKanban size={20} />,
                // submenu: true,
                // subMenuItems: [
                //     { title: 'All', path: '/products' },
                //     { title: 'New', path: '/products/new' },
                // ],
            },
            {
                title: 'Orders',
                path: '/orders',
                icon: <BsListUl size={20} />,
            },
            {
                title: 'Feedbacks',
                path: '/feedbacks',
                icon: <BsEnvelope size={20} />,
            }
        ]
    },
    {
        title: "Others",
        menuList: [
            {
                title: 'Account',
                path: '/account',
                icon: <BsGear size={20} />,
            },
            {
                title: 'Help',
                path: '/help',
                icon: <BsQuestionCircle size={20} />,
            }
        ]
    }

];
