import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
   
      <div className="ms-auto">
        <span className="me-1">Copyright ©</span>
        <a href="https://happinesssamurai.com/" target="_blank" rel="noopener noreferrer">
          Happiness Samurai
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
