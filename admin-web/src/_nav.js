import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Users',
    to: '/dashboard',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
 

  {
    component: CNavTitle,
    name: 'Habits',
  },
  {
    component: CNavGroup,
    name: 'Workout',
    to: '/exercise',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Videos',
        to: '/exercise/addvideo',
      },
      {
        component: CNavItem,
        name: 'Articles',
        to: '/exercise/addarticle',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Meditation',
    to: '/meditation',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Videos',
        to: '/meditation/addvideo',
      },
      {
        component: CNavItem,
        name: 'Articles',
        to: '/meditation/addarticle',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Eating Right',
    to: '/eating',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Articles',
        to: '/eating/addarticle',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Socializing',
    to: '/social',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Articles',
        to: '/social/addarticle',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Reading',
    to: '/reading',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Articles',
        to: '/reading/addarticle',
      },
      {
        component: CNavItem,
        name: 'Books',
        to: '/reading/addbook',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Movement',
    to: '/movement',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Articles',
        to: '/movement/addarticle',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Drink Water',
    to: '/water',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Articles',
        to: '/water/addarticle',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Finance',
    to: '/finance',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Videos',
        to: '/finance/addvideo',
      },
      {
        component: CNavItem,
        name: 'Books',
        to: '/finance/addbook',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Kindness & Gratitude',
    to: '/kindness',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Articles',
        to: '/kindness/addarticle',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Screen Break',
    to: '/screen',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Articles',
        to: '/screen/addarticle',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Journalising',
    to: '/journal',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
     
      {
        component: CNavItem,
        name: 'Articles',
        to: '/journal/addarticle',
      },
      {
        component: CNavItem,
        name: 'Books',
        to: '/journal/addbook',
      },
     
    ],
  },
  
]

export default _nav
