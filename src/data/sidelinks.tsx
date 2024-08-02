import {
  IconApps,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconTruck,
  IconUserShield,
  IconLock,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Proposals',
    label: '4',
    href: '/proposals',
    icon: <IconChecklist size={18} />,
    sub: [
      {
        title: 'Pending',
        label: '',
        href: '/pending',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Closed',
        label: '',
        href: '/closed',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Submit',
        label: '',
        href: '/submit',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Delegate',
        label: '',
        href: '/delegate',
        icon: <IconHexagonNumber4 size={18} />,
      },
    ],
  },
  {
    title: 'Token',
    label: '',
    href: '/token',
    icon: <IconMessages size={18} />,
  },
  {
    title: 'Bounty',
    label: '',
    href: '/bounty',
    icon: <IconApps size={18} />,
  },
  {
    title: 'PIP',
    label: '5',
    href: '',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'All',
        label: '',
        href: '',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Networking',
        label: '',
        href: '',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Interface',
        label: '',
        href: '',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'PRC',
        label: '',
        href: '',
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: 'Meta',
        label: '',
        href: '',
        icon: <IconHexagonNumber5 size={18} />,
      },
      {
        title: 'Informational',
        label: '',
        href: '',
        icon: <IconHexagonNumber5 size={18} />,
      },
    ],
  },
  {
    title: 'Connect Wallet',
    label: '',
    href: '',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Copy Address',
        label: '',
        href: '',
        icon: <IconTruck size={18} />,
      },
      {
        title: 'Disconnect',
        label: '',
        href: '',
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
  {
    title: 'Contact Us',
    label: '',
    href: '/',
    icon: <IconChartHistogram size={18} />,
  },

  {
    title: 'Socials',
    label: '3',
    href: '',
    icon: <IconExclamationCircle size={18} />,
    sub: [
      {
        title: 'Discord',
        label: '',
        href: '/404',
        icon: <IconError404 size={18} />,
      },
      {
        title: 'X',
        label: '',
        href: '/500',
        icon: <IconServerOff size={18} />,
      },
      {
        title: 'TG',
        label: '',
        href: '/401',
        icon: <IconLock size={18} />,
      },
    ],
  },
]
