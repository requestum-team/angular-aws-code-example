import { INavItem } from '@models/interfaces/nav-item.interface';

export const navItems: INavItem[] = [
  {
    icon: 'home',
    label: 'NAVIGATION.HOME',
    link: '/'
  },
  {
    icon: 'protect',
    label: 'NAVIGATION.PROTECT',
    link: '/protect'
  },
  {
    icon: 'file',
    label: 'NAVIGATION.VALIDATE',
    link: '/validate'
  },
  {
    icon: 'analytics',
    label: 'NAVIGATION.ANALYTICS',
    link: '/analytics'
  },
  {
    icon: 'settings',
    label: 'NAVIGATION.SETTINGS',
    link: '/settings'
  },
  {
    icon: 'help',
    label: 'NAVIGATION.HELP',
    link: '/help'
  }
];
