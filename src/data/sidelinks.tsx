import {
  IconBuilding,
  IconFileText,
  IconGauge,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconLayoutDashboard,
  IconStar,
  IconUserShield,
  IconUsers,
  IconWallet,
  IconWorld,
} from '@tabler/icons-react'

import { Locale, Dictionary } from '~/i18n/types'

import { useEffect, useState } from 'react'
import { getDict } from '~/i18n/get-dict'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const useSideLinks = (locale: Locale, isOwner: boolean): SideLink[] => {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const sidebar = dict?.sidebar ?? {}
  const faqTitle = dict?.faq.title ?? 'FAQ'

  useEffect(() => {
    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        setDict(fetchedDict)
      } catch (error) {
        console.error('Error fetching dictionary:', error)
      }
    }
    fetchDict()
  }, [locale])

  const sideLinks: SideLink[] = [
    {
      title: sidebar.daoStudio ?? 'DAO Studio',
      label: '',
      href: '/',
      icon: <IconBuilding size={18} />,
      sub: [
        {
          title: sidebar.studio ?? 'Studio',
          label: '',
          href: '/',
          icon: <IconUsers size={18} />,
        },
        // {
        //   title: sidebar.faq ?? 'FAQ',
        //   label: '',
        //   href: '/daofaq',
        //   icon: <IconQuestionMark size={18} />,
        // },
      ],
    },
    // {
    //   title: sidebar.proposals ?? 'Proposals',
    //   label: '',
    //   href: '/proposals',
    //   icon: <IconChecklist size={18} />,
    //   sub: [
    //     {
    //       title: sidebar.delegate ?? 'Delegate',
    //       label: '',
    //       href: '/delegate',
    //       icon: <IconHexagonNumber1 size={18} />,
    //     },
    //     {
    //       title: sidebar.submit ?? 'Submit',
    //       label: '',
    //       href: '/submit',
    //       icon: <IconHexagonNumber2 size={18} />,
    //     },
    //     {
    //       title: sidebar.pending ?? 'Pending',
    //       label: '',
    //       href: '/pending',
    //       icon: <IconHexagonNumber3 size={18} />,
    //     },
    //     {
    //       title: sidebar.closed ?? 'Closed',
    //       label: '',
    //       href: '/closed',
    //       icon: <IconHexagonNumber4 size={18} />,
    //     },
    //   ],
    // },
    {
      title: sidebar.pce ?? 'PeaceCoin Protocol DAO',
      label: '',
      href: '/pce',
      icon: <IconWorld size={18} />,
    },
    {
      title: sidebar.votingPower ?? 'Voting Power',
      label: '',
      href: '/votingpower',
      icon: <IconGauge size={18} />,
    },
    {
      title: sidebar.token ?? 'Token',
      label: '',
      href: '/token',
      icon: <IconWallet size={18} />,
    },
    // {
    //   title: sidebar.bounty ?? 'Bounty',
    //   label: '',
    //   href: '/bounty',
    //   icon: <IconApps size={18} />,
    // },
    {
      title: sidebar.campaign ?? 'Campaign',
      label: '',
      href: '/campaign',
      icon: <IconStar size={18} />,
    },
    {
      title: sidebar.pip ?? 'PIP',
      label: '',
      href: '/pip',
      icon: <IconFileText size={18} />,
      sub: [
        // {
        //   title: 'About Proposals',
        //   label: '',
        //   href: '/pip/',
        //   icon: <IconHexagonNumber1 size={18} />,
        // },
        {
          title: sidebar.allProposals ?? 'All Proposals',
          label: '',
          href: '/pip/all',
          icon: <IconHexagonNumber1 size={18} />,
        },
        // {
        //   title: 'Networking',
        //   label: '',
        //   href: '/pip/networking',
        //   icon: <IconHexagonNumber3 size={18} />,
        // },
        // {
        //   title: 'Interface',
        //   label: '',
        //   href: '/pip/interface',
        //   icon: <IconHexagonNumber4 size={18} />,
        // },
        // {
        //   title: 'PRC',
        //   label: '',
        //   href: '/pip/prc',
        //   icon: <IconHexagonNumber5 size={18} />,
        // },
        // {
        //   title: 'Meta',
        //   label: '',
        //   href: '/pip/meta',
        //   icon: <IconHexagonNumber6 size={18} />,
        // },
        // {
        //   title: 'Informational',
        //   label: '',
        //   href: '/pip/informational',
        //   icon: <IconHexagonNumber7 size={18} />,
        // },
      ],
    },
    {
      title: sidebar.myActivity ?? 'My Activity',
      label: '',
      href: '/activity/',
      icon: <IconLayoutDashboard size={18} />,
    },
    // {
    //   title: faqTitle,
    //   label: '',
    //   href: '/faq',
    //   icon: <IconQuestionMark size={18} />,
    // },
  ]

  if (isOwner) {
    sideLinks.push({
      title: sidebar.daoManagement ?? 'Dao Management',
      label: '',
      href: '/',
      icon: <IconUserShield size={18} />,
      sub: [
        {
          title: sidebar.createCampaign ?? 'Create Campaign',
          label: '',
          href: '/admin/createcampaign/',
          icon: <IconHexagonNumber1 size={18} />,
        },
        {
          title: sidebar.createSBT_NFT ?? 'Create SBT/NFT',
          label: '',
          href: '/admin/sbt/',
          icon: <IconHexagonNumber2 size={18} />,
        },
      ],
    })
  }

  return sideLinks
}
