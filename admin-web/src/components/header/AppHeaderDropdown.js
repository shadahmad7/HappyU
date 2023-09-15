import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar10 from './../../assets/images/avatars/10.jpeg'

const AppHeaderDropdown = () => {

  const onLogout = () => {
    window.localStorage.clear('login');
    window.location.href = "/"
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar10} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-8 mt-2" placement="bottom-end">
      
        <CDropdownItem onClick={onLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
